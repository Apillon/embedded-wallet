import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import {
  AuthStrategyName,
  ErrorMessages,
  EmbeddedWallet,
  EmbeddedWalletSDK,
  SapphireMainnet,
  Network,
  SapphireTestnet,
  AccountWallet,
} from '@apillon/wallet-sdk';
import { AppProps } from '../main';
import { WebStorageKeys } from '../lib/constants';
import { logToStorage } from '../lib/helpers';
import oasisLogo from '../assets/oasis.svg';

export type WalletScreens =
  | 'main'
  | 'networks'
  | 'transactions'
  | 'sendToken'
  | 'selectToken'
  | 'addToken'
  | 'exportPrivateKey'
  | 'selectAccounts'
  | 'addAccount'
  | 'importAccount'
  | 'reloadAccounts'
  | 'renameAccount'
  | 'menuDot'
  | 'menuMore'
  | 'accountDetails'
  | 'settingsGeneral';

type AccountWalletEx = AccountWallet & { balance: string };

const initialState = (defaultNetworkId = 0, appProps: AppProps) => ({
  username: '',
  walletIndex: 0,
  accountWallets: [] as AccountWalletEx[],
  isAccountWalletsStale: false,
  contractAddress: '',
  privateKeys: {} as { [walletAddress: string]: string },
  authStrategy: 'passkey' as AuthStrategyName,
  networkId: defaultNetworkId,
  walletScreen: 'main' as WalletScreens,
  walletScreenHistory: [] as WalletScreens[],
  isOpen: false, // is wallet modal displayed
  displayedError: '',
  appProps,
  loadingWallets: false,
});

type ContextState = ReturnType<typeof initialState>;

/**
 * State actions/reducer
 */
type ContextActions =
  | {
      type: 'setValue';
      payload: { key: keyof ReturnType<typeof initialState>; value: any };
    }
  | {
      type: 'setState';
      payload: Partial<ReturnType<typeof initialState>>;
    }
  | { type: 'setBalance'; payload: { address: string; balance?: string } }
  | { type: 'reset' };

function reducer(state: ContextState, action: ContextActions) {
  switch (action.type) {
    case 'setValue': {
      // Keep history of wallet screens routing
      // and reset displayed error
      if (action.payload.key === 'walletScreen') {
        const walletScreenHistory = [...state.walletScreenHistory];

        if (
          walletScreenHistory.length > 1 &&
          walletScreenHistory[walletScreenHistory.length - 2] === action.payload.value
        ) {
          walletScreenHistory.pop();
        } else {
          walletScreenHistory.push(action.payload.value);
        }

        return {
          ...state,
          walletScreenHistory,
          displayedError: '',
          [action.payload.key]: action.payload.value,
        };
      }

      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    }
    case 'setState':
      return {
        ...state,
        ...action.payload,
      };
    case 'setBalance': {
      const updated = [...state.accountWallets];
      const found = updated.findIndex(x => x.address === action.payload.address);

      if (found > -1) {
        updated[found].balance = action.payload.balance || '';
      }

      return {
        ...state,
        accountWallets: updated,
      };
    }
    case 'reset':
      return initialState(state.networkId, state.appProps);
    default:
      throw new Error('Unhandled action type.' + JSON.stringify(action));
  }
}

const WalletContext = createContext<
  | {
      state: ContextState;
      dispatch: (action: ContextActions) => void;
      networks: Network[];
      networksById: { [networkId: number]: Network };
      defaultNetworkId: number;
      activeWallet?: AccountWalletEx;
      wallet?: EmbeddedWallet;
      setWallet: (wallet: EmbeddedWallet) => void;
      loadAccountWallets: (
        strategy?: AuthStrategyName,
        username?: string
      ) => Promise<AccountWallet[] | undefined>;
      reloadAccountBalances: (addresses?: string[]) => Promise<boolean | undefined>;
      setScreen: (screen: WalletScreens) => void;
      goScreenBack: () => void;
      handleError: (e?: any, src?: string) => string;
      setStateValue: <T extends keyof ReturnType<typeof initialState>>(
        key: T,
        value: ReturnType<typeof initialState>[T]
      ) => void;
    }
  | undefined
>(undefined);

