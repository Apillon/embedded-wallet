import React from 'react';
import ReactDOM from 'react-dom/client';
import WalletWidget, { AppProps } from './components/WalletWidget';
import './index.css';

export function initializeApp(activatorSelector?: string, options?: AppProps) {
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
      <WalletWidget {...options} />
    </React.StrictMode>
  );
}

export type { AppProps };
