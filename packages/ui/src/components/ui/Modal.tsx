import { ReactNode } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import clsx from 'clsx';

export const MODAL_TRANSITION_TIME = 200;

export default ({
  children,
  isOpen,
  isAuth = false,
  setIsOpen,
}: {
  children: ReactNode;
  isOpen: boolean;
  isAuth?: boolean;
  setIsOpen: (to: boolean) => void;
}) => (
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
              <DialogPanel
                className={clsx(
                  'relative min-w-[400px] w-full min-h-[380px] bg-dark border border-lightdark text-offwhite flex flex-col',
                  isAuth ? 'max-w-[445px]' : 'max-w-[400px]'
                )}
              >
                <button
                  className="flex absolute top-2 right-2 oaw-button-plain invisible"
                  onClick={() => setIsOpen(false)}
                >
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

                <p className={clsx('text-xs px-8 text-center', isAuth ? 'pb-8 sm:pb-12' : 'pb-6')}>
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
