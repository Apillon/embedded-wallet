import React from 'react';
import ReactDOM from 'react-dom/client';
import EmbeddedWallet, { AppProps } from './components/EmbeddedWallet';
import './index.css';

export function EmbeddedWalletUI(activatorSelector?: string, options?: AppProps) {
  if (typeof document === 'undefined') {
    console.error('Cannot initialize embedded wallet app UI');
    return;
  }

  let selectedEl = null as HTMLElement | null;

  if (activatorSelector) {
    selectedEl = document.querySelector(activatorSelector);
  }

  if (!selectedEl) {
    selectedEl = document.createElement('div');
    selectedEl.id = 'embedded-wallet';
    selectedEl.setAttribute('style', 'display: none;');
    document.body.appendChild(selectedEl);
  }

  if (!options) {
    options = { clientId: '' };
  }

  ReactDOM.createRoot(selectedEl).render(
    <React.StrictMode>
      <EmbeddedWallet {...options} />
    </React.StrictMode>
  );
}

export type { AppProps };
