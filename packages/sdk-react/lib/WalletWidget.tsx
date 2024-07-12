import { initializeApp, AppProps } from '@oasis-app-wallet/sdk/ui';

export function WalletWidget({ className, ...params }: AppProps & { className?: string }) {
  setTimeout(() => {
    initializeApp('#oasis-app-wallet-activator-react', params);
  }, 5);

  return <div id="oasis-app-wallet-activator-react" className={className}></div>;
}
