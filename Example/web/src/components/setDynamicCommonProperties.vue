<script setup lang="ts">
import { DataTower } from '@datatower-ai/sdk-core-js/web.mjs';
import { ref } from 'vue';

type Properties = ReturnType<Parameters<typeof DataTower.setDynamicCommonProperties>[0]>;
const initial: Properties = {
  setDynamicCommonProperties_string: 'string',
  setDynamicCommonProperties_boolean: true,
  setDynamicCommonProperties_number: 1,
};

const properties = ref(JSON.stringify(initial, null, 4));

function confirm() {
  DataTower.setDynamicCommonProperties(() => {
    try {
      return JSON.parse(properties.value);
    } catch {
      window.alert('请输入合法的JSON字符串');
    }
  });
}
</script>

<template>
  <div class="card">
    <textarea v-model="properties" />
    <button @click="confirm()">setDynamicCommonProperties</button>
  </div>
</template>

<style scoped></style>
