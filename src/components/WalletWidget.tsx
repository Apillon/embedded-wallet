import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Network, WalletProvider, useWalletContext } from '../contexts/wallet.context';
import { ReactNode, useEffect, useRef, useState } from 'react';
import WalletAuth from './WalletAuth';
import WalletMain from './WalletMain';
import { ethers } from 'ethers';
import WalletApprove, { DisplayedContractParams } from './WalletApprove';
import { Events } from '../../lib/types';
import { TransactionsProvider, useTransactionsContext } from '../contexts/transactions.context';
import Btn from './Btn';

function Wallet() {
  const { state, wallet } = useWalletContext();
  const { dispatch: dispatchTx } = useTransactionsContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [txToConfirm, setTxToConfirm] = useState<ethers.TransactionLike>();
  const [contractFunctionData, setContractFunctionData] = useState<DisplayedContractParams>();
  const [messageToSign, setMessageToSign] = useState('');

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

    const onTransactionSubmittedEvent = (params: Events['transactionSubmitted']) => {
      dispatchTx({ type: 'addTx', payload: params });
    };

    if (wallet) {
      wallet.events.on('txApprove', onTxApproveEvent);
      wallet.events.on('signatureRequest', onSignatureRequestEvent);
      wallet.events.on('transactionSubmitted', onTransactionSubmittedEvent);
    }

    return () => {
      if (wallet) {
        wallet.events.off('txApprove', onTxApproveEvent);
        wallet.events.off('signatureRequest', onSignatureRequestEvent);
        wallet.events.off('transactionSubmitted', onTransactionSubmittedEvent);
      }
    };
  }, [wallet]);

  let modalContent = <></>;

  if (!!txToConfirm || !!messageToSign || !!contractFunctionData) {
    modalContent = (
      <WalletApprove
        tx={txToConfirm}
        signMessage={messageToSign}
        contractFunctionData={contractFunctionData}
        onApprove={async () => {
          if (approveParams.current) {
            if (approveParams.current.signature) {
              await wallet?.signMessage({
                ...approveParams.current.signature,
                authData: { username: state.username },
              });
            } else if (approveParams.current.plain) {
              const res = await wallet?.signPlainTransaction({
                ...approveParams.current.plain,
                authData: { username: state.username },
              });
              if (res) {
                const { signedTxData, chainId } = res;
                const res2 = await wallet?.broadcastTransaction(signedTxData, chainId);
                if (res2) {
                  const receipt = await wallet?.waitForTxReceipt(res2.txHash, res2.ethProvider);
                  console.log(receipt);
                  return receipt;
                }
              }
            } else if (approveParams.current.contractWrite) {
              const res = await wallet?.signContractWrite({
                ...approveParams.current.contractWrite,
                authData: { username: state.username },
              });
              if (res) {
                const { signedTxData, chainId } = res;
                const res2 = await wallet?.broadcastTransaction(signedTxData, chainId);
                console.log(res2);
              }
            }
          }

          setIsModalOpen(false);
          setTxToConfirm(undefined);
          setContractFunctionData(undefined);
          setMessageToSign('');
        }}
        onDecline={() => {
          setIsModalOpen(false);
          setTxToConfirm(undefined);
          setMessageToSign('');
        }}
      />
    );
  } else if (loggedIn) {
    modalContent = <WalletMain />;
  } else {
    modalContent = <WalletAuth />;
  }

  return (
    <div>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        {modalContent}
      </Modal>

      <Btn id="oaw-wallet-widget-btn" onClick={() => setIsModalOpen(true)}>
        {loggedIn ? 'Open wallet' : 'Sign in now'}
      </Btn>
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
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
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
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
}

export default function WalletWidget({
  accountManagerAddress,
  sapphireUrl,
  defaultNetworkId = 0,
  networks,
}: {
  accountManagerAddress?: string;
  sapphireUrl?: string;
  defaultNetworkId?: number;
  networks?: Network[];
}) {
  return (
    <WalletProvider
      accountManagerAddress={accountManagerAddress}
      sapphireUrl={sapphireUrl}
      networks={networks}
      defaultNetworkId={defaultNetworkId}
    >
      <TransactionsProvider>
        <Wallet />
      </TransactionsProvider>
    </WalletProvider>
  );
}
