<script setup lang="ts">
import { DataTower } from '@datatower-ai/sdk-core-js/web.mjs';
import { ref } from 'vue';

const emit = defineEmits<{ (e: 'initialize'): void }>();

type Properties = Parameters<typeof DataTower.initSDK>[0];
const initial: Properties = {
  token: 'token',
  app_id: 'app_id',
  server_url: 'http://example.com/report',
  isDebug: true,
};

const properties = ref(JSON.stringify(initial, null, 4));

function confirm() {
  try {
    const data = JSON.parse(properties.value);
    DataTower.initSDK(data as Properties).then(
      () => emit('initialize'),
      () => window.alert('初始化失败，请检查参数'),
    );
  } catch {
    window.alert('请输入合法的JSON字符串');
  }
}
</script>

<template>
  <div class="card">
    <textarea v-model="properties" />
    <button @click="confirm()">initSDK</button>
  </div>
</template>

<style scoped></style>
