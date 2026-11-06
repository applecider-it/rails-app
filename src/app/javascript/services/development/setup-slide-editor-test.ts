/**
 * スライドエディターテストのセットアップ
 */

import { createApp } from 'vue';
import SlideEdiotrTest from './vue/SlideEdiotrTest.vue';

const el = document.getElementById('slide-editor-test');

if (el) {
  const all = JSON.parse(el.dataset.all);

  console.log('vue all', all);

  const app = createApp(SlideEdiotrTest);
  app.mount(el);
}
