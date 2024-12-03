import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { GlobalProvider } from './global.context.tsx';
import WalletAuth from './components/WalletAuth.tsx';
import Logo from './components/Logo.tsx';
import { credentialGet } from '@apillon/wallet-sdk';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalProvider>
      <div className="flex flex-col min-h-[100svh] justify-center items-center">
        <div className="relative max-w-[440px] w-full min-h-[476px] bg-dark p-8 sm:p-12 border border-brightdark text-offwhite flex flex-col">
          <div className="sm:mb-8 mb-12 text-center">
            <Logo className="inline-block" />
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

// #region iframe auth
window.addEventListener('message', ev => {
  if (ev.data.type === 'get_pk_credentials') {
    getPasskey(ev.data.id, ev.data.content);
  }
});

async function getPasskey(
  eventId: number,
  content: { credentials: Uint8Array[]; challenge: Uint8Array }
) {
  const credentials = await credentialGet(
    // binary credential ids
    content.credentials,
    // challenge
    content.challenge
  );

  window.top?.postMessage(
    {
      type: 'apillon_pk_response',
      id: eventId,
      content: {
        credentials,
      },
    },
    '*'
  );
}
// #endregion
