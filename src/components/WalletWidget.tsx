import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { WalletProvider, useWalletContext } from '../contexts/wallet.context';
import { useState } from 'react';

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
  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">Deactivate account</DialogTitle>
            <Description>This will permanently deactivate your account</Description>
            <p>
              Are you sure you want to deactivate your account? All of your data will be permanently
              removed.
            </p>
            <div className="flex gap-4">
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button onClick={() => setIsOpen(false)}>Deactivate</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
