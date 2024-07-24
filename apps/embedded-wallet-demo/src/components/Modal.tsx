// import myImage from '../assets/image.png'; // Adjust the path as needed

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { ReactNode } from 'react';

export default function Modal({
  children,
  isOpen,
  maxWidth = '512px',
  setIsOpen,
}: {
  children: ReactNode;
  isOpen: boolean;
  maxWidth?: string;
  setIsOpen: (to: boolean) => void;
}) {
  return (
    <>
      <Transition show={isOpen}>
        <Dialog open={isOpen} className="relative z-50" onClose={() => setIsOpen(false)}>
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
                  className="relative w-full min-h-[600px] bg-dark p-8 sm:py-16 sm:px-12 border border-brightdark text-offwhite"
                  style={{ maxWidth }}
                >
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

// const Modal = ({ isOpen = false, onClose }: { isOpen?: boolean; onClose?: () => void }) => {
//   return (
//     <div className={`modal ${isOpen ? 'block' : 'hidden'}`}>
//       <div className="modal-content flex items-center justify-center">
//         <span className="close" onClick={() => onClose?.()}>
//           &times;
//         </span>
//         <img className="max-w-[767px]" src={myImage} alt="" />
//       </div>
//     </div>
//   );
// };
