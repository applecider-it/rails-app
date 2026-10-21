# チャットのRedis管理
class ChatServices::RedisService
  # ブロードキャスト
  def broadcast(room, message, user)
    system_service = WebsocketServices::SystemService.new

    system_service.send_to_redis(
      ChannelServices::ChatChannelService.get_channel(room),
      {
        message: message,
        user_id: user.id,
        email: user.email,
      }
    )
  end
end
