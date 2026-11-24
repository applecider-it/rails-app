# frozen_string_literal: true

class PusherChannelServices::ChatChannelService
  # ベースのチャンネルID
  def self.base_channel_id
    "presence-rails-chat-channel"
  end

  # チャンネルID
  def self.channel_id(room)
    "#{base_channel_id}#{WebsocketServices::PusherService.delimiter_string}#{room}"
  end

  # 権限確認
  def check_authenticate(user, room)
    p("PusherChannelServices::ChatChannelService::check_authenticate user", user)
    p("PusherChannelServices::ChatChannelService::check_authenticate room", room)

    # 必要に応じて、ここに、権限関連のロジックを追加

    #false
    true
  end
end
