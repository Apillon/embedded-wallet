import { ReactNode, createContext, useContext, useReducer } from 'react';
import { AuthStrategyName } from '../../lib/types';

const initialState = () => ({
  username: '',
  address: '',
  authStrategy: 'passkey' as AuthStrategyName,
});

type ContextState = ReturnType<typeof initialState>;

type ContextActions = {
  type: 'setValue';
  payload: { key: keyof ReturnType<typeof initialState>; value: any };
};

function reducer(state: ContextState, action: ContextActions) {
  switch (action.type) {
    case 'setValue':
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    default:
      throw new Error('Unhandled action type.' + action?.type);
  }
}

const WalletContext = createContext<
  { state: ContextState; dispatch: (action: ContextActions) => void } | undefined
>(undefined);

function WalletProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState());

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
