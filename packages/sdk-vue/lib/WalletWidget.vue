<script lang="ts" setup>
import { initializeApp, AppProps } from '@oasis-app-wallet/sdk/ui';
import { onMounted } from 'vue';
import '@oasis-app-wallet/sdk/css';

const props = defineProps<AppProps>();

onMounted(() => {
  initializeApp('#oasis-app-wallet-activator-vue', props);
});
</script>

<template>
  <div id="oasis-app-wallet-activator-vue"></div>
</template>
