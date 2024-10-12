<script setup lang="ts">
import { DataTower } from '@datatower-ai/sdk-core-js/web.mjs';
import { ref } from 'vue';

const account_id = ref('account_id');

function confirm() {
  DataTower.setAccountId(account_id.value);
}
</script>

<template>
  <div class="card">
    <input v-model="account_id" />
    <button @click="confirm()">setAccountId</button>
  </div>
</template>

<style scoped></style>
