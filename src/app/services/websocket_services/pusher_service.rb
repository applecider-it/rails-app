# frozen_string_literal: true

# Pusher管理
class WebsocketServices::PusherService
  # 区切り文字列
  def self.delimiter_string = "---"

  # チャンネル購読の認証
  # 許可しない場合は nil を返す
  def authenticate(channel_name, socket_id, user)
    arr = channel_name.split(self.class.delimiter_string)
    channel = arr[0]
    channel_detail = arr[1]
    p("PusherService::authenticate channel_name", channel_name)
    p("PusherService::authenticate socket_id", socket_id)

    return nil unless check_authenticate(user, channel, channel_detail)

    Pusher.authenticate(
      channel_name,
      socket_id,
      user_id: user.id.to_s, # 文字列で渡す
      user_info: { name: user.name, email: user.email }
    )
  end

  # 権限確認
  private def check_authenticate(user, channel, channel_detail)
    p("PusherService::check_authenticate user", user)
    p("PusherService::check_authenticate channel", channel)
    p("PusherService::check_authenticate channel_detail", channel_detail)

    if PusherChannelServices::ChatChannelService.base_channel_id == channel
      # チャットの場合

      pusher_service = PusherChannelServices::ChatChannelService.new
      return pusher_service.check_authenticate(user, channel_detail)
    end

    false
  end
end
