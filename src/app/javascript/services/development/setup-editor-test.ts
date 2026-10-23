/**
 * エディターテストのセットアップ
 */

import { createApp } from 'vue';
import EditorTest from './vue/EditorTest.vue';

const el = document.getElementById('editor-test');

if (el) {
  const all = JSON.parse(el.dataset.all);

  console.log('vue all', all);

  const app = createApp(EditorTest);
  app.mount(el);
}
