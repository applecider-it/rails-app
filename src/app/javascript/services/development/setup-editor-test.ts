/**
 * エディターテストのセットアップ
 */

import { createApp } from 'vue';
import QuillEditor from '@/services/editor/vue/QuillEditor.vue';

const el = document.getElementById('editor-test');

if (el) {
  const all = JSON.parse(el.dataset.all);

  console.log('vue all', all);

  const app = createApp(QuillEditor, {
    initialValue: all.val,
    callback: (val) => {
      console.log('結果', val);
      document.getElementById('trace').innerHTML = val;
    },
  });
  app.mount(el);
}
