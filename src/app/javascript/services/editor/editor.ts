import { createApp } from 'vue';
import TipTap from './vue/TipTap.vue';

type Props = {
  val: string;
};

/** エディターのセットアップ */
export const setupEditor = (el, callback) => {
  const all = JSON.parse(el.dataset.all) as Props;
  console.log(all);

  const app = createApp(TipTap, {
    initialValue: all.val,
    callback: (val) => {
      callback(val);
    },
  });
  app.mount(el);
};
