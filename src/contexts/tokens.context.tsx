import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { WebStorageKeys } from '../../lib/constants';
import { useWalletContext } from './wallet.context';
import { ERC20Abi } from '../../lib/abi';
import { ethers } from 'ethers';

export type TokenInfo = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  balance: string;
};

const initialState = () => ({
  list: {} as {
    [ownerAddress: string]: TokenInfo[];
  },
  selectedToken: '', // address
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
    }
  | {
      type: 'addToken';
      payload: {
        owner: string;
        token: TokenInfo;
      };
    }
  | {
      type: 'updateToken';
      payload: {
        owner: string;
        token: TokenInfo;
      };
    };

function reducer(state: ContextState, action: ContextActions) {
  switch (action.type) {
    case 'setState':
      return {
        ...state,
        ...action.payload,
      };
    case 'setValue':
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case 'addToken':
      return {
        ...state,
        list: {
          ...state.list,
          [action.payload.owner]: [
            ...(state.list[action.payload.owner] || []),
            action.payload.token,
          ],
        },
      };
    case 'updateToken': {
      const newTokens = [...(state.list[action.payload.owner] || [])];
      const found = newTokens.findIndex(x => x.address === action.payload.token.address);

      if (found < 0) {
        newTokens.push(action.payload.token);
      } else {
        newTokens[found] = action.payload.token;
      }

      return {
        ...state,
        list: {
          ...state.list,
          [action.payload.owner]: newTokens,
        },
      };
    }
    default:
      throw new Error('Unhandled action type.' + JSON.stringify(action));
  }
}

const TokensContext = createContext<
  | {
      state: ContextState;
      dispatch: (action: ContextActions) => void;
      getTokenDetails: (address: string) => Promise<TokenInfo | undefined>;
    }
  | undefined
>(undefined);

function TokensProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState());
  const [initialized, setInitialized] = useState(false);
  const { state: walletState, wallet } = useWalletContext();

  useEffect(() => {
    if (initialized) {
      localStorage.setItem(WebStorageKeys.TOKENS_CONTEXT, JSON.stringify(state));
    }
  }, [state]);

  useEffect(() => {
    const stored = localStorage.getItem(WebStorageKeys.TOKENS_CONTEXT);

    if (stored) {
      try {
        const restored = JSON.parse(stored);
        dispatch({ type: 'setState', payload: restored });

        if (Array.isArray(restored?.list?.[walletState.address])) {
          restored.list[walletState.address].forEach(async (t: TokenInfo) => {
            if (wallet) {
              const res = await wallet.contractRead({
                contractAddress: t.address,
                contractAbi: ERC20Abi,
                contractFunctionName: 'balanceOf',
                contractFunctionValues: [walletState.address],
              });

              if (res) {
                dispatch({
                  type: 'updateToken',
                  payload: {
                    owner: walletState.address,
                    token: {
                      ...t,
                      balance: ethers.formatUnits(res, t.decimals),
                    },
                  },
                });
              }
            }
          });
        }
      } catch (e) {
        console.error('Cant parse context state localStorage', e);
      }
    }

    setTimeout(() => {
      setInitialized(true);
    }, 100);
  }, []);

  async function getTokenDetails(address: string) {
    if (wallet) {
      const [name, symbol, decimals, balance] = await Promise.all([
        wallet.contractRead({
          contractAddress: address,
          contractAbi: ERC20Abi,
          contractFunctionName: 'name',
        }),
        wallet.contractRead({
          contractAddress: address,
          contractAbi: ERC20Abi,
          contractFunctionName: 'symbol',
        }),
        wallet.contractRead({
          contractAddress: address,
          contractAbi: ERC20Abi,
          contractFunctionName: 'decimals',
        }),
        wallet.contractRead({
          contractAddress: address,
          contractAbi: ERC20Abi,
          contractFunctionName: 'balanceOf',
          contractFunctionValues: [walletState.address],
        }),
      ]);

      if (symbol) {
        return {
          address,
          name,
          symbol,
          decimals: Number(decimals),
          balance: ethers.formatUnits(balance, decimals),
        };
      }
    }
  }

  return (
    <TokensContext.Provider
      value={{
        state,
        dispatch,
        getTokenDetails,
      }}
    >
      {children}
    </TokensContext.Provider>
  );
}

function useTokensContext() {
  const context = useContext(TokensContext);

  if (context === undefined) {
    throw new Error('useTokensContext usage must be wrapped with TokensContext provider.');
  }

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { TokensProvider, useTokensContext };
