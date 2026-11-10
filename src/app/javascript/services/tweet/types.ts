export type User = {
  id: number;
  email: string;
  name: string;
};

type Tweet = {
  id: number;
  content: string;
  created_at: string;
  user: User;
};

export type TweetContainer = {
  tweet: Tweet;
};
