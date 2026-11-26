<script setup lang="ts">
/** respond_to動作確認 */

import { sendApi } from '@/services/api/http';

const csrfToken = document
  .querySelector('meta[name="csrf-token"]')
  ?.getAttribute('content');

const jsonTest = async () => {
  const data: any = {};

  const response = await sendApi('POST', '/development/respond_to_test', data);
  console.log('response.data', response.data);
};
</script>

<template>
  <div class="app-form">
    <h3 class="app-h3">respond_to動作確認</h3>

    <div class="mt-5">
      <form method="POST" action="/development/respond_to_test">
        <input type="hidden" name="authenticity_token" :value="csrfToken" />
        <button type="submit" class="app-btn-primary">HTML</button>
      </form>
    </div>

    <div class="mt-5">
      <button @click="jsonTest" class="app-btn-primary">Json</button>
    </div>
  </div>
</template>
