import { createApp } from 'vue';
import TipTap from './vue/TipTap.vue';

/** エディターのセットアップ */
export const setupEditor = (
  el: HTMLElement,
  val: string,
  callback: (val: string) => void,
) => {
  const app = createApp(TipTap, {
    initialValue: val,
    callback: (val) => {
      callback(val);
    },
  });
  app.mount(el);
};
