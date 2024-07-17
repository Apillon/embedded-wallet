import { computed, onMounted, shallowRef } from 'vue';
import { OasisAppWallet, WindowId } from '@oasis-app-wallet/sdk';

export function useWallet(): any {
  const wallet = shallowRef<OasisAppWallet>();

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
  };
}

export default useWallet;
