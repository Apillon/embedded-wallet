import { computed, onMounted, shallowRef } from 'vue';
import {
  abort,
  EmbeddedWallet,
  PlainTransactionParams,
  SignMessageParams,
  WindowId,
} from '@apillon/wallet-sdk';

export function useWallet() {
  const wallet = shallowRef<EmbeddedWallet>();

  onMounted(() => {
    checkForWindowWallet();
  });

  function checkForWindowWallet() {
    if (typeof window !== 'undefined' && window[WindowId]) {
      wallet.value = window[WindowId];
      return;
    }
    setTimeout(checkForWindowWallet, 50);
  }

  return {
    wallet: computed(() => wallet.value),

    signMessage: (message: string, options?: SignMessageParams) =>
      wallet.value!.signMessage({
        message,
        mustConfirm: true,
        ...options,
      }),

    sendTransaction: async (tx: PlainTransactionParams['tx'], options?: PlainTransactionParams) => {
      const res = await wallet.value!.signPlainTransaction({
        tx,
        mustConfirm: true,
        ...options,
      });

      if (!res?.signedTxData) {
        return abort('CANT_GET_SIGNED_TX');
      }

      return await wallet.value!.broadcastTransaction(res.signedTxData, res.chainId);
    },
  };
}

export default useWallet;
