import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { GlobalProvider } from './global.context.tsx';
import WalletAuth from './components/WalletAuth.tsx';
import Logo from './components/Logo.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalProvider>
      <div className="flex flex-col min-h-[100svh] justify-center items-center">
        <div className="relative max-w-[440px] w-full min-h-[476px] bg-dark p-8 sm:p-12 border border-brightdark text-offwhite flex flex-col">
          <div className="sm:mb-8 mb-12 text-center">
            <Logo />
          </div>

          <WalletAuth />

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
        </div>
      </div>
    </GlobalProvider>
  </StrictMode>
);
