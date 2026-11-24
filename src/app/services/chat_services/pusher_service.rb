# frozen_string_literal: true

# チャットのPusher管理
class ChatServices::PusherService
  # ベースのチャンネルID
  def self.base_channel_id
    "presence-rails-chat-channel"
  end

  # ブロードキャスト
  def broadcast(room, message, user)
    channel_id = "#{self.class.base_channel_id}#{WebsocketServices::PusherService.delimiter_string}#{room}"
    p("ChatServices::PusherService::broadcast channel_id", channel_id)
    
    Pusher.trigger(
      channel_id,
      'new-message',
      {
        message: message,
        user_id: user.id,
        email: user.email,
        name: user.name,
      }
    )
  end

  # 権限確認
  def check_authenticate(user, room)
    p("ChatServices::PusherService::check_authenticate user", user)
    p("ChatServices::PusherService::check_authenticate room", room)

    # 必要に応じて、ここに、権限関連のロジックを追加

    #false
    true
  end
end
