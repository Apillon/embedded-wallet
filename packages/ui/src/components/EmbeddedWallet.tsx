import { WalletProvider, useWalletContext } from '../contexts/wallet.context';
import { useEffect } from 'react';
import { AppParams, Events, UserRejectedRequestError } from '@apillon/wallet-sdk';
import { TransactionsProvider } from '../contexts/transactions.context';
import { AuthProvider } from '../contexts/auth.context';
import Auth from './Auth/Auth';
import Modal, { MODAL_TRANSITION_TIME } from './ui/Modal';
import { ApproveProvider, useApproveContext } from '../contexts/approve.context';
import WalletLayout from './Wallet/WalletLayout';
import WalletUnavailable from './Wallet/WalletUnavailable';
import Loader from './ui/Loader';
import { TokensProvider } from '../contexts/tokens.context';

export type AppProps = {
  /**
   * Automatically broadcast with SDK after confirming a transaction.
   *
   * Useful when signing transaction directly using SDK.
   */
  broadcastAfterSign?: boolean;

  /**
   * Remove styles from "open wallet" button
   */
  disableDefaultActivatorStyle?: boolean;

  /**
   * Placeholder displayed in input for username/email
   */
  authFormPlaceholder?: string;
} & AppParams;

function Main({ disableDefaultActivatorStyle = false }: AppProps) {
  const {
    state,
    wallet,
    initialized: walletInitialized,
    loadAccountWallets,
    reloadAccountBalances,
    dispatch,
    defaultNetworkId,
    setStateValue: setForWallet,
  } = useWalletContext();
  const { state: approveState, dispatch: dispatchApprove } = useApproveContext();

  const loggedIn = !!state.username;

  /**
   * Handle wallet SDK Events
   * and auto login if redirected from gateway
   */
  useEffect(() => {
    const onOpen = (params: Events['open']) => {
      setForWallet('isOpen', params);
    };

    const onDataUpdated = (params: Events['dataUpdated']) => {
      if (params.name === 'defaultNetworkId') {
        reloadAccountBalances();
        setForWallet('networkId', params.newValue);
      } else if (params.name === 'contractAddress') {
        setForWallet('contractAddress', params.newValue);
      }
    };

    if (wallet && walletInitialized) {
      wallet.events.on('open', onOpen);
      wallet.events.on('dataUpdated', onDataUpdated);

      // Login if account params are in the URL (redirected back from auth gateway)
      // Delay a bit to prevent freeze
      setTimeout(() => {
        if (window.location.search) {
          const urlParams = new URLSearchParams(window.location.search);

          if (urlParams.has('username') && !!urlParams.get('username')) {
            const loginData = {
              username: urlParams.get('username') || '',
              authStrategy: (urlParams.get('authStrategy') || 'passkey') as any,
              networkId: defaultNetworkId || undefined,
            };

            dispatch({
              type: 'setState',
              payload: loginData,
            });

            setTimeout(() => {
              loadAccountWallets(loginData.authStrategy, loginData.username);

              const url = new URL(window.location.href);
              url.searchParams.delete('username');
              url.searchParams.delete('authStrategy');
              window.history.replaceState(null, '', url.toString());
            }, 50);
          } else {
            const url = new URL(window.location.href);
            url.searchParams.delete('username');
            url.searchParams.delete('authStrategy');
            window.history.replaceState(null, '', url.toString());
          }
        }
      }, 200);
    }

    return () => {
      if (wallet) {
        wallet.events.off('open', onOpen);
        wallet.events.off('dataUpdated', onDataUpdated);
      }
    };
  }, [wallet, reloadAccountBalances, walletInitialized]);

  /**
   * On modal close:
   * - reset chainChange data (targetChain)
   * - reset approve screen data
   * - reset displayed error
   * - set screen back to main
   * - reset account login resolver
   */
  useEffect(() => {
    if (!state.isOpen) {
      setTimeout(() => {
        // Reject pending approve promises
        if (
          approveState.targetChain?.chainId !== state.networkId &&
          approveState.targetChain?.resolve
        ) {
          approveState.targetChain.resolve(false);
        }

        if (!approveState.successInfo?.title) {
          if (approveState.approveParams?.contractWrite?.reject) {
            approveState.approveParams.contractWrite.reject(new UserRejectedRequestError());
          } else if (approveState.approveParams?.plain?.reject) {
            approveState.approveParams.plain.reject(new UserRejectedRequestError());
          } else if (approveState.approveParams?.signature?.reject) {
            approveState.approveParams.signature.reject(new UserRejectedRequestError());
          }
        }

        // Reset approve state
        dispatchApprove({ type: 'reset' });

        // Reset error
        setForWallet('displayedError', '');

        // Reset screen state
        setForWallet('walletScreen', 'main');
        setForWallet('walletScreenHistory', []);
      }, MODAL_TRANSITION_TIME);

      // Reset account login resolver
      if (wallet && wallet.waitForAccountResolver) {
        wallet.waitForAccountResolver('');
        wallet.waitForAccountResolver = null;
      }
    } else {
      setForWallet('walletScreenHistory', ['main']);

      // Reload balance on widget open
      reloadAccountBalances();
    }
  }, [state.isOpen]);

  function content() {
    /**
     * Login/register
     */
    if (!loggedIn) {
      return (
        <AuthProvider>
          <Auth />
        </AuthProvider>
      );
    }

    /**
     * Must load wallets (authenticate again)
     */
    if (!state.accountWallets.length) {
      return <WalletUnavailable />;
    }

    return <WalletLayout />;
  }

  return (
    <div>
      <Modal isOpen={state.isOpen} isAuth={!loggedIn} setIsOpen={v => setForWallet('isOpen', v)}>
        {content()}
      </Modal>

      <button
        id="oaw-wallet-widget-btn"
        className={!disableDefaultActivatorStyle ? 'oaw-btn-default-style' : undefined}
        onClick={() => setForWallet('isOpen', true)}
      >
        {state.loadingWallets || !walletInitialized ? (
          <Loader fill="#06080F" className="loader" />
        ) : loggedIn ? (
          'Open wallet'
        ) : (
          'Sign in'
        )}
      </button>
    </div>
  );
}

export default function EmbeddedWallet(props: AppProps) {
  let props2 = { ...props } as AppProps;

  if (!props2) {
    props2 = { clientId: '' };
  }

  if (!props2.passkeyAuthMode) {
    props2.passkeyAuthMode = 'redirect';
  }

  if (!props2.authFormPlaceholder) {
    props2.authFormPlaceholder = 'your e-mail';
  }

  return (
    <WalletProvider {...props2}>
      <TransactionsProvider>
        <ApproveProvider>
          <TokensProvider>
            <Main {...props2} />
          </TokensProvider>
        </ApproveProvider>
      </TransactionsProvider>
    </WalletProvider>
  );
}
