import { reactive, readonly, watch } from 'vue';
import useWallet from './useWallet';
import { AuthStrategyName, Events } from '@apillon/wallet-sdk';

export function useAccount() {
  const { wallet } = useWallet();

  const info = reactive({
    username: '',
    address: '',
    authStrategy: 'passkey' as AuthStrategyName,
  });

  watch(
    wallet,
    (val, old) => {
      if (!!val && !old) {
        info.username = val.lastAccount.username;
        info.address = val.lastAccount.address;
        info.authStrategy = val.lastAccount.authStrategy;

        val.events.on('dataUpdated', onDataUpdated);
      }
    },
    { immediate: true }
  );

  function onDataUpdated({ name, newValue }: Events['dataUpdated']) {
    if (name === 'username') {
      info.username = newValue;
    } else if (name === 'address') {
      info.address = newValue;
    } else if (name === 'authStrategy') {
      info.authStrategy = newValue;
    }
  }

  async function getBalance(networkId = undefined) {
    return await wallet.value?.getAccountBalance(info.address, networkId);
  }

  return {
    info: readonly(info),
    getBalance,
  };
}

export default useAccount;
