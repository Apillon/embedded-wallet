import { reactive, readonly, watch } from 'vue';
import useWallet from './useWallet';
import { AccountWallet, AuthStrategyName, Events } from '@apillon/wallet-sdk';

export function useAccount() {
  const { wallet } = useWallet();

  const info = reactive({
    username: '',
    activeWallet: undefined as AccountWallet | undefined,
    authStrategy: 'passkey' as AuthStrategyName,
  });

  watch(
    wallet,
    (val, old) => {
      if (!!val && !old) {
        info.username = val.lastAccount.username;
        info.activeWallet = val.lastAccount.wallets[val.lastAccount.walletIndex];
        info.authStrategy = val.lastAccount.authStrategy;

        val.events.on('dataUpdated', onDataUpdated);
      }
    },
    { immediate: true }
  );

  function onDataUpdated({ name, newValue }: Events['dataUpdated']) {
    if (name === 'username') {
      info.username = newValue;
    } else if (name === 'walletIndex') {
      info.activeWallet = wallet.value?.lastAccount.wallets[newValue];
    } else if (name === 'authStrategy') {
      info.authStrategy = newValue;
    }
  }

  async function getBalance(networkId = undefined) {
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
