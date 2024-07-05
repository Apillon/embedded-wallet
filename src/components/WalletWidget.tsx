import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Network, WalletProvider, useWalletContext } from '../contexts/wallet.context';
import { ReactNode, useEffect, useRef, useState } from 'react';
import WalletAuth from './WalletAuth';
import WalletMain from './WalletMain';
import { ethers } from 'ethers';
import WalletApprove, { DisplayedContractParams } from './WalletApprove';
import { AppParams, Events } from '../../lib/types';
import { TransactionsProvider, useTransactionsContext } from '../contexts/transactions.context';
import Btn from './Btn';

export type AppProps = {
  networks?: Network[];
  disableAutoBroadcastAfterSign?: boolean;
} & AppParams;

function Wallet({ disableAutoBroadcastAfterSign = false }: AppProps) {
  const { state, wallet, setScreen, handleError } = useWalletContext();
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

  const approveParams =
    useRef<Partial<Events['txApprove'] & { signature: Events['signatureRequest'] }>>();

  const loggedIn = state.username && state.address;

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

    const onTxSubmittedEvent = (params: Events['txSubmitted']) => {
      dispatchTx({ type: 'addTx', payload: params });
    };

    if (wallet) {
      wallet.events.on('txApprove', onTxApproveEvent);
      wallet.events.on('signatureRequest', onSignatureRequestEvent);
      wallet.events.on('txSubmitted', onTxSubmittedEvent);
    }

    return () => {
      if (wallet) {
        wallet.events.off('txApprove', onTxApproveEvent);
        wallet.events.off('signatureRequest', onSignatureRequestEvent);
        wallet.events.off('txSubmitted', onTxSubmittedEvent);
      }
    };
  }, [wallet]);

  /**
   * Reset approve screen if closed
   */
  useEffect(() => {
    if (!isModalOpen) {
      if (!!txToConfirm || !!messageToSign || !!contractFunctionData) {
        closeApproveScreen();
      }

      if (state.walletScreen !== 'main') {
        setScreen('main');
      }
    }
  }, [isModalOpen]);

  function closeApproveScreen() {
    setIsModalOpen(false);
    setTxToConfirm(undefined);
    setContractFunctionData(undefined);
    setMessageToSign('');
    setApprovedData({
      title: '',
      txHash: '',
      explorerUrl: '',
    });
  }

  let modalContent = <></>;

  if (!loggedIn) {
    /**
     * Login/register
     */
    modalContent = <WalletAuth />;
  } else if (!!txToConfirm || !!messageToSign || !!contractFunctionData) {
    if (approvedData.title) {
      /**
       * Transaction submitted to network
       */
      modalContent = (
        <div className="text-center">
          <h2 className="mb-6">{approvedData.title}</h2>

          {!!approvedData.explorerUrl && (
            <p className="mb-6">
              <Btn variant="secondary" href={approvedData.explorerUrl} blank>
                View on explorer
              </Btn>
            </p>
          )}

          {!!approvedData.txHash && (
            <p className="break-all my-3">Transaction hash: {approvedData.txHash}</p>
          )}

          <div className="mt-12">
            <Btn onClick={() => closeApproveScreen()}>Close</Btn>
          </div>
        </div>
      );
    } else {
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

                  closeApproveScreen();
                } else if (approveParams.current.plain) {
                  const res = await wallet?.signPlainTransaction({
                    ...approveParams.current.plain,
                    authData: { username: state.username },
                  });

                  if (disableAutoBroadcastAfterSign) {
                    closeApproveScreen();
                  } else if (res) {
                    const { signedTxData, chainId } = res;
                    const res2 = await wallet?.broadcastTransaction(
                      signedTxData,
                      chainId,
                      approveParams.current.plain.label || ''
                    );

                    setApprovedData({
                      title: 'Transaction submitted',
                      explorerUrl: res2?.txItem.explorerUrl || '',
                      txHash: res2?.txHash || '',
                    });
                  }
                } else if (approveParams.current.contractWrite) {
                  const res = await wallet?.signContractWrite({
                    ...approveParams.current.contractWrite,
                    authData: { username: state.username },
                  });

                  if (disableAutoBroadcastAfterSign) {
                    closeApproveScreen();
                  } else if (res) {
                    const { signedTxData, chainId } = res;
                    const res2 = await wallet?.broadcastTransaction(
                      signedTxData,
                      chainId,
                      approveParams.current.contractWrite.label || ''
                    );

                    setApprovedData({
                      title: 'Transaction submitted',
                      explorerUrl: res2?.txItem.explorerUrl || '',
                      txHash: res2?.txHash || '',
                    });
                  }
                }
              } catch (e) {
                handleError(e);
              }
            }
          }}
          onDecline={() => closeApproveScreen()}
        />
      );
    }
  } else {
    /**
     * Default UI
     */
    modalContent = <WalletMain />;
  }

  return (
    <div>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        {modalContent}
      </Modal>

      <Btn id="oaw-wallet-widget-btn" onClick={() => setIsModalOpen(true)}>
        {loggedIn ? 'Open wallet' : 'Sign in now'}
      </Btn>

      {/* <Btn
        onClick={async () => {
          const res = await wallet?.contractRead({
            contractAbi: AccountManagerAbi,
            contractAddress: '0xF35C3eB93c6D3764A7D5efC6e9DEB614779437b1',
            contractFunctionName: 'signer',
            chainId: 23295,
          });
          console.log(res);
        }}
      >
        Test
      </Btn> */}
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
          className="relative z-50"
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
                <DialogPanel className="relative max-w-lg w-full min-h-[600px] bg-dark p-8 sm:py-16 sm:px-12 border border-brightdark text-offwhite">
                  <button className="absolute top-2 right-2" onClick={() => setIsOpen(false)}>
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
