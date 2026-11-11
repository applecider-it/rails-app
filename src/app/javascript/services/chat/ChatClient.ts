import { ChatMessage, SendType } from './types';

import consumer from '@/channels/consumer';
import { pusher } from '@/services/application/pusher';

import axios from 'axios';

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
  private ws: WebSocket;
  private room: string;

  addMessage: Function;

  constructor(host: string, token: string, room: string) {
    this.room = room;

    console.log('this.room', this.room);

    // WebSocket 接続
    this.ws = new WebSocket(`ws://${host}/ws?token=${token}`);
    this.ws.onmessage = (event) => this.onMessage(event);

    // ActionCable 接続
    consumer.subscriptions.create(
      { channel: 'ChatChannel', room: this.room },
      {
        received: (data: JsonMessage) => this.onMessageAC(data),
      },
    );

    // pusher 接続
    const channel = pusher.subscribe(`rails-chat-channel-${this.room}`);

    channel.bind('new-message', (data: JsonMessage) => this.onMessageP(data));
  }

  /** WebSocketメッセージ受信 */
  private onMessage(event: MessageEvent<any>) {
    const result = JSON.parse(event.data);
    console.log('onmessage', result);

    const data = JSON.parse(result.data.json);

    this.addMessage(this.convert(data));
  }

  /** ActionCableメッセージ受信 */
  private onMessageAC(data: JsonMessage) {
    console.log('受信:', data);
    this.addMessage(this.convert(data));
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
  async sendMessage(message: string, type: SendType) {
    console.log('sendMessage', message, type);

    if (type === 'websocket') {
      this.send(message);
    } else {
      await this.sendApi(message, type);
    }
  }

  /** WebSocketメッセージ送信 */
  private async send(message: string) {
    const json = JSON.stringify({ message });
    this.ws.send(JSON.stringify({ json }));
  }

  /** APIでメッセージ送信 */
  private async sendApi(message: string, type: SendType) {
    const data: any = { message, room: this.room };
    console.log(data);

    const url = {
      actioncable: '/chat/store_ac',
      pusher: '/chat/store_p',
      redis: '/chat/store_redis',
    }[type];

    const response = await sendApi('POST', url, data);

    console.log('response.data', response.data);
  }
}
