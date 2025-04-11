import { ApiPromise } from '@polkadot/api';
import useWallet from './useWallet';
import { abort, Events, PlainTransactionParams, WalletType } from '@apillon/wallet-sdk';
import { SubmittableExtrinsic } from '@polkadot/api-base/types';
import { useEffect, useState } from 'react';

export function usePolkadot() {
  const { wallet } = useWallet();

  const [polkadotApi, setPolkadotApi] = useState<ApiPromise>();

  useEffect(() => {
    if (wallet) {
      updatePolkadotApi();
      wallet.events.on('dataUpdated', onDataUpdated);
    }
  }, [wallet]);

  function onDataUpdated({ name }: Events['dataUpdated']) {
    if (['defaultNetworkId', 'walletType'].includes(name)) {
      updatePolkadotApi();
    }
  }

  async function updatePolkadotApi() {
    if (wallet?.ss.networks.length && typeof wallet?.defaultNetworkId === 'string') {
      setPolkadotApi(await wallet.ss.getApiForNetworkId());
    } else {
      setPolkadotApi(undefined);
    }
  }

  async function signTransaction(
    tx: SubmittableExtrinsic<any, any>,
    options?: PlainTransactionParams<SubmittableExtrinsic<any, any>>
  ) {
    return await wallet?.ss.signTransaction({
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
    if (wallet?.user.walletType !== WalletType.SUBSTRATE) {
      abort('WRONG_WALLET_ENVIRONMENT');
      return;
    }

    const res = await signTransaction(tx, options);

    if (!res?.signedTxData) {
      abort('CANT_GET_SIGNED_TX');
      return;
    }

    return await wallet!.ss.broadcastTransaction(
      res.signedTxData,
      res.chainId as string,
      internalLabel
    );
  }

  return {
    polkadotApi,
    signTransaction,
    sendTransaction,
  };
}
