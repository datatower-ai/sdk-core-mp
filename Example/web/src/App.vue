<script setup lang="ts">
import { ref } from 'vue';
import ClearDynamicCommonProperties from './components/clearDynamicCommonProperties.vue';
import ClearStaticCommonProperties from './components/clearStaticCommonProperties.vue';
import EnableUpload from './components/enableUpload.vue';
import GetDataTowerId from './components/getDataTowerId.vue';
import InitSDK from './components/initSDK.vue';
import SetAccountId from './components/setAccountId.vue';
import SetDynamicCommonProperties from './components/setDynamicCommonProperties.vue';
import SetStaticCommonProperties from './components/setStaticCommonProperties.vue';
import Track from './components/track.vue';
import UserAdd from './components/userAdd.vue';
import UserAppend from './components/userAppend.vue';
import UserDelete from './components/userDelete.vue';
import UserSet from './components/userSet.vue';
import UserSetOnce from './components/userSetOnce.vue';
import UserUniqAppend from './components/userUniqAppend.vue';
import UserUnset from './components/userUnset.vue';

const initialed = ref(false);
</script>

<template>
  <template v-if="!initialed">
    <InitSDK @initialize="initialed = true" />
  </template>
  <template v-else>
    <SetAccountId />
    <GetDataTowerId />

    <Track />
    <SetStaticCommonProperties />
    <ClearStaticCommonProperties />
    <SetDynamicCommonProperties />
    <ClearDynamicCommonProperties />

    <UserSetOnce />
    <UserSet />
    <UserUnset />
    <UserAdd />
    <UserDelete />
    <UserAppend />
    <UserUniqAppend />

    <EnableUpload />
  </template>
</template>

<style scoped></style>
