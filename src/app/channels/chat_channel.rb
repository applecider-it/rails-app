# チャットチャンネル
class ChatChannel < ApplicationCable::Channel
  # ActionCable のストリーム名（部屋ごとに分ける）
  private def stream_name = "chat_channel.#{@room}"

  # Redis 上の在室情報のキー。
  # ハッシュ形式で { user_id => 接続数 } を保持する
  private def presence_key = "presence:#{stream_name}"

  # クライアントがチャンネルを購読したときに呼ばれる
  def subscribed
    # 接続時に渡された部屋名（例: consumer.subscriptions.create({ channel: "ChatChannel", room: "abc" })）
    @room = params[:room]

    # この部屋のブロードキャストを受信できるようにする
    stream_from stream_name

    # 同じユーザーの接続数を +1 する（複数タブ・複数端末対策）
    # 戻り値は加算後の接続数
    count = redis.hincrby(presence_key, current_user.id, 1)

    # 1本目の接続のときだけ「入室」を全員に通知する
    # （2本目以降のタブでは通知しない）
    broadcast_presence("subscribed") if count == 1

    # 入室した本人にだけ、現在の在室ユーザー一覧を送る
    # transmit は broadcast と違い、このコネクションにだけ届く
    transmit({ type: "users", data: online_users })
  end

  # クライアントが購読解除・切断したときに呼ばれる
  def unsubscribed
    # subscribed が途中で失敗した場合などに @room が空のことがあるので防御
    return unless @room

    # 接続数を -1 する
    count = redis.hincrby(presence_key, current_user.id, -1)

    # 最後の接続が閉じたときだけ、在室情報から削除して「退室」を通知する
    if count <= 0
      redis.hdel(presence_key, current_user.id)
      broadcast_presence("unsubscribed")
    end
  end

  # Redis クライアント（インスタンスごとに使い回す）
  private def redis
    @redis ||= DataServices::RedisService.get_redis
  end

  # 現在の在室ユーザー一覧を返す
  private def online_users
    # ハッシュのキー（= user_id）だけ取り出す
    ids = redis.hkeys(presence_key)
    User.where(id: ids).map { |u| user_payload(u) }
  end

  # 入退室イベントを部屋の全員に配信する
  # type: "subscribed" または "unsubscribed"
  private def broadcast_presence(type)
    ActionCable.server.broadcast(
      stream_name,
      {
        type: type,
        data: user_payload(current_user),
      }
    )
  end

  # クライアントに渡すユーザー情報
  private def user_payload(user)
    {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  end
end