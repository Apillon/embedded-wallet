import { computed, onMounted, shallowRef } from 'vue';
import {
  abort,
  EmbeddedWallet,
  PlainTransactionParams,
  SignMessageParams,
  WalletType,
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

    /**
     * EVM transaction
     */
    sendTransaction: async (
      tx: PlainTransactionParams['tx'],
      options?: PlainTransactionParams,
      internalLabel?: string
    ) => {
      if (wallet.value?.user.walletType !== WalletType.EVM) {
        abort('WRONG_WALLET_ENVIRONMENT');
        return;
      }

      const res = await wallet.value!.evm.signPlainTransaction({
        tx,
        mustConfirm: true,
        ...options,
      });

      if (!res?.signedTxData) {
        abort('CANT_GET_SIGNED_TX');
        return;
      }

      return await wallet.value!.evm.broadcastTransaction(
        res.signedTxData,
        res.chainId as number,
        internalLabel
      );
    },
  };
}

export default useWallet;
