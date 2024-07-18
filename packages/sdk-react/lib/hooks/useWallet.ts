import { useEffect, useState } from 'react';
import { EmbeddedWallet, WindowId } from '@embedded-wallet/sdk';

export function useWallet() {
  const [wallet, setWallet] = useState<EmbeddedWallet>();

  useEffect(() => {
    checkForWindowWallet();
  }, []);

  /**
   * Keep checking if not available
   */
  function checkForWindowWallet() {
    if (typeof window !== 'undefined' && window[WindowId]) {
      setWallet(window[WindowId]);
      return;
    }
    setTimeout(checkForWindowWallet, 50);
  }

  return {
    wallet,
  };
}

export default useWallet;
