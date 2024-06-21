import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppParams } from '../lib/types';
import WalletWidget from './components/WalletWidget';
import './index.css';

export function initializeApp(options: AppParams) {
  if (typeof document === 'undefined') {
    console.error('Cannot initialize oasis wallet app UI');
    return;
  }

  const el = document.createElement('div');
  el.id = 'oasis-app-wallet';
  document.body.appendChild(el);

  ReactDOM.createRoot(el).render(
    <React.StrictMode>
      <WalletWidget {...options} />
    </React.StrictMode>
  );
}
