<script setup lang="ts">
import { DataTower } from '@datatower-ai/sdk-core-js/web.mjs';
import { ref } from 'vue';

type Properties = Parameters<typeof DataTower.userAdd>[0];
const initial: Properties = { userAdd_number: 1 };

const properties = ref(JSON.stringify(initial, null, 4));

function confirm() {
  try {
    const data = JSON.parse(properties.value);
    DataTower.userAdd(data as Properties);
  } catch {
    window.alert('请输入合法的JSON字符串');
  }
}
</script>

<template>
  <div class="card">
    <textarea v-model="properties" />
    <button @click="confirm()">userAdd</button>
  </div>
</template>

<style scoped></style>
