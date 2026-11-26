/**
 * 地図テストのセットアップ
 */

import { createApp } from 'vue';
import MapTest from './vue/MapTest.vue';

const el = document.getElementById('map-test');

if (el) {
  const all = JSON.parse(el.dataset.all);

  console.log('vue all', all);

  const app = createApp(MapTest);
  app.mount(el);
}
