import { reactive, readonly, watch } from 'vue';
import useWallet from './useWallet';
import {
  AccountWallet,
  AccountWalletTypes,
  AuthStrategyName,
  Events,
  WalletType,
} from '@apillon/wallet-sdk';

export function useAccount() {
  const { wallet } = useWallet();

  const info = reactive({
    username: '',
    activeWallet: undefined as AccountWallet | undefined,
    authStrategy: 'passkey' as AuthStrategyName,
    walletType: WalletType.EVM as AccountWalletTypes,
  });

  watch(
    wallet,
    (val, old) => {
      if (!!val && !old) {
        info.username = val.user.username;
        info.activeWallet = val.getCurrentWallet();
        info.authStrategy = val.user.authStrategy;

        val.events.on('dataUpdated', onDataUpdated);
      }
    },
    { immediate: true }
  );

  function onDataUpdated({ name, newValue }: Events['dataUpdated']) {
    if (name === 'username') {
      info.username = newValue;
    } else if (name === 'walletIndex') {
      info.activeWallet = wallet.value?.getCurrentWallet();
    } else if ((name === 'walletsSS' || name === 'walletsEVM') && newValue.length) {
      info.activeWallet = wallet.value?.getCurrentWallet();
    } else if (name === 'authStrategy') {
      info.authStrategy = newValue;
    }
  }

  async function getBalance(networkId?: string | number) {
    if (!info.activeWallet) {
      return '0';
    }

    return await wallet.value?.getAccountBalance(info.activeWallet.address, networkId);
  }

  return {
    info: readonly(info),
    getBalance,
  };
}

export default useAccount;
