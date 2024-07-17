import { useEffect, useRef } from 'react';
import { initializeApp, AppProps } from '@embedded-wallet/ui';

export function WalletWidget({ className, ...params }: AppProps & { className?: string }) {
  const initialized = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      if (initialized.current) {
        return;
      }

      initialized.current = true;

      initializeApp('#embedded-wallet-activator-react', params);
    }, 5);
  }, []);

  return <div id="embedded-wallet-activator-react" className={className}></div>;
}
