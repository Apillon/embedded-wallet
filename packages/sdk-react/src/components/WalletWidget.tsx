import { AppParams } from '@oasis-app-wallet/sdk';
import { initializeApp } from '@oasis-app-wallet/sdk/ui';

export default function WalletWidget({ className, ...params }: AppParams & { className?: string }) {
  setTimeout(() => {
    initializeApp('#oasis-app-wallet-activator-react', params);
  }, 5);

  return <div id="oasis-app-wallet-activator-react" className={className}></div>;
}
