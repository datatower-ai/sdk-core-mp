<script setup lang="ts">
import { DataTower } from '@datatower-ai/sdk-core-js/web.mjs';

function confirm() {
  DataTower.userDelete();
}
</script>

<template>
  <div class="card">
    <button @click="confirm()">userDelete</button>
  </div>
</template>

<style scoped></style>
