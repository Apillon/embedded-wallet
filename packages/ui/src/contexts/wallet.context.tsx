import { ReactNode, createContext, useContext, useEffect, useReducer, useState } from 'react';
import {
  AuthStrategyName,
  ErrorMessages,
  WebStorageKeys,
  EmbeddedWallet,
  EmbeddedWalletSDK,
  SapphireMainnet,
  Network,
  SapphireTestnet,
} from '@apillon/wallet-sdk';
import { AppProps } from '../main';

export type WalletScreens =
  | 'main'
  | 'networks'
  | 'transactions'
  | 'sendToken'
  | 'selectToken'
  | 'receiveToken'
  | 'exportPrivateKey';

const initialState = (defaultNetworkId = 0, appProps: AppProps) => ({
  username: '',
  address: '',
  contractAddress: '',
  privateKey: '',
  balance: '',
  authStrategy: 'passkey' as AuthStrategyName,
  networkId: defaultNetworkId,
  walletScreen: 'main' as WalletScreens,
  displayedError: '',
  appProps,
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
  | { type: 'reset' };

function reducer(state: ContextState, action: ContextActions) {
  switch (action.type) {
    case 'setValue':
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case 'setState':
      return {
        ...state,
        ...action.payload,
      };
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
      wallet?: EmbeddedWallet;
      setWallet: (wallet: EmbeddedWallet) => void;
      reloadUserBalance: (walletRef?: EmbeddedWallet) => void;
      setScreen: (screen: WalletScreens) => void;
      handleError: (e?: any, src?: string) => string;
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
        }
      : {
          name: 'Oasis Sapphire',
          id: SapphireMainnet,
          rpcUrl: 'https://sapphire.oasis.io',
          explorerUrl: 'https://explorer.oasis.io/mainnet/sapphire',
        },
    ...networks,
  ];

  const [state, dispatch] = useReducer(
    reducer,
    initialState(defaultNetworkId || networks[0].id, { ...restOfParams, defaultNetworkId })
  );
  const [initialized, setInitialized] = useState(false);
  const [wallet, setWallet] = useState<EmbeddedWallet>();

  /**
   * Store changed state to localStorage
   */
  useEffect(() => {
    if (initialized) {
      /**
       * Exclude some state variables from being saved
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { walletScreen, displayedError, ...save } = state;

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
        reloadUserBalance(w);

        w.setAccount({
          username: state.username,
          strategy: state.authStrategy,
          address: state.address,
          contractAddress: state.contractAddress,
        });
      }
    }
  }, [networks, defaultNetworkId, initialized]);

  /**
   * Reload balance if user "logged in"
   */
  async function reloadUserBalance(walletRef?: EmbeddedWallet) {
    const w = walletRef || wallet;

    if (w && state.address) {
      // wait a bit for w.defaultNetworkId to finalize
      await new Promise(resolve => setTimeout(resolve, 10));

      try {
        const balance = await w?.getAccountBalance(state.address);
        dispatch({ type: 'setValue', payload: { key: 'balance', value: balance } });
      } catch (e) {
        console.error('Reloading balance', e);
      }
    }
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
        wallet,
        setWallet,
        reloadUserBalance,
        setScreen: (s: WalletScreens) =>
          dispatch({ type: 'setValue', payload: { key: 'walletScreen', value: s } }),
        handleError: (e?: any, src?: string) => {
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

            if (
              msg &&
              msg !== 'already known' &&
              msg !== 'Request rejected by user' &&
              e?.code !== 4001
            ) {
              dispatch({
                type: 'setValue',
                payload: { key: 'displayedError', value: msg },
              });
            }
          } else {
            dispatch({ type: 'setValue', payload: { key: 'displayedError', value: '' } });
          }

          return msg;
        },
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
