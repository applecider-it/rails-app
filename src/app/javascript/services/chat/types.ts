/** チャットメッセージ */
export type ChatMessage = {
  message: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
};
