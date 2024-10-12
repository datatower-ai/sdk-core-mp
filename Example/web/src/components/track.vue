<script setup lang="ts">
import { DataTower } from '@datatower-ai/sdk-core-js/web.mjs';
import { ref } from 'vue';

type Properties = Parameters<typeof DataTower.track>[1];
const initial: Properties = {
  track_string: 'string',
  track_boolean: true,
  track_number: 1,
};

const event_name = ref('event_name');
const properties = ref(JSON.stringify(initial, null, 4));

function confirm() {
  try {
    const data = JSON.parse(properties.value);
    DataTower.track(event_name.value, data as Properties);
  } catch {
    window.alert('请输入合法的JSON字符串');
  }
}
</script>

<template>
  <div class="card">
    <input v-model="event_name" />
    <textarea v-model="properties" />
    <button @click="confirm()">track</button>
  </div>
</template>

<style scoped></style>
