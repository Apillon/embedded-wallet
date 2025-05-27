import { ApiPromise } from '@polkadot/api';
import useWallet from './useWallet';
import { computed, shallowRef, watch } from 'vue';
import { abort, Events, PlainTransactionParams, WalletType } from '@apillon/wallet-sdk';
import { SubmittableExtrinsic } from '@polkadot/api-base/types';

export function usePolkadot() {
  const { wallet } = useWallet();

  const polkadotApi = shallowRef<ApiPromise>();

  watch(
    wallet,
    v => {
      if (v) {
        updatePolkadotApi();
        v.events.on('dataUpdated', onDataUpdated);
      }
    },
    { immediate: true }
  );

  function onDataUpdated({ name }: Events['dataUpdated']) {
    if (['defaultNetworkId', 'walletType'].includes(name)) {
      updatePolkadotApi();
    }
  }

  async function updatePolkadotApi() {
    if (wallet.value?.ss.networks.length && typeof wallet.value?.defaultNetworkId === 'string') {
      polkadotApi.value = await wallet.value.ss.getApiForNetworkId();
    } else {
      polkadotApi.value = undefined;
    }
  }

  async function signTransaction(
    tx: SubmittableExtrinsic<any, any>,
    options?: PlainTransactionParams<SubmittableExtrinsic<any, any>>
  ) {
    return await wallet.value?.ss.signTransaction({
      tx,
      mustConfirm: true,
      ...options,
    });
  }

  async function sendTransaction(
    tx: SubmittableExtrinsic<any, any>,
    options?: PlainTransactionParams<SubmittableExtrinsic<any, any>>,
    internalLabel?: string
  ) {
    if (wallet.value?.user.walletType !== WalletType.SUBSTRATE) {
      abort('WRONG_WALLET_ENVIRONMENT');
      return;
    }

    const res = await signTransaction(tx, options);

    if (!res?.signedTxData) {
      abort('CANT_GET_SIGNED_TX');
      return;
    }

    return await wallet.value!.ss.broadcastTransaction(
      res.signedTxData,
      res.chainId as string,
      internalLabel
    );
  }

  return {
    polkadotApi: computed(() => polkadotApi.value),
    signTransaction,
    sendTransaction,
  };
}
