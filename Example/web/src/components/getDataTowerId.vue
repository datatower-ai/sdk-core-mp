<script setup lang="ts">
import { DataTower } from '@datatower-ai/sdk-core-js/web.mjs';

async function confirm() {
  const id = await DataTower.getDataTowerId();
  window.alert(id);
}
</script>

<template>
  <div class="card">
    <button @click="confirm()">getDataTowerId</button>
  </div>
</template>

<style scoped></style>
