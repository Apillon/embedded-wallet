<script lang="ts" setup>
import { initializeApp, AppProps } from '@apillon/wallet-ui';
import { onMounted } from 'vue';

const props = defineProps<AppProps>();

onMounted(() => {
  initializeApp('#embedded-wallet-activator-vue', props);
});
</script>

<template>
  <div id="embedded-wallet-activator-vue"></div>
</template>
