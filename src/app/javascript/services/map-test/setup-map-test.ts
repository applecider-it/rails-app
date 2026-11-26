/**
 * 地図テストのセットアップ
 */

import { createApp } from 'vue';
import MapArea from './vue/MapArea.vue';

const el = document.getElementById('map-area');

if (el) {
  const all = JSON.parse(el.dataset.all);

  console.log('vue all', all);

  const app = createApp(MapArea);
  app.mount(el);
}
