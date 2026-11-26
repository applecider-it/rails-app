/**
 * メディア動作確認のセットアップ
 */

import { createApp } from 'vue';
import MediaArea from './vue/MediaArea.vue';

const el = document.getElementById('media-area');

if (el) {
  const all = JSON.parse(el.dataset.all);

  console.log('vue all', all);

  const app = createApp(MediaArea);
  app.mount(el);
}
