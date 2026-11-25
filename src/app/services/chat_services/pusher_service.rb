# frozen_string_literal: true

# チャットのPusher管理
class ChatServices::PusherService
  # ブロードキャスト
  def broadcast(room, message, user)
    channel_id = PusherChannelServices::ChatChannelService.channel_id(room)
    p("ChatServices::PusherService::broadcast channel_id", channel_id)
    
    Pusher.trigger(
      channel_id,
      'new-message',
      {
        message: message,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      }
    )
  end
end
