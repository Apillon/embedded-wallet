import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { GlobalProvider } from './contexts/global.context.tsx';
import { AuthProvider } from './contexts/auth.context.tsx';
import { credentialGet, credentialCreate } from '@apillon/wallet-sdk';
import clsx from 'clsx';
import Auth from './components/Auth/Auth.tsx';
import Loader from './components/ui/Loader.tsx';
import Logo from './components/ui/Logo.tsx';

const urlParams = new URLSearchParams(window.location.search);

if (!urlParams.has('popup')) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <GlobalProvider>
        <AuthProvider>
          <div className="flex flex-col min-h-[100svh] justify-center items-center">
            <div className="relative max-w-[445px] w-full min-h-[380px] bg-dark border border-lightdark text-offwhite flex flex-col">
              <Auth />

              <div className="flex-grow"></div>

              <p className={clsx('text-xs px-8 text-center', 'pb-8 sm:pb-12')}>
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
        </AuthProvider>
      </GlobalProvider>
    </StrictMode>
  );
} else {
  createRoot(document.getElementById('loading')!).render(
    <StrictMode>
      <div className="flex flex-col min-h-[100svh] justify-center items-center p-8 text-center">
        <h1 className="hidden">Apillon</h1>

        <Logo className="mb-8" />

        <Loader />

        <p id="statustext" className="text-lightgrey text-base mt-8">
          Configuring passkey
        </p>
      </div>
    </StrictMode>
  );
}

// #region iframe/popup
window.addEventListener('load', () => {
  window.opener?.postMessage({ type: 'apillon_pk_load' }, '*');
});

window.addEventListener('message', ev => {
  if (ev.data.type === 'get_pk_credentials') {
    getPasskey(ev.data.id, ev.data.content);
  } else if (ev.data.type === 'create_pk_credentials') {
    createPasskey(ev.data.id, ev.data.content);
  } else if (ev.data.type === 'save_pk_event_id') {
    sessionStorage.setItem('event_id', ev.data.id);
  } else if (ev.data.type === 'storage_get') {
    window.top?.postMessage(
      {
        type: 'apillon_pk_response',
        id: ev.data.id,
        content: localStorage.getItem(ev.data.content),
      },
      '*'
    );
  } else if (ev.data.type === 'storage_set') {
    if (ev.data.content && ev.data.content.key) {
      localStorage.setItem(ev.data.content.key, ev.data.content.value);
    }
  }
});

async function getPasskey(
  eventId: number,
  content: { credentials: Uint8Array[]; challenge: Uint8Array }
) {
  try {
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
  } catch (e) {
    window.top?.postMessage(
      {
        type: 'apillon_pk_error',
        id: eventId,
        content: e,
      },
      '*'
    );
  }
}

async function createPasskey(
  eventId: number,
  content: { hashedUsername: Buffer; username: string }
) {
  try {
    const cred = await credentialCreate(
      {
        name: 'Embedded Wallet Account',
        id: window.location.hostname,
      },
      {
        id: content.hashedUsername,
        name: content.username,
        displayName: content.username,
      },
      crypto.getRandomValues(new Uint8Array(32))
    );
    window.opener?.postMessage(
      {
        type: 'apillon_pk_response',
        id: eventId,
        content: {
          credentialId: cred.id,
          pubkey: cred.ad.attestedCredentialData!.credentialPublicKey!,
        },
      },
      '*'
    );
  } catch (e) {
    window.opener?.postMessage(
      {
        type: 'apillon_pk_error',
        id: eventId,
        content: e,
      },
      '*'
    );
  }
}
// #endregion
