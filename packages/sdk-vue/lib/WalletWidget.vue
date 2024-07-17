<script lang="ts" setup>
import { initializeApp, AppProps } from '@oasis-app-wallet/ui';
import { onMounted } from 'vue';

const props = defineProps<AppProps>();

onMounted(() => {
  initializeApp('#oasis-app-wallet-activator-vue', props);
});
</script>

<template>
  <div id="oasis-app-wallet-activator-vue"></div>
</template>
