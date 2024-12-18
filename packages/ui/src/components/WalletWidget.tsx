import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { WalletProvider, useWalletContext } from '../contexts/wallet.context';
import { ReactNode, useEffect, useRef, useState } from 'react';
import WalletAuth from './WalletAuth';
import WalletMain from './WalletMain';
import { ethers } from 'ethers';
import WalletApprove, { DisplayedContractParams } from './WalletApprove';
import { AppParams, Events, UserRejectedRequestError } from '@apillon/wallet-sdk';
import { TransactionsProvider, useTransactionsContext } from '../contexts/transactions.context';
import Btn from './Btn';
import Logo from './Logo';
import WalletChainChange from './WalletChainChange';
import clsx from 'clsx';
import WalletNetworkWidget from './WalletNetworkWidget';
import IconCheckCircle from './IconCheckCircle';
import WalletLoad from './WalletLoad';

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

const MODAL_TRANSITION_TIME = 200;

function Wallet({
  broadcastAfterSign = false,
  disableDefaultActivatorStyle = false,
  passkeyAuthMode = 'redirect',
  ...restOfProps
}: AppProps) {
  const {
    state,
    wallet,
    setScreen,
    handleError,
    loadAccountWallets,
    reloadAccountBalances,
    dispatch,
    defaultNetworkId,
  } = useWalletContext();
  const { dispatch: dispatchTx } = useTransactionsContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [txToConfirm, setTxToConfirm] = useState<ethers.TransactionLike<ethers.AddressLike>>();
  const [contractFunctionData, setContractFunctionData] = useState<DisplayedContractParams>();
  const [messageToSign, setMessageToSign] = useState('');
  const [approvedData, setApprovedData] = useState({
    title: '',
    txHash: '',
    explorerUrl: '',
  });
  const [targetChain, setTargetChain] = useState({
    chainId: 0,
    modalWasOpen: false, // was the wallet modal open when chainChange was triggered?
    resolve: (_confirmed: boolean) => {},
  }); // Open switch chain modal if > 0

  const approveParams =
    useRef<Partial<Events['txApprove'] & { signature: Events['signatureRequest'] }>>();

  const loggedIn = !!state.username;
  const hasWallets = !!state.accountWallets.length;

  /**
   * Handle wallet SDK Events
   */
  useEffect(() => {
    const onTxApproveEvent = (params: Events['txApprove']) => {
      if (params.plain) {
        setTxToConfirm(params.plain?.tx);
        approveParams.current = params;
        setIsModalOpen(true);
      } else if (params.contractWrite) {
        setContractFunctionData({
          chainId: params.contractWrite.chainId,
          contractAddress: params.contractWrite.contractAddress,
          contractFunctionName: params.contractWrite.contractFunctionName,
          contractFunctionValues: params.contractWrite.contractFunctionValues,
        });
        approveParams.current = params;
        setIsModalOpen(true);
      }
    };

    const onSignatureRequestEvent = (params: Events['signatureRequest']) => {
      setMessageToSign(params.message as string);
      approveParams.current = { signature: params };
      setIsModalOpen(true);
    };

    const onTxSubmittedEvent = async (params: Events['txSubmitted']) => {
      dispatchTx({ type: 'addTx', payload: params });

      await new Promise(resolve => setTimeout(resolve, MODAL_TRANSITION_TIME * 2));

      setApprovedData({
        title: 'Successfully sent',
        txHash: params.hash,
        explorerUrl: params.explorerUrl,
      });

      setIsModalOpen(true);
    };

    const onProviderRequestAccounts = () => {
      setIsModalOpen(true);
    };

    const onDataUpdated = (params: Events['dataUpdated']) => {
      if (params.name === 'defaultNetworkId') {
        reloadAccountBalances();
        dispatch({ type: 'setValue', payload: { key: 'networkId', value: params.newValue } });
      } else if (params.name === 'contractAddress') {
        dispatch({ type: 'setValue', payload: { key: 'contractAddress', value: params.newValue } });
      }
    };

    const onOpen = (params: Events['open']) => {
      setIsModalOpen(params);
    };

    if (wallet) {
      wallet.events.on('txApprove', onTxApproveEvent);
      wallet.events.on('signatureRequest', onSignatureRequestEvent);
      wallet.events.on('txSubmitted', onTxSubmittedEvent);
      wallet.events.on('providerRequestAccounts', onProviderRequestAccounts);
      wallet.events.on('dataUpdated', onDataUpdated);
      wallet.events.on('open', onOpen);

      // Login if account params are in the URL (redirected back from auth gateway)
      if (window.location.search) {
        const urlParams = new URLSearchParams(window.location.search);

        if (urlParams.has('username')) {
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
        }
      }
    }

    return () => {
      if (wallet) {
        wallet.events.off('txApprove', onTxApproveEvent);
        wallet.events.off('signatureRequest', onSignatureRequestEvent);
        wallet.events.off('txSubmitted', onTxSubmittedEvent);
        wallet.events.off('providerRequestAccounts', onProviderRequestAccounts);
        wallet.events.off('dataUpdated', onDataUpdated);
        wallet.events.off('open', onOpen);
      }
    };
  }, [wallet]);

  /**
   * Handle requestChainChange separately because of extra dependency
   */
  useEffect(() => {
    const onRequestChainChange = (params: Events['requestChainChange']) => {
      setTargetChain({ ...params, modalWasOpen: isModalOpen });
      setIsModalOpen(true);
    };

    if (wallet) {
      wallet.events.on('requestChainChange', onRequestChainChange);
    }

    return () => {
      if (wallet) {
        wallet.events.off('requestChainChange', onRequestChainChange);
      }
    };
  }, [wallet, isModalOpen]);

  /**
   * On modal close:
   * - reset approve screen
   * - reset chainChange data (targetChain)
   * - reset account login resolver
   * - set <WalletMain /> screen back to main
   * - reset displayed error
   */
  useEffect(() => {
    if (!isModalOpen) {
      if (!!txToConfirm || !!messageToSign || !!contractFunctionData) {
        closeApproveScreen();
      }

      setTimeout(() => {
        if (targetChain.chainId !== state.networkId && targetChain.resolve) {
          targetChain.resolve(false);
        }

        setTargetChain(t => ({
          ...t,
          modalWasOpen: false,
          chainId: 0,
        }));

        dispatch({ type: 'setValue', payload: { key: 'displayedError', value: '' } });
      }, MODAL_TRANSITION_TIME);

      if (state.walletScreen !== 'main') {
        // Wait for modal transition
        setTimeout(() => {
          setScreen('main');
        }, MODAL_TRANSITION_TIME);
      }

      if (wallet && wallet.waitForAccountResolver) {
        wallet.waitForAccountResolver('');
        wallet.waitForAccountResolver = null;
      }
    } else {
      // Reload balance on widget open
      reloadAccountBalances();
    }
  }, [isModalOpen]);

  function closeApproveScreen(isSuccess = false, closeModal = true) {
    if (closeModal) {
      setIsModalOpen(false);
    }

    // Wait for modal transition
    setTimeout(
      () => {
        setTxToConfirm(undefined);
        setContractFunctionData(undefined);
        setMessageToSign('');
        setApprovedData({
          title: '',
          txHash: '',
          explorerUrl: '',
        });

        if (!isSuccess) {
          if (approveParams.current?.contractWrite?.reject) {
            approveParams.current.contractWrite.reject(new UserRejectedRequestError());
          } else if (approveParams.current?.plain?.reject) {
            approveParams.current.plain.reject(new UserRejectedRequestError());
          } else if (approveParams.current?.signature?.reject) {
            approveParams.current.signature.reject(new UserRejectedRequestError());
          }
        }
      },
      closeModal ? MODAL_TRANSITION_TIME : 0
    );
  }

  function redirectToGateway(username?: string) {
    const gatewayUrl = import.meta.env.VITE_XDOMAIN_PASSKEY_SRC ?? 'https://passkey.apillon.io';

    if (!loggedIn && gatewayUrl) {
      window.location.href = `${gatewayUrl}?${[
        `ref=${encodeURIComponent(window.location.origin + window.location.pathname)}`,
        `clientId=${restOfProps.clientId || wallet?.apillonClientId || ''}`,
        `username=${encodeURIComponent(username || '')}`,
      ].join('&')}`;

      return true;
    }

    return false;
  }

  let modalContent = <></>;

  if (!loggedIn) {
    /**
     * Login/register
     */
    modalContent = (
      <WalletAuth
        {...restOfProps}
        onGatewayRedirect={
          passkeyAuthMode === 'redirect' ? (u?: string) => redirectToGateway(u) : undefined
        }
      />
    );
  } else if (approvedData.title) {
    /**
     * Transaction submitted to network
     */
    modalContent = (
      <div>
        <h3 className="mb-4 flex gap-4">
          <IconCheckCircle />
          {approvedData.title}
        </h3>

        {!!approvedData.txHash && (
          <p className="break-words text-sm text-lightgrey mb-4">
            Transaction has been completed with the following hash:{' '}
            <span className="text-offwhite">{approvedData.txHash}</span>
          </p>
        )}

        {!!approvedData.explorerUrl && (
          <p className="text-sm mb-4">
            <a
              href={approvedData.explorerUrl}
              target="_blank"
              className="text-yellow hover:text-offwhite"
            >
              View on blockchain explorer
            </a>
          </p>
        )}

        <Btn variant="ghost" className="w-full mt-12" onClick={() => closeApproveScreen(true)}>
          Close
        </Btn>
      </div>
    );
  } else if (!!txToConfirm || !!messageToSign || !!contractFunctionData) {
    /**
     * Approve tx (authenticate w/ passkey e.g.)
     */
    modalContent = (
      <WalletApprove
        tx={txToConfirm}
        signMessage={messageToSign}
        contractFunctionData={contractFunctionData}
        onApprove={async () => {
          if (approveParams.current) {
            try {
              handleError();

              if (approveParams.current.signature) {
                await wallet?.signMessage({
                  ...approveParams.current.signature,
                  authData: { username: state.username },
                });

                closeApproveScreen(true);
              } else if (approveParams.current.plain) {
                const res = await wallet?.signPlainTransaction({
                  ...approveParams.current.plain,
                  authData: { username: state.username },
                });

                if (broadcastAfterSign && res) {
                  const { signedTxData, chainId } = res;
                  await wallet?.broadcastTransaction(
                    signedTxData,
                    chainId,
                    approveParams.current.plain.label || 'Transaction'
                  );
                } else {
                  closeApproveScreen(true, false);
                }
              } else if (approveParams.current.contractWrite) {
                const res = await wallet?.signContractWrite({
                  ...approveParams.current.contractWrite,
                  authData: { username: state.username },
                });

                if (broadcastAfterSign && res) {
                  const { signedTxData, chainId } = res;
                  await wallet?.broadcastTransaction(
                    signedTxData,
                    chainId,
                    approveParams.current.contractWrite.label || 'Transaction'
                  );
                } else {
                  closeApproveScreen(true, false);
                }
              }
            } catch (e) {
              const errMsg = handleError(e);

              // Transaction was already broadcast
              if (errMsg === 'already known') {
                closeApproveScreen(true);
              }
            }
          }
        }}
        onDecline={() => {
          closeApproveScreen();

          if (approveParams.current?.contractWrite?.reject) {
            approveParams.current.contractWrite.reject(new UserRejectedRequestError());
          } else if (approveParams.current?.plain?.reject) {
            approveParams.current.plain.reject(new UserRejectedRequestError());
          } else if (approveParams.current?.signature?.reject) {
            approveParams.current.signature.reject(new UserRejectedRequestError());
          }
        }}
      />
    );
  } else if (!hasWallets) {
    /**
     * Must load wallets (authenticate again)
     */
    modalContent = <WalletLoad />;
  } else {
    /**
     * Default UI
     */
    modalContent = <WalletMain />;
  }

  return (
    <div>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <>
          <div
            className={clsx([
              'sm:mb-8 mb-12',
              !loggedIn ? 'text-center' : 'flex justify-between items-center',
            ])}
          >
            <div className="shrink-0">
              <button
                className="flex"
                onClick={() => {
                  setScreen('main');
                  closeApproveScreen(false, false);
                }}
              >
                <Logo />
              </button>
            </div>

            {!!loggedIn && <WalletNetworkWidget />}
          </div>

          {/* Change chain content is rendered in addition to other content -- to preserve last state */}
          {targetChain.chainId > 0 && (
            <div>
              <WalletChainChange
                chainId={targetChain.chainId}
                onSuccess={() => {
                  targetChain.resolve(true);
                  dispatch({
                    type: 'setValue',
                    payload: { key: 'networkId', value: targetChain.chainId },
                  });

                  if (
                    targetChain.modalWasOpen ||
                    !!txToConfirm ||
                    !!messageToSign ||
                    !!contractFunctionData
                  ) {
                    setTargetChain(t => ({
                      ...t,
                      modalWasOpen: false,
                      chainId: 0,
                    }));
                  } else {
                    setIsModalOpen(false);
                  }
                }}
                onDecline={() => {
                  targetChain.resolve(false);

                  if (!targetChain.modalWasOpen) {
                    setIsModalOpen(false);
                  } else {
                    setTargetChain(t => ({
                      ...t,
                      modalWasOpen: false,
                      chainId: 0,
                    }));
                  }
                }}
              />
            </div>
          )}

          <div className={clsx({ hidden: targetChain.chainId > 0 })}>{modalContent}</div>
        </>
      </Modal>

      <button
        id="oaw-wallet-widget-btn"
        className={!disableDefaultActivatorStyle ? 'oaw-btn-default-style' : undefined}
        onClick={() => setIsModalOpen(true)}
      >
        {state.loadingWallets ? (
          <span>&hellip;</span>
        ) : // <span
        //   style={{
        //     position: 'absolute',
        //     top: '50%',
        //     left: '50%',
        //     transform: 'translate(-50%, -50%)',
        //     marginTop: '1px',
        //   }}
        // >
        //   <Spinner />
        // </span>
        loggedIn ? (
          'Open wallet'
        ) : (
          'Sign in'
        )}
      </button>
    </div>
  );
}