function WalletProvider({
  children,
  networks = [],
  defaultNetworkId = 0,
  ...restOfParams
}: {
  children: ReactNode;
  networks?: Network[];
} & AppProps) {
  networks = [
    import.meta.env.VITE_SAPPHIRE_TESTNET
      ? {
          name: 'Sapphire Testnet',
          id: SapphireTestnet,
          rpcUrl: 'https://testnet.sapphire.oasis.io',
          explorerUrl: 'https://explorer.oasis.io/testnet/sapphire',
          imageUrl: oasisLogo,
        }
      : {
          name: 'Oasis Sapphire',
          id: SapphireMainnet,
          rpcUrl: 'https://sapphire.oasis.io',
          explorerUrl: 'https://explorer.oasis.io/mainnet/sapphire',
          imageUrl: oasisLogo,
        },
    ...networks,
  ];

  const [state, dispatch] = useReducer(
    reducer,
    initialState(defaultNetworkId || networks[0].id, { ...restOfParams, defaultNetworkId })
  );
  const [initialized, setInitialized] = useState(false);
  const [wallet, setWallet] = useState<EmbeddedWallet>();

  const activeWallet = useMemo(() => {
    if (state.walletIndex >= state.accountWallets.length) {
      return undefined;
    }

    return state.accountWallets[state.walletIndex];
  }, [state.walletIndex, state.accountWallets]);

  /**
   * Store changed state to localStorage
   */
  useEffect(() => {
    if (initialized) {
      /**
       * Exclude some state variables from being saved
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { walletScreen, displayedError, loadingWallets, privateKeys, appProps, ...save } =
        state;

      localStorage.setItem(WebStorageKeys.WALLET_CONTEXT, JSON.stringify(save));
    }
  }, [state]);

  /**
   * Initialize state from localStorage
   */
  useEffect(() => {
    const stored = localStorage.getItem(WebStorageKeys.WALLET_CONTEXT);

    if (stored) {
      try {
        const restored = JSON.parse(stored) as ContextState;
        dispatch({ type: 'setState', payload: restored });
      } catch (e) {
        console.error('Cant parse global state localStorage', e);
      }
    }

    setTimeout(() => setInitialized(true), 10);
  }, []);

  /**
   * Initialize Oasis Wallet App SDK
   */
  useEffect(() => {
    if (initialized && !wallet) {
      let w = undefined as EmbeddedWallet | undefined;

      if (networks && networks.length) {
        w = EmbeddedWalletSDK({
          ...restOfParams,
          networks,
          defaultNetworkId: state.networkId || defaultNetworkId,
        });
      } else {
        w = EmbeddedWalletSDK();
      }

      if (w) {
        setWallet(w);

        w.setAccount({
          username: state.username,
          strategy: state.authStrategy,
          walletIndex: state.walletIndex,
          contractAddress: state.contractAddress,
        });

        w.setWallets(state.accountWallets);
      }
    }
  }, [networks, defaultNetworkId, initialized]);

  /**
   * Reload balance on:
   * - login
   * - account change
   */
  useEffect(() => {
    if (state.walletIndex < state.accountWallets.length) {
      reloadAccountBalances([state.accountWallets[state.walletIndex].address]);
    }
  }, [state.username, state.walletIndex, state.accountWallets.length]);

  function setStateValue<T extends keyof ReturnType<typeof initialState>>(
    key: T,
    value: ReturnType<typeof initialState>[T]
  ) {
    dispatch({ type: 'setValue', payload: { key, value } });
  }

  /**
   * Load all wallet accounts for user. Requires auth
   */
  async function loadAccountWallets(strategy?: AuthStrategyName, username?: string) {
    if (state.loadingWallets) {
      return;
    }

    setStateValue('loadingWallets', true);

    try {
      const wallets =
        (await wallet?.getAccountWallets({
          strategy: strategy || state.authStrategy,
          authData: { username: username || state.username },
          reload: true,
        })) || [];

      setStateValue(
        'accountWallets',
        (wallets || []).map(x => ({ ...x, balance: '0' }))
      );

      if (state.walletIndex < wallets.length) {
        wallet?.events.emit('accountsChanged', [wallets[state.walletIndex].address]);
      }

      setStateValue('loadingWallets', false);
      setStateValue('isAccountWalletsStale', false);
      setStateValue('displayedError', '');

      reloadAccountBalances(wallets.map(w => w.address));

      return wallets;
    } catch (e) {
      console.error('loadAccountWallets', e);
      handleError(e);
    }

    setStateValue('loadingWallets', false);
  }

  async function reloadAccountBalances(addresses?: string[]) {
    if (!addresses) {
      if (!activeWallet?.address) {
        return;
      }

      addresses = [activeWallet.address];
    }

    try {
      const balances = await Promise.all(
        addresses.map(async address => {
          const balance = await wallet?.getAccountBalance(address);

          return {
            address,
            balance,
          };
        })
      );

      const updatedWallets = [...state.accountWallets];

      balances.forEach(b => {
        const found = updatedWallets.findIndex(x => x.address === b.address);

        if (found > -1) {
          updatedWallets[found].balance = b.balance || '0';
        }
      });

      setStateValue('accountWallets', updatedWallets);

      return true;
    } catch (e) {
      console.error('Reloading balance', e);
    }
  }

  function handleError(e?: any, src?: string) {
    let msg = '';

    if (e) {
      console.error(src ?? '', e);

      if (e?.name) {
        msg = ErrorMessages[e.name];
      }

      if (!msg && e?.error) {
        if (e?.error?.message) {
          msg = e.error.message;
        } else if (typeof e.error === 'string') {
          msg = e.error;
        }
      }

      if (!msg && e?.details) {
        msg = e.details;
      }

      if (!msg && e?.message) {
        msg = e.message;
      }

      logToStorage(msg);

      if (
        msg &&
        msg !== 'already known' &&
        msg !== 'Request rejected by user' &&
        e?.code !== 4001
      ) {
        setStateValue('displayedError', msg);
      }
    } else {
      setStateValue('displayedError', '');
    }

    return msg;
  }

  return (
    <WalletContext.Provider
      value={{
        state,
        dispatch,
        networks,
        networksById: networks.reduce(
          (acc, x) => {
            acc[x.id] = x;
            return acc;
          },
          {} as { [networkId: number]: Network }
        ),
        defaultNetworkId: defaultNetworkId || 0,
        activeWallet,
        wallet,
        setWallet,
        loadAccountWallets,
        reloadAccountBalances,
        setScreen: (s: WalletScreens) => setStateValue('walletScreen', s),
        goScreenBack: () => {
          if (state.walletScreenHistory.length > 1) {
            setStateValue(
              'walletScreen',
              state.walletScreenHistory[state.walletScreenHistory.length - 2]
            );
          } else {
            setStateValue('walletScreen', 'main');
          }
        },
        handleError,
        setStateValue,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

function useWalletContext() {
  const context = useContext(WalletContext);

  if (context === undefined) {
    throw new Error('useWalletContext usage must be wrapped with WalletContext provider.');
  }

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { WalletProvider, useWalletContext };
