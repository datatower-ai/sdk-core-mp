<script setup lang="ts">
import { DataTower } from '@datatower-ai/sdk-core-js/web.mjs';

function confirm() {
  DataTower.enableUpload();
}
</script>

<template>
  <div class="card">
    <button @click="confirm()">enableUpload</button>
  </div>
</template>

<style scoped></style>
