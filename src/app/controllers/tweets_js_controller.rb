# JSツイート管理コントローラー
# 
# ドキュメント
# /documents/features/tweet.md
class TweetsJsController < ApplicationController
  before_action :authenticate_user!

  def index
    @user = current_user
    @token = current_user.jwt_token(ChannelServices::TweetChannelService.get_channel)
  end

  # 一覧取得
  def list
    list_service = TweetServices::ListService.new
    @tweets = list_service.get_list 1, ""

    render json: @tweets.as_json(include: :user)
  end

  # 新規作成処理
  def create
    websocket_service = TweetServices::WebsocketService.new

    commit = params[:commit]

    @tweet = UserTweet.new(tweet_params)
    @tweet.user = current_user

    if @tweet.valid?
      # エラーがないとき

      if commit
        # 確定ボタンの時
        
        @tweet.save

        websocket_service.broadcast(@tweet)

        render json: {status: true}
      end
    else
      # エラーがあるとき
      # 全てのボタンで共通
      
      render json: {errors: @tweet.errors}, status: :unprocessable_entity
    end
  end

  # 変更可能な項目だけを絞り込む
  private def tweet_params
    params.expect(tweet: [ :content ])
  end
end
