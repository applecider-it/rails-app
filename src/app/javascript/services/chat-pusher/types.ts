/** 表示上のチャットメッセージ */
export type ChatMessage = {
  message: string;
  email: string;
  name: string;
  userId: number | string;
};

export type PusherUserInfo = {
  name: string;
  email: string;
};

export type PusherUser = {
  id: number;
  info: PusherUserInfo;
};
