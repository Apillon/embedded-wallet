import { createContext, useContext, useEffect, useMemo, useReducer, useRef } from 'react';
import { ERC20Abi } from '@apillon/wallet-sdk';
import { useWalletContext } from './wallet.context';
import { ethers } from 'ethers';
import { WebStorageKeys } from '../lib/constants';

export type TokenInfo = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  balance: string;
  imageUrl?: string;
};

const initialState = () => ({
  list: {} as {
    [ownerContractAddress: string]: { [chainId: number]: TokenInfo[] };
  },
  selectedToken: '', // address
  exchangeRates: {} as { [token: string]: number }, // token exchange rates (from some price api, eg. coingecko)
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
      type: 'updateToken';
      payload: {
        owner: string;
        chainId: number;
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
    case 'updateToken': {
      const newTokens = [...(state.list[action.payload.owner]?.[action.payload.chainId] || [])];
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
          [action.payload.owner]: {
            ...state.list[action.payload.owner],
            [action.payload.chainId]: newTokens,
          },
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
      nativeToken: TokenInfo;
      selectedToken: TokenInfo;
      currentExchangeRate: number;
      getTokenDetails: (address: string) => Promise<TokenInfo | undefined>;
      formatNativeBalance: (balance: string | bigint | number) => {
        amount: string;
        symbol: string;
      };
    }
  | undefined
>(undefined);

function TokensProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState());

  const { state: walletState, wallet, activeWallet, networksById } = useWalletContext();

  const initializing = useRef(false);
  const initialized = useRef(false);

  // Exchange rates
  const ER = useRef({
    loading: false,
    timeout: null as null | ReturnType<typeof setTimeout>,
  });

  const nativeToken = useMemo<TokenInfo>(
    () => ({
      address: '',
      name: `${networksById?.[walletState.networkId]?.name} ETH`,
      symbol: networksById?.[walletState.networkId]?.currencySymbol || 'ETH',
      decimals: networksById?.[walletState.networkId]?.currencyDecimals || 18,
      balance: activeWallet?.balance || '',
    }),
    [activeWallet?.balance, walletState.networkId]
  );

  const selectedToken = useMemo<TokenInfo>(() => {
    if (state.selectedToken) {
      const userTokens = state.list?.[walletState.contractAddress || '']?.[walletState.networkId];

      if (userTokens) {
        const found = userTokens.find(x => x.address === state.selectedToken);

        if (found) {
          return found;
        }
      }
    }

    return nativeToken;
  }, [
    nativeToken,
    state.selectedToken,
    state.list,
    walletState.contractAddress,
    walletState.networkId,
  ]);

  const currentExchangeRate = useMemo(() => {
    return state.exchangeRates[selectedToken.symbol] || 0;
  }, [selectedToken, state.exchangeRates]);

  useEffect(() => {
    if (initializing.current && wallet) {
      wallet.xdomain?.storageSet(WebStorageKeys.TOKENS_CONTEXT, JSON.stringify(state));
    }
  }, [state]);

  useEffect(() => {
    if (wallet && !initializing.current) {
      initializing.current = true;
      init();
      loadExchangeRates();
    }
  }, [wallet]);

  async function init() {
    const stored = await wallet?.xdomain?.storageGet(WebStorageKeys.TOKENS_CONTEXT);

    if (stored) {
      try {
        const restored = JSON.parse(stored);
        dispatch({ type: 'setState', payload: restored });

        if (
          !!activeWallet &&
          Array.isArray(
            restored?.list?.[walletState.contractAddress || '']?.[walletState.networkId]
          )
        ) {
          restored.list[walletState.contractAddress][walletState.networkId].forEach(
            async (t: TokenInfo) => {
              if (wallet) {
                const res = await wallet.contractRead({
                  contractAddress: t.address,
                  contractAbi: ERC20Abi,
                  contractFunctionName: 'balanceOf',
                  contractFunctionValues: [activeWallet.address],
                });

                if (res) {
                  dispatch({
                    type: 'updateToken',
                    payload: {
                      owner: walletState.contractAddress,
                      chainId: walletState.networkId,
                      token: {
                        ...t,
                        balance: ethers.formatUnits(res, t.decimals),
                      },
                    },
                  });
                }
              }
            }
          );
        }
      } catch (e) {
        console.error('Cant parse context state localStorage', e);
      }
    }

    setTimeout(() => {
      initialized.current = true;
    }, 100);
  }

  async function getTokenDetails(address: string) {
    if (wallet && activeWallet) {
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
          contractFunctionValues: [activeWallet.address],
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

  async function loadExchangeRates() {
    if (ER.current.loading) {
      return;
    }

    if (ER.current.timeout) {
      clearTimeout(ER.current.timeout);
    }

    ER.current.loading = true;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_APILLON_BASE_URL ?? 'https://api.apillon.io'}/embedded-wallet/evm-token-prices`,
        { method: 'GET' }
      );

      if (!res.ok || res.status >= 400) {
        throw new Error('Could not load token exchange rates');
      }

      const { data } = await res.json();

      if (!!data) {
        dispatch({ type: 'setValue', payload: { key: 'exchangeRates', value: data } });
      }
    } catch (e) {
      console.error('loadExchangeRates', e);
    }

    ER.current.loading = false;

    // Keep refreshing every 5mins
    ER.current.timeout = setTimeout(() => loadExchangeRates(), 5 * 6e4);
  }

  function formatNativeBalance(balance: string | bigint | number) {
    return {
      amount: ethers.formatUnits(
        balance,
        networksById?.[walletState.networkId]?.currencyDecimals || 18
      ),
      symbol: networksById?.[walletState.networkId]?.currencySymbol || 'ETH',
    };
  }

  return (
    <TokensContext.Provider
      value={{
        state,
        dispatch,
        nativeToken,
        selectedToken,
        currentExchangeRate,
        getTokenDetails,
        formatNativeBalance,
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
