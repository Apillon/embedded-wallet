import { useEffect, useRef } from 'react';
import { EmbeddedWalletUI, AppProps } from '@apillon/wallet-ui';

export function EmbeddedWallet({ className, ...params }: AppProps & { className?: string }) {
  const initialized = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      if (initialized.current) {
        return;
      }

      initialized.current = true;

      EmbeddedWalletUI('#embedded-wallet-activator-react', params);
    }, 5);
  }, []);

  return <div id="embedded-wallet-activator-react" className={className}></div>;
}