function Modal({
  children,
  isOpen,
  setIsOpen,
}: {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (to: boolean) => void;
}) {
  return (
    <>
      <Transition show={isOpen}>
        <Dialog
          id="oaw-wallet-widget"
          open={isOpen}
          style={{
            position: 'relative',
            zIndex: '10001',
          }}
          onClose={() => setIsOpen(false)}
        >
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
          </TransitionChild>

          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 w-screen overflow-y-auto p-4">
              <div className="flex items-center justify-center min-h-full">
                <DialogPanel className="relative max-w-[440px] w-full min-h-[476px] bg-dark p-8 sm:p-12 border border-brightdark text-offwhite flex flex-col">
                  <button className="flex absolute top-2 right-2" onClick={() => setIsOpen(false)}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 10.6569L6.34317 5L4.92896 6.41421L10.5858 12.0711L4.92898 17.7279L6.3432 19.1421L12 13.4853L17.6569 19.1421L19.0711 17.7279L13.4143 12.0711L19.0711 6.41421L17.6569 5L12 10.6569Z"
                        fill="#9C9C95"
                      />
                    </svg>
                  </button>

                  {children}

                  <div className="flex-grow"></div>

                  <p className="text-xs mt-6 text-center">
                    <a
                      href="https://apillon.io/"
                      target="_blank"
                      className="rounded-sm opacity-100 hover:opacity-80"
                    >
                      Powered by ©Apillon
                    </a>
                  </p>
                </DialogPanel>
              </div>
            </div>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
}

export default function WalletWidget(props: AppProps) {
  return (
    <WalletProvider {...props}>
      <TransactionsProvider>
        <Wallet {...props} />
      </TransactionsProvider>
    </WalletProvider>
  );
}
