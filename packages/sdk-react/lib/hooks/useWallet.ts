import { useEffect, useState } from 'react';
import {
  abort,
  EmbeddedWallet,
  PlainTransactionParams,
  SignMessageParams,
  WindowId,
} from '@apillon/wallet-sdk';

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
    wallet: wallet!,

    signMessage: (message: string, options?: SignMessageParams) =>
      wallet!.signMessage({
        message,
        mustConfirm: true,
        ...options,
      }),

    sendTransaction: async (tx: PlainTransactionParams['tx'], options?: PlainTransactionParams) => {
      const res = await wallet!.signPlainTransaction({
        tx,
        mustConfirm: true,
        ...options,
      });

      if (!res?.signedTxData) {
        abort('CANT_GET_SIGNED_TX');
        return;
      }

      return await wallet!.broadcastTransaction(res.signedTxData, res.chainId);
    },
  };
}

export default useWallet;
