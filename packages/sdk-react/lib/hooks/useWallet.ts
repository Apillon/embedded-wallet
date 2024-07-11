import { useEffect, useState } from 'react';
import { OasisAppWallet, WindowId } from '@oasis-app-wallet/sdk';

export default function useWallet() {
  const [wallet, setWallet] = useState<OasisAppWallet>();

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
