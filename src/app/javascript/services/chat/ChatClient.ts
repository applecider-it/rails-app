import { ChatMessage } from './types';

import consumer from '@/channels/consumer';

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

  constructor(room: string) {
    this.room = room;

    console.log('this.room', this.room);

    // ActionCable 接続
    consumer.subscriptions.create(
      { channel: 'ChatChannel', room: this.room },
      {
        received: (data: JsonMessage) => this.onMessage(data),
      },
    );
  }

  /** ActionCableメッセージ受信 */
  private onMessage(data: JsonMessage) {
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

    const url = '/chat/store';

    const response = await sendApi('POST', url, data);

    console.log('response.data', response.data);
  }
}
