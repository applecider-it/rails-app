import { sendApi } from '@/services/api/http';

/**
 * ツイートクライアント
 */
export default class TweetClient {
  /** 一覧を最新の状態にする */
  public refreshList: Function;

  /**
   * 新しいツイート送信
   */
  async sendTweet(content) {
    const data: any = { content };

    const response = await sendApi('POST', '/tweets_js', data);
    console.log('response.data', response.data);
    return response.data;
  }

  /** 一覧取得 */
  async getList() {
    const response = await sendApi('GET', '/tweets_js/list');

    return response.data;
  }
}
