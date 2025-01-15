<script lang="ts" setup>
import { EmbeddedWalletUI, AppProps } from '@apillon/wallet-ui';
import { onMounted } from 'vue';

const props = defineProps<AppProps>();

onMounted(() => {
  EmbeddedWalletUI('#embedded-wallet-activator-vue', props);
});
</script>

<template>
  <div id="embedded-wallet-activator-vue"></div>
</template>
