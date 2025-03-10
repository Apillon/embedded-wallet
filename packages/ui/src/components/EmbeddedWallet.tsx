import { WalletProvider, useWalletContext } from '../contexts/wallet.context';
import { useEffect } from 'react';
import { AppParams, UserRejectedRequestError } from '@apillon/wallet-sdk';
import { TransactionsProvider } from '../contexts/transactions.context';
import { AuthProvider } from '../contexts/auth.context';
import Auth from './Auth/Auth';
import Modal, { MODAL_TRANSITION_TIME } from './ui/Modal';
import { ApproveProvider, useApproveContext } from '../contexts/approve.context';
import WalletLayout from './Wallet/WalletLayout';
import WalletUnavailable from './Wallet/WalletUnavailable';
import Loader from './ui/Loader';
import { TokensProvider } from '../contexts/tokens.context';
import useSdkEvents from '../hooks/useSdkEvents';

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
    reloadAccountBalances,
    setStateValue: setForWallet,
  } = useWalletContext();
  const { state: approveState, dispatch: dispatchApprove } = useApproveContext();

  /**
   * Handle wallet SDK Events
   * and auto login if redirected from gateway
   */
  useSdkEvents();

  const loggedIn = !!state.username;

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
    if (!state.loadingWallets && !state.accountWallets.length) {
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
    props2.authFormPlaceholder = 'your email';
  }

  return (
    <WalletProvider {...props2}>
      <TokensProvider>
        <TransactionsProvider>
          <ApproveProvider>
            <Main {...props2} />
          </ApproveProvider>
        </TransactionsProvider>
      </TokensProvider>
    </WalletProvider>
  );
}
