/**
 * メディア動作確認のセットアップ
 */

import { createApp } from 'vue';
import MediaTest from './vue/MediaTest.vue';

const el = document.getElementById('media-test');

if (el) {
  const all = JSON.parse(el.dataset.all);

  console.log('vue all', all);

  const app = createApp(MediaTest);
  app.mount(el);
}
