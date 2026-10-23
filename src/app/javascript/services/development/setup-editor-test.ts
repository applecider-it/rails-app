/**
 * エディターテストのセットアップ
 */

import { createApp } from 'vue';
import TipTap from '@/services/editor/vue/TipTap.vue';

const el = document.getElementById('editor-test');

if (el) {
  const all = JSON.parse(el.dataset.all);

  console.log('vue all', all);

  document.getElementById('trace').innerHTML = all.val;

  const app = createApp(TipTap, {
    initialValue: all.val,
    callback: (val) => {
      console.log('結果', val);
      document.getElementById('trace').innerHTML = val;
    },
  });
  app.mount(el);
}
