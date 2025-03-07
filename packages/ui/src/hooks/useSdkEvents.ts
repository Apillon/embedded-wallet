import { useEffect } from 'react';
import { useWalletContext } from '../contexts/wallet.context';
import { useTokensContext } from '../contexts/tokens.context';
import { Events } from '@apillon/wallet-sdk';

/**
 * Handle wallet SDK Events
 * and auto login if redirected from gateway
 */
export default function useSdkEvents() {
  const {
    state,
    wallet,
    initialized: walletInitialized,
    reloadAccountBalances,
    setStateValue: setForWallet,
    activeWallet,
    initUserData,
    parseAccountWallets,
  } = useWalletContext();

  const { dispatch: dispatchTokens, getTokenDetails, getNftDetails } = useTokensContext();

  useEffect(() => {
    // #region handlers
    const onOpen = (params: Events['open']) => {
      setForWallet('isOpen', params);
    };

    const onDataUpdated = (params: Events['dataUpdated']) => {
      if (params.name === 'defaultNetworkId') {
        reloadAccountBalances();
        setForWallet('networkId', params.newValue);
      } else if (params.name === 'contractAddress') {
        setForWallet('contractAddress', params.newValue);
      } else if (params.name === 'wallets') {
        if (!!state.username) {
          parseAccountWallets(params.newValue, state.username);
        }
      }
    };

    const onAddToken = async (params: Events['addToken']) => {
      let err = '';

      if (!params.address) {
        err = 'No address';
      } else if (!params.symbol || params.symbol.length > 11) {
        err = 'Invalid symbol (must be less than 11 characters)';
      } else if (!params.decimals || isNaN(params.decimals)) {
        err = 'Invalid decimals';
      } else if (params.chainId && !wallet?.validateChainId(params.chainId)) {
        err = 'Selected chain is not supported';
      }

      if (err) {
        wallet?.events.emit('addTokenStatus', { success: false, info: err, token: params });
        console.error('onAddToken:', err);
        return;
      }

      const res = await getTokenDetails(params.address, params.chainId);

      if (!res) {
        err = `Token does not exist on chain (ID: ${params.chainId || state.networkId})`;
        wallet?.events.emit('addTokenStatus', { success: false, info: err, token: params });
        console.error('onAddToken:', err);
        return;
      }

      dispatchTokens({
        type: 'updateToken',
        payload: {
          owner: state.contractAddress,
          chainId: params.chainId || state.networkId,
          token: { ...params, balance: '0.0' },
        },
      });

      wallet?.events.emit('addTokenStatus', { success: true, token: params });
    };

    const onAddTokenNft = async (params: Events['addTokenNft']) => {
      let err = '';

      if (!params.address) {
        err = 'No address';
      } else if (!params.tokenId) {
        err = 'No token ID';
      } else if (params.chainId && !wallet?.validateChainId(params.chainId)) {
        err = 'Selected chain is not supported';
      }

      if (err) {
        wallet?.events.emit('addTokenStatus', { success: false, info: err, nft: params });
        console.error('onAddToken:', err);
        return;
      }

      const res = await getNftDetails(params.address, params.tokenId, params.chainId);

      if (!res) {
        err = 'Could not get NFT details';
      } else if (!res.isOwner) {
        err = 'Ownership details do not match';
      } else if (!res.data) {
        err = 'Could not get NFT details';
      } else if (!activeWallet?.address) {
        err = 'User wallet not available';
      }

      if (err) {
        wallet?.events.emit('addTokenStatus', { success: false, info: err, nft: params });
        console.error('onAddToken:', err);
        return;
      }

      if (!res?.data) {
        return;
      }

      if (params.name) {
        res.data.name = params.name;
      }

      if (params.imageUrl) {
        res.data.imageUrl = params.imageUrl;
      }

      dispatchTokens({
        type: 'addNft',
        payload: {
          owner: activeWallet!.address,
          chainId: params.chainId || state.networkId,
          nft: res.data,
        },
      });

      wallet?.events.emit('addTokenStatus', { success: true, nft: params });
    };

    // #endregion

    // #region init
    if (wallet && walletInitialized) {
      wallet.events.on('open', onOpen);
      wallet.events.on('dataUpdated', onDataUpdated);
      wallet.events.on('addToken', onAddToken);
      wallet.events.on('addTokenNft', onAddTokenNft);

      // Login if account params are in the URL (redirected back from auth gateway)
      // Delay a bit to prevent freeze
      setTimeout(() => {
        if (window.location.search) {
          const urlParams = new URLSearchParams(window.location.search);

          if (urlParams.has('username') && !!urlParams.get('username')) {
            initUserData({
              username: urlParams.get('username') || '',
              authStrategy: (urlParams.get('authStrategy') || 'passkey') as any,
              address0: urlParams.get('address0') || '',
            });

            setTimeout(() => {
              const url = new URL(window.location.href);
              url.searchParams.delete('username');
              url.searchParams.delete('authStrategy');
              url.searchParams.delete('address0');
              window.history.replaceState(null, '', url.toString());
            }, 50);
          } else {
            const url = new URL(window.location.href);
            url.searchParams.delete('username');
            url.searchParams.delete('authStrategy');
            url.searchParams.delete('address0');
            window.history.replaceState(null, '', url.toString());
          }
        }
      }, 200);
    }
    // #endregion

    return () => {
      if (wallet) {
        wallet.events.off('open', onOpen);
        wallet.events.off('dataUpdated', onDataUpdated);
        wallet.events.off('addToken', onAddToken);
        wallet.events.off('addTokenNft', onAddTokenNft);
      }
    };
  }, [wallet, reloadAccountBalances, walletInitialized]);

  return {};
}
