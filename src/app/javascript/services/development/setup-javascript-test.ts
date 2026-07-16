/**
 * Javascriptテストのセットアップ
 */

import { createApp } from 'vue';
import TestAreaVue from './vue/TestAreaVue.vue';

let el: any;

el = document.getElementById('vue-test-root');

if (el) {
  const all = JSON.parse(el.dataset.all);

  console.log('vue all', all);

  const app = createApp(TestAreaVue, {
    formData: all.formData,
  });
  app.mount(el);
}
