import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Network, WalletProvider, useWalletContext } from '../contexts/wallet.context';
import { ReactNode, useEffect, useRef, useState } from 'react';
import WalletAuth from './WalletAuth';
import WalletMain from './WalletMain';
import { ethers } from 'ethers';
import WalletApprove from './WalletApprove';
import { Events } from '../../lib/types';

function Wallet() {
  const { state, wallet } = useWalletContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [txToConfirm, setTxToConfirm] = useState<ethers.TransactionLike>();
  const [messageToSign, setMessageToSign] = useState('');
  const approveParams =
    useRef<Partial<Events['txApprove'] & { signature: Events['signatureRequest'] }>>();

  const loggedIn = state.username && state.address;

  useEffect(() => {
    const onTxApproveEvent = (params: Events['txApprove']) => {
      if (params.plain) {
        setTxToConfirm(params.plain?.tx);
        approveParams.current = params;
        setIsModalOpen(true);
      }
    };

    const onSignatureRequestEvent = (params: Events['signatureRequest']) => {
      setMessageToSign(params.message as string);
      approveParams.current = { signature: params };
      setIsModalOpen(true);
    };

    if (wallet) {
      wallet.events.on('txApprove', onTxApproveEvent);
      wallet.events.on('signatureRequest', onSignatureRequestEvent);
    }

    return () => {
      if (wallet) {
        wallet.events.off('txApprove', onTxApproveEvent);
        wallet.events.off('signatureRequest', onSignatureRequestEvent);
      }
    };
  }, [wallet]);

  let modalContent = <></>;

  if (!!txToConfirm || !!messageToSign) {
    modalContent = (
      <WalletApprove
        tx={txToConfirm}
        signMessage={messageToSign}
        onApprove={async () => {
          if (approveParams.current) {
            if (approveParams.current.signature) {
              await wallet?.signMessage(approveParams.current.signature);
            } else if (approveParams.current.plain) {
              await wallet?.sendPlainTransaction(approveParams.current.plain);
            }
          }

          setIsModalOpen(false);
          setTxToConfirm(undefined);
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

      <button onClick={() => setIsModalOpen(true)}>
        {loggedIn ? 'Open wallet' : 'Sign in now'}
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
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
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
              <DialogPanel className="relative max-w-lg space-y-4 border bg-black p-12 rounded-lg">
                <button className="absolute top-2 right-2" onClick={() => setIsOpen(false)}>
                  x
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
  networks,
  defaultNetworkId = 0,
}: {
  networks?: Network[];
  defaultNetworkId?: number;
}) {
  return (
    <WalletProvider networks={networks} defaultNetworkId={defaultNetworkId}>
      <Wallet />
    </WalletProvider>
  );
}
