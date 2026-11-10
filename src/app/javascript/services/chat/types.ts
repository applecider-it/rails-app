/** 表示上のチャットメッセージ */
export type ChatMessage = {
  message: string;
  email: string;
  name: string;
  userId: number | string;
};

/** 送信タイプ */
export type SendType = 'websocket' | 'redis' | 'actioncable' | 'pusher';
