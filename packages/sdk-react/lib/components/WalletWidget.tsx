// import { AppProps, initializeApp } from '#sdk/src/main.tsx';
// import { AppProps, initializeApp } from '@sdk/src/main';
// import { AppProps, initializeApp } from '../../../sdk/src/main';
import { AppProps, initializeApp } from '@oasis-app-wallet/sdk/ui';
// import { AppProps, initializeApp } from '../types';
// import '@sdk/src/index.css';
// import '@oasis-app-wallet/sdk/css';

export function WalletWidget({ className, ...params }: AppProps & { className?: string }) {
  setTimeout(() => {
    initializeApp('#oasis-app-wallet-activator-react', params);
  }, 5);

  return <div id="oasis-app-wallet-activator-react" className={className}></div>;
}
