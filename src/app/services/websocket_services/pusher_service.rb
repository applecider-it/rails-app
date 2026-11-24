# frozen_string_literal: true

# Pusher管理
class WebsocketServices::PusherService
  # チャンネル購読の認証
  # 許可しない場合は nil を返す
  def authenticate(channel_name, socket_id, user)
    p("PusherService::authenticate channel_name", channel_name)
    p("PusherService::authenticate socket_id", socket_id)

    Pusher.authenticate(
      channel_name,
      socket_id,
      user_id: user.id.to_s, # 文字列で渡す
      user_info: { name: user.name, email: user.email }
    )
  end
end
