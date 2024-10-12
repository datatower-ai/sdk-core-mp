<script setup lang="ts">
import { DataTower } from '@datatower-ai/sdk-core-js/web.mjs';

function confirm() {
  DataTower.clearStaticCommonProperties();
}
</script>

<template>
  <div class="card">
    <button @click="confirm()">clearStaticCommonProperties</button>
  </div>
</template>

<style scoped></style>
