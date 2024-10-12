<script setup lang="ts">
import { DataTower } from '@datatower-ai/sdk-core-js/web.mjs';

function confirm() {
  DataTower.clearDynamicCommonProperties();
}
</script>

<template>
  <div class="card">
    <button @click="confirm()">clearDynamicCommonProperties</button>
  </div>
</template>

<style scoped></style>
