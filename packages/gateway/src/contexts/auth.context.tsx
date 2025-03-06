import { createContext, useContext, useEffect, useReducer } from 'react';
import { AuthStrategyName } from '@apillon/wallet-sdk';
import { useGlobalContext } from './global.context';
import { WebStorageKeys } from '../helpers';

export type AuthScreens = 'loginForm' | 'confirmCode' | 'codeSubmitted' | 'configuringPasskey';

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState());

  const { wallet, handleError, redirectBack, referrer } = useGlobalContext();

  useEffect(() => {
    /**
     * The confirmation email has already been sent if username query is set
     */
    if (window.location.search) {
      const urlParams = new URLSearchParams(window.location.search);

      const u = urlParams.get('username') || '';

      if (!!u) {
        setStateValue('username', u);
        setStateValue('screen', 'confirmCode');
      }
    }
  }, []);

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
  async function onAuth(
    onlyLogin = false,
    ev?: React.FormEvent<HTMLFormElement>,
    isPrivateKey = false
  ) {
    ev?.preventDefault();

    if (!state.username) {
      return;
    }

    if (!isPrivateKey) {
      sessionStorage.setItem(WebStorageKeys.REGISTER_PK, '');
      setStateValue('privateKey', '');
    }

    setStateValue('loading', true);
    handleError();

    try {
      if (await wallet?.userExists(state.username)) {
        /**
         * Login
         */
        const address = await wallet?.authenticate('passkey', { username: state.username });

        if (address) {
          setupUserInfo({
            username: state.username,
            authStrategy: 'passkey',
            address0: address,
          });

          return true;
        }
      } else if (!onlyLogin && (await sendConfirmationEmail())) {
        setStateValue('screen', 'confirmCode');
      }
    } catch (e) {
      handleError(e, 'onAuth');
    }

    setStateValue('loading', false);
  }

  async function sendConfirmationEmail() {
    try {
      if (!state.captcha) {
        throw new Error(
          'Captcha verification required. Please return to previous registration step.'
        );
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
              token: state.captcha,
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
        sessionStorage.setItem(WebStorageKeys.OTP_EXPIRATION, `${ts}`);
      }

      return true;
    } catch (e) {
      handleError(e, 'sendConfirmationEmail');
    }
  }

  async function startRegister() {
    setStateValue('loading', true);
    handleError();

    let privateKey =
      sessionStorage.getItem(WebStorageKeys.REGISTER_PK) || state.privateKey || undefined;

    if (privateKey && !privateKey.startsWith('0x')) {
      privateKey = `0x${privateKey}`;
    }

    try {
      const res = await wallet?.register(
        'passkey',
        {
          username: state.username,
          privateKey,
        },
        state.hashedUsername,
        false,
        referrer
      );

      if (typeof res !== 'undefined') {
        sessionStorage.setItem(WebStorageKeys.REGISTER_PK, '');
        // Redirects back to app
        setupUserInfo({ username: state.username, authStrategy: 'passkey', address0: res });
      }
    } catch (e) {
      handleError(e, 'startRegister');
    }

    setStateValue('loading', false);
  }

  function setupUserInfo({
    username,
    authStrategy,
    address0,
  }: {
    username: string;
    authStrategy: AuthStrategyName;
    address0: string;
  }) {
    redirectBack({
      username,
      authStrategy,
      address0,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        setStateValue,
        onAuth,
        setupUserInfo,
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
        ev?: React.FormEvent<HTMLFormElement>,
        privateKey?: boolean
      ) => Promise<true | undefined>;
      setupUserInfo: (params: {
        username: string;
        authStrategy: AuthStrategyName;
        address0: string;
      }) => void;
      sendConfirmationEmail: () => Promise<true | undefined>;
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
