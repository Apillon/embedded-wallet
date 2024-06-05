import { ReactNode, createContext, useContext, useEffect, useReducer, useRef } from 'react';
import { AuthStrategyName } from '../../lib/types';
import { WebStorageKeys } from '../../lib/constants';

const initialState = () => ({
  username: '',
  address: '',
  balance: '',
  authStrategy: 'passkey' as AuthStrategyName,
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
  { state: ContextState; dispatch: (action: ContextActions) => void } | undefined
>(undefined);

function WalletProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState());
  const initialized = useRef(false);

  /**
   * Store changed state to localStorage
   */
  useEffect(() => {
    if (initialized.current) {
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
        dispatch({ type: 'setState', payload: JSON.parse(stored) });
      } catch (e) {
        console.error('Cant parse global state localStorage', e);
      }
    }

    setTimeout(() => (initialized.current = true), 10);
  }, []);

  return (
    <WalletContext.Provider
      value={{
        state,
        dispatch,
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
