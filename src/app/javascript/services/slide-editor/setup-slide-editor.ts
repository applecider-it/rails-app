/**
 * スライドエディターのセットアップ
 */

import { createApp } from 'vue';
import SlideEditor from './vue/SlideEditor.vue';

const el = document.getElementById('slide-editor');

if (el) {
  const all = JSON.parse(el.dataset.all);

  console.log('vue all', all);

  const app = createApp(SlideEditor);
  app.mount(el);
}
