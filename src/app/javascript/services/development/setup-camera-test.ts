/**
 * カメラテストのセットアップ
 */

import { createApp } from 'vue';
import CameraTest from './vue/CameraTest.vue';

const el = document.getElementById('camera-test');

if (el) {
  const all = JSON.parse(el.dataset.all);

  console.log('vue all', all);

  const app = createApp(CameraTest);
  app.mount(el);
}
