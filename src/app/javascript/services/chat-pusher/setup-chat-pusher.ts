/**
 * チャット画面のセットアップ
 */

import { createApp } from 'vue';

import ChatClient from './ChatClient';
import ChatArea from './vue/ChatArea.vue';

type Props = {
  host: string;
  /** JWTトークン */
  token: string;
  room: string;
};

const el = document.getElementById('chat-root');

if (el) {
  const all = JSON.parse(el.dataset.all) as Props;

  console.log(all);

  const chatClient = new ChatClient(all.host, all.token, all.room);

  createApp(ChatArea, {
    chatClient: chatClient,
  }).mount(el);
}
