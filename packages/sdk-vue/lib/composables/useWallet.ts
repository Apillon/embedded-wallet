import { computed, onMounted } from 'vue';
import { OasisAppWallet, WindowId } from '@oasis-app-wallet/sdk';

export function useWallet(): any {
  let wallet = undefined as OasisAppWallet | undefined;

  const shh = computed({
    get: () => wallet,
    set: val => (wallet = val),
  });

  onMounted(() => {
    checkForWindowWallet();
  });

  function checkForWindowWallet() {
    if (typeof window !== 'undefined' && window[WindowId]) {
      shh.value = window[WindowId];
      return;
    }
    setTimeout(checkForWindowWallet, 50);
  }

  return {
    wallet: shh,
  };
}

export default useWallet;
