/**
 * ルーターテストのセットアップ
 */

import { createApp } from 'vue';
import RouterArea from './vue/RouterArea.vue';

const el = document.getElementById('router-test');

if (el) {
  const all = JSON.parse(el.dataset.all);

  console.log('vue all', all);

  const app = createApp(RouterArea, {
    name: all.name,
  });
  app.mount(el);
}
