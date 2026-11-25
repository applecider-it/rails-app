/** 表示上のチャットメッセージ */
export type ChatMessage = {
  message: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
};

export type PusherUserInfo = {
  name: string;
  email: string;
};

export type PusherUser = {
  id: number;
  info: PusherUserInfo;
};
