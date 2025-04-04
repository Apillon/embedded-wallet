import { createContext, useContext, useEffect, useMemo, useReducer, useRef } from 'react';
import { ERC20Abi, ERC721Abi } from '@apillon/wallet-sdk';
import { useWalletContext } from './wallet.context';
import { ethers } from 'ethers6';
import { WebStorageKeys } from '../lib/constants';
import { isLowerCaseEqual } from '../lib/helpers';

export type TokenInfo = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  balance: string;
  imageUrl?: string;
};

export type TokenNftInfo = {
  address: string;
  tokenId: number;
  name?: string;
  imageUrl?: string;
};

/**
 * Tokens (ERC20) are shared between all accounts on user's wallet.
 * NFTs (ERC721) are scoped to each account, NOT for all accounts on the wallet.
 */
const initialState = () => ({
  list: {} as {
    [ownerContractAddress: string]: { [chainId: number | string]: TokenInfo[] };
  },
  selectedToken: '', // address (this is in reducer state, there is another selectedToken returned from context)
  exchangeRates: {} as { [token: string]: number }, // token exchange rates (from some price api, eg. coingecko)
  nfts: {} as {
    [ownerContractAddress: string]: { [chainId: number | string]: TokenNftInfo[] };
  },
  selectedNft: undefined as TokenNftInfo | undefined, // NFT to be displayed on TokensNftDetail screen
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
        chainId: number | string;
        token: TokenInfo;
        remove?: boolean;
      };
    }
  | {
      type: 'setTokens';
      payload: {
        owner: string;
        chainId: number | string;
        tokens: TokenInfo[];
      };
    }
  | {
      type: 'addNft';
      payload: {
        owner: string;
        chainId: number | string;
        nft: TokenNftInfo;
        remove?: boolean;
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
      const found = newTokens.findIndex(x =>
        isLowerCaseEqual(x.address, action.payload.token.address)
      );

      if (found < 0 && !action.payload.remove) {
        newTokens.push(action.payload.token);
      } else if (action.payload.remove) {
        newTokens.splice(found, 1);
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
    case 'setTokens': {
      return {
        ...state,
        list: {
          ...state.list,
          [action.payload.owner]: {
            ...state.list[action.payload.owner],
            [action.payload.chainId]: action.payload.tokens,
          },
        },
      };
    }
    case 'addNft':
      const newTokens = [...(state.nfts[action.payload.owner]?.[action.payload.chainId] || [])];
      const found = newTokens.findIndex(
        x =>
          isLowerCaseEqual(x.address, action.payload.nft.address) &&
          x.tokenId === action.payload.nft.tokenId
      );

      if (found < 0 && !action.payload.remove) {
        newTokens.push(action.payload.nft);
      } else if (action.payload.remove) {
        newTokens.splice(found, 1);
      } else {
        newTokens[found] = action.payload.nft;
      }

      return {
        ...state,
        nfts: {
          ...state.nfts,
          [action.payload.owner]: {
            ...state.nfts[action.payload.owner],
            [action.payload.chainId]: newTokens,
          },
        },
      };
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
      reloadTokenBalance: (address?: string) => Promise<void>;
      currentExchangeRate: number;
      getTokenDetails: (address: string, chainId?: number) => Promise<TokenInfo | undefined>;
      formatNativeBalance: (balance: string | bigint | number) => {
        amount: string;
        symbol: string;
      };
      getNftDetails: (
        address: string,
        tokenId: number,
        chainId?: number
      ) => Promise<
        | {
            isOwner: boolean;
            data?: TokenNftInfo;
          }
        | undefined
      >;
    }
  | undefined
>(undefined);

function TokensProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState());

  const {
    state: walletState,
    wallet,
    activeWallet,
    networksById,
    getContractAddress,
  } = useWalletContext();

  const initializing = useRef(false);
  const initialized = useRef(false);

  // Exchange rates
  const ER = useRef({
    loading: false,
    timeout: null as null | ReturnType<typeof setTimeout>,
  });

  const nativeToken = useMemo<TokenInfo>(() => {
    const network = networksById?.[walletState.networkId];
    const currencySymbol = network?.currencySymbol || 'ETH';
    return {
      address: '',
      name: `${network?.name} ${currencySymbol}`,
      symbol: currencySymbol,
      decimals: network?.currencyDecimals || 18,
      balance: activeWallet?.balance || '',
    };
  }, [activeWallet?.balance, walletState.networkId]);

  const selectedToken = useMemo<TokenInfo>(() => {
    if (state.selectedToken) {
      const userTokens = state.list?.[activeWallet?.address || '']?.[walletState.networkId];

      if (userTokens) {
        const found = userTokens.find(x => x.address === state.selectedToken);

        if (found) {
          return found;
        }
      }
    }

    return nativeToken;
  }, [nativeToken, state.selectedToken, state.list, walletState.walletType, walletState.networkId]);

  const currentExchangeRate = useMemo(() => {
    return state.exchangeRates[selectedToken.symbol] || 0;
  }, [selectedToken, state.exchangeRates]);

  useEffect(() => {
    if (initialized.current && wallet) {
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

  useEffect(() => {
    reloadTokenBalance();
  }, [
    walletState.username,
    walletState.walletIndex,
    walletState.accountWallets.length,
    walletState.isOpen,
  ]);

  async function init() {
    const stored = await wallet?.xdomain?.storageGet(WebStorageKeys.TOKENS_CONTEXT);

    if (stored) {
      try {
        const restored = JSON.parse(stored);
        dispatch({ type: 'setState', payload: restored });

        const contractAddress = getContractAddress();

        if (
          !!activeWallet &&
          Array.isArray(restored?.list?.[contractAddress || '']?.[walletState.networkId])
        ) {
          restored.list[contractAddress || ''][walletState.networkId].forEach(
            async (t: TokenInfo) => {
              if (wallet) {
                const res = await wallet.evm.contractRead({
                  contractAddress: t.address,
                  contractAbi: ERC20Abi,
                  contractFunctionName: 'balanceOf',
                  contractFunctionValues: [activeWallet.address],
                });

                if (res && typeof walletState.networkId === 'number') {
                  dispatch({
                    type: 'updateToken',
                    payload: {
                      owner: activeWallet?.address || '',
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

  /**
   * Reload all current account imported token balances or a specific imported token balance.
   * @param address Specific token to reload
   */
  async function reloadTokenBalance(address?: string) {
    if (wallet && activeWallet) {
      const userTokens = state.list?.[activeWallet?.address || '']?.[walletState.networkId];

      if (userTokens && typeof walletState.networkId === 'number') {
        if (!!address) {
          // Reload specific token
          const found = userTokens.find(x => isLowerCaseEqual(x.address, address));

          if (found) {
            const balance = await wallet.evm.contractRead({
              contractAddress: found.address,
              contractAbi: ERC20Abi,
              contractFunctionName: 'balanceOf',
              contractFunctionValues: [activeWallet.address],
              chainId: walletState.networkId,
            });

            dispatch({
              type: 'updateToken',
              payload: {
                owner: activeWallet?.address || '',
                chainId: walletState.networkId,
                token: { ...found, balance: ethers.formatUnits(balance, found.decimals) },
              },
            });
          }
        } else {
          // Reload all tokens of activeWallet
          const balances = await Promise.all(
            userTokens.map(t =>
              wallet.evm.contractRead({
                contractAddress: t.address,
                contractAbi: ERC20Abi,
                contractFunctionName: 'balanceOf',
                contractFunctionValues: [activeWallet.address],
                chainId: walletState.networkId as number,
              })
            )
          );

          dispatch({
            type: 'setTokens',
            payload: {
              owner: activeWallet?.address || '',
              chainId: walletState.networkId,
              tokens: userTokens.map((t, i) => ({
                ...t,
                balance: ethers.formatUnits(balances[i], t.decimals),
              })),
            },
          });
        }
      }
    }
  }

  async function getTokenDetails(address: string, chainId?: number) {
    if (wallet && activeWallet) {
      try {
        const [name, symbol, decimals, balance] = await Promise.all([
          wallet.evm.contractRead({
            contractAddress: address,
            contractAbi: ERC20Abi,
            contractFunctionName: 'name',
            chainId,
          }),
          wallet.evm.contractRead({
            contractAddress: address,
            contractAbi: ERC20Abi,
            contractFunctionName: 'symbol',
            chainId,
          }),
          wallet.evm.contractRead({
            contractAddress: address,
            contractAbi: ERC20Abi,
            contractFunctionName: 'decimals',
            chainId,
          }),
          wallet.evm.contractRead({
            contractAddress: address,
            contractAbi: ERC20Abi,
            contractFunctionName: 'balanceOf',
            contractFunctionValues: [activeWallet.address],
            chainId,
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
      } catch (e) {
        console.error(e);
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

  async function getNftDetails(
    address: string,
    tokenId: number,
    chainId?: number
  ): Promise<{ isOwner: boolean; data?: TokenNftInfo } | undefined> {
    if (wallet && activeWallet) {
      try {
        const [ownerAddress, tokenURI] = await Promise.all([
          wallet.evm.contractRead({
            contractAddress: address,
            contractAbi: ERC721Abi,
            contractFunctionName: 'ownerOf',
            contractFunctionValues: [tokenId],
            chainId,
          }),
          wallet.evm.contractRead({
            contractAddress: address,
            contractAbi: ERC721Abi,
            contractFunctionName: 'tokenURI',
            contractFunctionValues: [tokenId],
            chainId,
          }),
        ]);

        if (!isLowerCaseEqual(ownerAddress, activeWallet.address)) {
          // User is not owner of NFT, show error
          return {
            isOwner: false,
            data: undefined,
          };
        }

        const data = await (await fetch(tokenURI, { method: 'GET' })).json();

        return {
          isOwner: true,
          data: {
            address,
            tokenId,
            name: data?.name || '',
            imageUrl: data?.image || data?.img || data?.imageUrl || data?.imgUrl || '',
          },
        };
      } catch (e) {
        console.error(e);
      }
    }
  }

  return (
    <TokensContext.Provider
      value={{
        state,
        dispatch,
        nativeToken,
        selectedToken,
        currentExchangeRate,
        reloadTokenBalance,
        getTokenDetails,
        formatNativeBalance,
        getNftDetails,
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
