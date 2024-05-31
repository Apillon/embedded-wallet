import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { WalletProvider, useWalletContext } from '../contexts/wallet.context';
import { useState } from 'react';
import WalletAuth from './WalletAuth';
import WalletMain from './WalletMain';

export default function WalletWidget() {
  return (
    <WalletProvider>
      <div>
        <WidgetButton />
      </div>
    </WalletProvider>
  );
}

function WidgetButton() {
  const { state } = useWalletContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loggedIn = state.username && state.address;

  return (
    <>
      <WidgetModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />

      <button onClick={() => setIsModalOpen(true)}>
        {loggedIn ? 'Open wallet' : 'Sign in now'}
      </button>
    </>
  );
}

function WidgetModal({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (to: boolean) => void }) {
  const { state } = useWalletContext();

  const loggedIn = state.username && state.address;

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

                {!loggedIn && <WalletAuth />}

                {!!loggedIn && <WalletMain />}
              </DialogPanel>
            </div>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
}
