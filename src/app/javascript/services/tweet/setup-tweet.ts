/**
 * ツイート画面のセットアップ
 */

import { createApp } from 'vue';
import TweetArea from './vue/TweetArea.vue';

import TweetClient from './TweetClient';

type Props = {};

const el = document.getElementById('tweet-root');

if (el) {
  const all = JSON.parse(el.dataset.all) as Props;

  console.log(all);

  const tweetClient = new TweetClient();

  createApp(TweetArea, {
    tweetClient: tweetClient,
  }).mount(el);
}
