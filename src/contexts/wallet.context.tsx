import { ReactNode, createContext, useContext, useEffect, useReducer, useState } from 'react';
import { AuthStrategyName, NetworkConfig } from '../../lib/types';
import { WebStorageKeys } from '../../lib/constants';
import OasisAppWallet from '../../lib';
import { initializeOnWindow } from '../../lib/utils';

export type Network = { name: string; id: number; rpcUrl: string; explorerUrl: string };

const initialState = (defaultNetworkId = 0) => ({
  username: '',
  address: '',
  balance: '',
  authStrategy: 'passkey' as AuthStrategyName,
  networkId: defaultNetworkId,
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
      return initialState();
    default:
      throw new Error('Unhandled action type.' + JSON.stringify(action));
  }
}

const WalletContext = createContext<
  | {
      state: ContextState;
      dispatch: (action: ContextActions) => void;
      networks: Network[];
      wallet?: OasisAppWallet;
      setWallet: (wallet: OasisAppWallet) => void;
      reloadUserBalance: (walletRef?: OasisAppWallet) => void;
    }
  | undefined
>(undefined);

function WalletProvider({
  children,
  networks = [],
  defaultNetworkId = 0,
  sapphireUrl,
  accountManagerAddress,
}: {
  children: ReactNode;
  networks?: Network[];
  defaultNetworkId?: number;
  sapphireUrl?: string;
  accountManagerAddress?: string;
}) {
  const [state, dispatch] = useReducer(reducer, initialState(defaultNetworkId));
  const [initialized, setInitialized] = useState(false);
  const [wallet, setWallet] = useState<OasisAppWallet>();

  /**
   * Store changed state to localStorage
   */
  useEffect(() => {
    if (initialized) {
      /**
       * Exclude some state variables from being saved
       */
      // const {
      //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
      //   address,
      //   ...save
      // } = state;

      localStorage.setItem(WebStorageKeys.WALLET_CONTEXT, JSON.stringify(state));
    }
  }, [state]);

  /**
   * Initialize state from localStorage
   */
  useEffect(() => {
    const stored = localStorage.getItem(WebStorageKeys.WALLET_CONTEXT);

    if (stored) {
      try {
        const restored = JSON.parse(stored);
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
    if (initialized) {
      let w = undefined as OasisAppWallet | undefined;

      if (networks) {
        w = initializeOnWindow({
          sapphireUrl,
          accountManagerAddress,
          defaultNetworkId: state.networkId || defaultNetworkId,
          networkConfig: networks.reduce((acc, x) => {
            acc[x.id] = {
              rpcUrl: x.rpcUrl,
              explorerUrl: x.explorerUrl,
            };
            return acc;
          }, {} as NetworkConfig),
        });
      } else {
        w = initializeOnWindow();
      }

      if (w) {
        setWallet(w);
        reloadUserBalance(w);
        w.lastAccountAddress = state.address || '';
      }
    }
  }, [networks, defaultNetworkId, initialized]);

  /**
   * Reload balance if user "logged in"
   */
  async function reloadUserBalance(walletRef?: OasisAppWallet) {
    const w = walletRef || wallet;

    if (w && state.address) {
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
        wallet,
        setWallet,
        reloadUserBalance,
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
