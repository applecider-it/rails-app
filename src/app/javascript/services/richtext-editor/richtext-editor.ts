import { createApp } from 'vue';
import TipTap from './vue/TipTap.vue';

/** リッチテキストエディターのセットアップ */
export const setupRichtextEditor = (
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
