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

    sendTransaction: async (
      tx: PlainTransactionParams['tx'],
      options?: PlainTransactionParams,
      internalLabel?: string
    ) => {
      const res = await wallet!.signPlainTransaction({
        tx,
        mustConfirm: true,
        ...options,
      });

      if (!res?.signedTxData) {
        return abort('CANT_GET_SIGNED_TX');
      }

      return await wallet!.broadcastTransaction(res.signedTxData, res.chainId, internalLabel);
    },
  };
}

export default useWallet;
