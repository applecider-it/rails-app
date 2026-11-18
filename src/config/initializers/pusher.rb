require 'pusher'

# テスト環境ではPusherを使わない（初期化をスキップする）場合
return if Rails.env.test?

Pusher.url = ENV['PUSHER_URL']

#p("Pusher.url", Pusher.url)
