/** チャットユーザー */
export type ChatUser = {
  id: number;
  email: string;
  name: string;
};

/** チャットメッセージ */
export type ChatMessage = {
  message: string;
  user: ChatUser;
};
