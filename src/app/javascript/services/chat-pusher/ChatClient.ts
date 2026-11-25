import type { Members, PresenceChannel } from 'pusher-js';

import { showToast } from '@/services/ui/message';
import { pusher, delimiterString } from '@/services/application/pusher';
import { sendApi } from '@/services/api/http';

import { ChatMessage, PusherUserInfo, PusherUser } from './types';

type PusherUserSending = {
  id: string;
  info: PusherUserInfo;
};

/**
 * チャットクライアント
 */
export default class ChatClient {
  private room: string;
  private users: PusherUser[] = [];

  addMessage: (data: ChatMessage) => void;
  setUsers: (users: PusherUser[]) => void;

  constructor(room: string) {
    this.room = room;

    console.log('this.room', this.room);

    const channelBaseId = 'presence-rails-chat-channel';
    const channelId = `${channelBaseId}${delimiterString}${this.room}`;

    // pusher 接続
    const channel = pusher.subscribe(channelId) as PresenceChannel;

    // WebSocketは、ページ遷移しても停止状態で保持されるので、明示的に切断処理をする
    window.addEventListener('pagehide', () => {
      pusher.disconnect();
    });

    channel.bind('new-message', (data: ChatMessage) => this.onMessage(data));

    // 接続時にユーザー一覧取得
    channel.bind('pusher:subscription_succeeded', (members: Members) => {
      const users: PusherUser[] = [];
      members.each((m: PusherUserSending) =>
        users.push(this.conertPusherUser(m)),
      );

      this.setupUsers(users);
    });

    // 他のユーザーの接続情報
    channel.bind('pusher:member_added', (m: PusherUserSending) =>
      this.addUser(this.conertPusherUser(m)),
    );

    // 他のユーザーの離脱情報
    channel.bind('pusher:member_removed', (m: PusherUserSending) =>
      this.removeUser(this.conertPusherUser(m)),
    );
  }

  /** 通信用のPusherユーザー情報を内部処理用に変換 */
  private conertPusherUser(m: PusherUserSending): PusherUser {
    return {
      info: m.info,
      id: Number(m.id),
    };
  }

  /** ユーザー一覧セットアップ */
  private setupUsers(users: PusherUser[]) {
    this.users = users;
    this.refreshUsers();
  }

  /** ユーザー追加（重複防止付き） */
  private addUser(user: PusherUser) {
    const exists = this.users.some((u) => u.id === user.id);

    if (!exists) {
      console.log('push user', user);
      this.users.push(user);

      showToast(`${user.info.name}さんが、入室しました。`);

      this.refreshUsers();
    }
  }

  /** ユーザー削除 */
  private removeUser(user: PusherUser) {
    this.users = this.users.filter((u) => u.id !== user.id);

    showToast(`${user.info.name}さんが、退室しました。`);

    this.refreshUsers();
  }

  /** ユーザー一覧を反映 */
  private refreshUsers() {
    this.setUsers(this.users);
  }

  /** Pusherメッセージ受信 */
  private onMessage(data: ChatMessage) {
    console.log('受信:', data);
    this.addMessage(data);
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

    const url = '/chat_pusher/store';

    const response = await sendApi('POST', url, data);

    console.log('response.data', response.data);
  }
}
