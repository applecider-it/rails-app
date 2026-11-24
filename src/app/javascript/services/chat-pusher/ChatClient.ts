import type { Members, PresenceChannel } from 'pusher-js';

import { ChatMessage } from './types';

import consumer from '@/channels/consumer';
import { pusher } from '@/services/application/pusher';

import { sendApi } from '@/services/api/http';

/** WebSocketサーバーから送信されるメッセージJSONの型 */
type JsonMessage = {
  message: string;
  user_id: string;
  email: string;
  name: string;
};

/**
 * チャットクライアント
 */
export default class ChatClient {
  private room: string;

  addMessage: Function;

  constructor(host: string, token: string, room: string) {
    this.room = room;

    console.log('this.room', this.room);

    // pusher 接続
    const channel = pusher.subscribe(
      `presence-rails-chat-channel-${this.room}`,
    );

    // WebSocketは、ページ遷移しても停止状態で保持されるので、明示的に切断処理をする
    window.addEventListener('pagehide', () => {
      pusher.disconnect();
    });

    channel.bind('new-message', (data: JsonMessage) => this.onMessageP(data));
    channel.bind('pusher:subscription_succeeded', (members: Members) => {
      const users: any[] = [];
      members.each((m: { id: string; info: any }) => users.push(m.info));
      this.setupUsers(users);
    });
    channel.bind('pusher:member_added', (m: { id: string; info: any }) =>
      this.addUser(m.info),
    );
    channel.bind('pusher:member_removed', (m: { id: string; info: any }) =>
      this.removeUser(m.info),
    );
  }

  private setupUsers(users) {
    console.log(users);
  }
  private addUser(info) {
    console.log(info);
  }
  private removeUser(info) {
    console.log(info);
  }

  /** Pusherメッセージ受信 */
  private onMessageP(data: JsonMessage) {
    console.log('受信:', data);
    this.addMessage(this.convert(data));
  }

  /** メッセージ変換 */
  private convert(data: JsonMessage): ChatMessage {
    return {
      message: data.message,
      userId: data.user_id,
      email: data.email,
      name: data.name,
    };
  }

  /** メッセージ送信 */
  async sendMessage(message: string) {
    console.log('sendMessage', message);

      await this.sendApi(message);
  }

  /** APIでメッセージ送信 */
  private async sendApi(message: string) {
    const data: any = { message, room: this.room };
    console.log(data);

    const url = '/chat_pusher/store_p';

    const response = await sendApi('POST', url, data);

    console.log('response.data', response.data);
  }
}
