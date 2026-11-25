import consumer from '@/channels/consumer';
import { showToast } from '@/services/ui/message';

import { sendApi } from '@/services/api/http';
import { getCurrentUser } from '@/services/application/application';
import { User } from '@/services/application/types';

import { ChatMessage, ChatUser } from './types';

/**
 * チャットクライアント
 */
export default class ChatClient {
  private room: string;
  private user: User;
  private users: ChatUser[] = [];

  addMessage: (data: ChatMessage) => void;
  setUsers: (users: ChatUser[]) => void;

  constructor(room: string) {
    this.room = room;
    this.user = getCurrentUser();

    console.log('this.room', this.room);

    // ActionCable 接続
    consumer.subscriptions.create(
      { channel: 'ChatChannel', room: this.room },
      {
        received: (data: any) => this.onMessage(data),
      },
    );

    // WebSocketは、ページ遷移しても停止状態で保持されるので、明示的に切断処理をする
    window.addEventListener('pagehide', () => {
      consumer.disconnect();
    });
  }

  /** ActionCableメッセージ受信 */
  private onMessage(data: any) {
    console.log('受信:', data);
    if (data.type === 'message') {
      this.addMessage(data.data as ChatMessage);
    } else if (data.type === 'subscribed') {
      if (data.data.id !== this.user.id) {
        this.addUser(data.data);
      }
    } else if (data.type === 'unsubscribed') {
      if (data.data.id !== this.user.id) {
        this.removeUser(data.data);
      }
    } else if (data.type === 'users') {
      this.setupUsers(data.data);
    }
  }

  /** ユーザー一覧セットアップ */
  private setupUsers(users: ChatUser[]) {
    this.users = users;
    this.refreshUsers();
  }

  /** ユーザー追加（重複防止付き） */
  private addUser(user: ChatUser) {
    const exists = this.users.some((u) => u.id === user.id);

    if (!exists) {
      console.log('push user', user);
      this.users.push(user);

      showToast(`${user.name}さんが、入室しました。`);

      this.refreshUsers();
    }
  }

  /** ユーザー削除 */
  private removeUser(user: ChatUser) {
    this.users = this.users.filter((u) => u.id !== user.id);

    showToast(`${user.name}さんが、退室しました。`);

    this.refreshUsers();
  }

  /** ユーザー一覧を反映 */
  private refreshUsers() {
    this.setUsers(this.users);
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

    const url = '/chat/store';

    const response = await sendApi('POST', url, data);

    console.log('response.data', response.data);
  }
}
