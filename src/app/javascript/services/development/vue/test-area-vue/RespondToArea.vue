<script setup lang="ts">
/** respond_to動作確認 */

import axios from 'axios';

import { jsonRequestHeaders } from '@/services/api/http';

const csrfToken = document
  .querySelector('meta[name="csrf-token"]')
  ?.getAttribute('content');

const jsonTest = async () => {
  const headers = jsonRequestHeaders();

  const data: any = {};

  const response = await axios.post('/development/respond_to_test', data, {
    headers: headers,
  });
  console.log('response.data', response.data);
};
</script>

<template>
  <div class="app-form">
    respond_to動作確認

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
