<script setup lang="ts">
/** UI動作確認 */

import { useAppli } from "@/services/appli/vue-hook/useAppli";

const { pwa } = useAppli();
</script>

<template>
  <div>
    <h3 class="app-h3">アプリ動作確認</h3>

    <div class="my-10 p-10 border-4">
      <div v-if="pwa">アプリで起動</div>
      <div v-else>ブラウザで起動</div>
    </div>
  </div>
</template>
