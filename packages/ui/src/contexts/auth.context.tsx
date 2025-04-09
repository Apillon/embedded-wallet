import { createContext, useContext, useReducer } from 'react';
import { useWalletContext } from './wallet.context';
import { abort, getHashedUsername, WalletType } from '@apillon/wallet-sdk';
import { WebStorageKeys } from '../lib/constants';
import { sleep } from '../lib/helpers';

export type AuthScreens =
  | 'loginForm'
  | 'captcha'
  | 'confirmCode'
  | 'codeSubmitted'
  | 'configuringPasskey'
  | 'importWallet';

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState());

  const {
    wallet,
    handleError,
    state: { appProps, username: loggedInUsername, networkId, walletType },
    initUserData,
    setStateValue: setForWallet,
  } = useWalletContext();

  function setStateValue<T extends keyof ReturnType<typeof initialState>>(
    key: T,
    value: ReturnType<typeof initialState>[T]
  ) {
    dispatch({ type: 'setValue', payload: { key, value } });
  }

  /**
   * @param onlyLogin Just check that user has logged in, don't try to register if login fails.
   * @returns `true` if login is successful
   */
  async function onAuth(onlyLogin = false, ev?: React.FormEvent<HTMLFormElement>) {
    ev?.preventDefault();

    if (!state.username) {
      return;
    }

    setStateValue('loading', true);
    setForWallet('loadingWallets', true);
    handleError();

    try {
      // Change wallet type if no networks are configured for that type
      if (walletType === WalletType.SUBSTRATE && !appProps?.networks?.length) {
        wallet?.setAccount({ walletType: WalletType.EVM });
      } else if (walletType === WalletType.EVM && !appProps?.networks?.length) {
        wallet?.setAccount({ walletType: WalletType.SUBSTRATE });
      }

      await sleep(50);

      // Update default network for selected wallet type
      if (
        walletType === WalletType.SUBSTRATE &&
        typeof networkId !== 'string' &&
        appProps?.networksSubstrate?.[0]?.id
      ) {
        console.log('set ss network');
        wallet?.setDefaultNetworkId(appProps.networksSubstrate[0].id);
      } else if (typeof networkId !== 'number' && appProps?.networks?.[0]?.id) {
        console.log('set evm enetow');
        wallet?.setDefaultNetworkId(appProps.networks[0].id);
      }

      if (await wallet?.userExists(state.username)) {
        /**
         * Login
         */
        const address = await wallet?.authenticate('passkey', { username: state.username });

        if (address) {
          initUserData({
            username: state.username,
            authStrategy: 'passkey',
          });

          setTimeout(() => {
            setForWallet('loadingWallets', false);
          }, 1000);

          return true;
        }
      } else if (!onlyLogin) {
        if (state.captcha) {
          if (await sendConfirmationEmail()) {
            onRegister();
          }
        } else {
          setStateValue('screen', 'captcha');
        }
      }
    } catch (e) {
      handleError(e, 'onAuth');
    }

    setStateValue('loading', false);
    setForWallet('loadingWallets', false);
  }

  async function sendConfirmationEmail(captchaToken?: string) {
    try {
      if (!captchaToken && !state.captcha) {
        throw new Error('Captcha verification required');
      }

      /**
       * Apillon email confirmation
       */
      const res = await fetch(
        `${import.meta.env.VITE_APILLON_BASE_URL ?? 'https://api.apillon.io'}/embedded-wallet/otp/generate`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: state.username,
            captcha: {
              token: captchaToken || state.captcha,
              eKey: import.meta.env.VITE_PROCAPTCHA_KEY ?? 'N/A',
            },
          }),
        }
      );

      setStateValue('captcha', '');

      if (!res.ok || res.status >= 400) {
        throw new Error('Could not send confirmation email');
      }

      const { data } = await res.json();

      if (data?.expireTime) {
        const ts = new Date(data.expireTime).getTime() || 0;
        setStateValue('lastCodeExpiretime', ts);
        wallet?.xdomain?.storageSet(WebStorageKeys.OTP_EXPIRATION, `${ts}`, true);
      }

      return true;
    } catch (e) {
      handleError(e, 'sendConfirmationEmail');
    }
  }

  /**
   * Handle redirects (after email confimration code sent)
   *
   * @param isPrivateKey Wallet is created from private key provided in sessionStorage.
   */
  async function onRegister(isPrivateKey = false) {
    if (!isPrivateKey) {
      wallet?.xdomain?.storageSet(WebStorageKeys.REGISTER_PK, '', true);
      setStateValue('privateKey', '');
    }

    if (appProps.passkeyAuthMode === 'tab_form') {
      if (!wallet?.xdomain) {
        throw abort('XDOMAIN_NOT_INIT');
      }

      setStateValue('screen', 'configuringPasskey');

      const res = await wallet.xdomain.createViaTab(state.username);

      if (res && res.username) {
        initUserData({ username: res.username, authStrategy: 'passkey', address0: res.address0 });
      }
    } else if (['redirect', 'tab_form'].includes(appProps.passkeyAuthMode || '')) {
      redirectToGateway(state.username);
    } else {
      setStateValue('screen', 'confirmCode');
    }
  }

  /**
   * Actually trigger SDK#register (after email code confirmed)
   */
  async function startRegister() {
    setStateValue('loading', true);
    handleError();

    try {
      let res: any;

      if (appProps.passkeyAuthMode === 'tab_form') {
        if (!wallet?.xdomain) {
          throw abort('XDOMAIN_NOT_INIT');
        }

        res = await wallet.xdomain.createViaTab(state.username);

        if (!res?.username) {
          throw new Error(`Couldn't authenticate account. Please try again.`);
        }

        res = res?.address0;
      } else {
        let hashed = state.hashedUsername;

        if (!hashed) {
          hashed = await getHashedUsername(state.username);
          setStateValue('hashedUsername', hashed);
        }

        let privateKey = state.privateKey || undefined;

        if (privateKey && !privateKey.startsWith('0x')) {
          privateKey = `0x${privateKey}`;
        }

        res = await wallet?.register('passkey', { username: state.username, privateKey }, hashed);
      }

      // res === address of first account on the new wallet
      if (res) {
        initUserData({ username: state.username, authStrategy: 'passkey', address0: res });
      }
    } catch (e) {
      handleError(e, 'startRegister');
    }

    setStateValue('loading', false);
  }

  function redirectToGateway(username?: string) {
    const gatewayUrl = import.meta.env.VITE_XDOMAIN_PASSKEY_SRC ?? 'https://passkey.apillon.io';

    if (!loggedInUsername && gatewayUrl) {
      window.location.href = `${gatewayUrl}?${[
        `ref=${encodeURIComponent(window.location.origin + window.location.pathname)}`,
        `clientId=${appProps.clientId || wallet?.apillonClientId || ''}`,
        `username=${encodeURIComponent(username || '')}`,
      ].join('&')}`;

      return true;
    }

    return false;
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        setStateValue,
        onAuth,
        onRegister,
        sendConfirmationEmail,
        startRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const AuthContext = createContext<
  | {
      state: ContextState;
      dispatch: (action: ContextActions) => void;
      setStateValue: <T extends keyof ReturnType<typeof initialState>>(
        key: T,
        value: ReturnType<typeof initialState>[T]
      ) => void;
      onAuth: (
        onlyLogin?: boolean,
        ev?: React.FormEvent<HTMLFormElement>
      ) => Promise<true | undefined>;
      onRegister: (isPrivateKey?: boolean) => Promise<void>;
      sendConfirmationEmail: (captchaToken?: string) => Promise<true | undefined>;
      startRegister: () => void;
    }
  | undefined
>(undefined);

const initialState = () => ({
  loading: false,
  username: '',
  hashedUsername: undefined as Buffer | undefined,
  screen: 'loginForm' as AuthScreens,
  lastCodeExpiretime: 0, // get from /otp/generate and check before /otp/validate
  captcha: '',
  privateKey: '',
});

type ContextState = ReturnType<typeof initialState>;

type ContextActions =
  | {
      type: 'setState';
      payload: Partial<ReturnType<typeof initialState>>;
    }
  | {
      type: 'setValue';
      payload: { key: keyof ReturnType<typeof initialState>; value: any };
    };

function reducer(state: ContextState, action: ContextActions) {
  switch (action.type) {
    case 'setState':
      return {
        ...state,
        ...action.payload,
      };
    case 'setValue':
      if (action.payload.key === 'username') {
        return {
          ...state,
          [action.payload.key]: action.payload.value,
          hashedUsername: undefined,
        };
      }

      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    default:
      throw new Error('Unhandled action type.' + JSON.stringify(action));
  }
}

function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuthContext usage must be wrapped with TokensContext provider.');
  }

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuthContext };
