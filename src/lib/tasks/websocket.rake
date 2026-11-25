require "open3"

namespace :mytask do
  namespace :websocket do
    desc "接続中に、サーバーを再起動すると、ユーザー情報が残るため削除する"
    task clear_chat_channel_redis: :environment do
      redis = DataServices::RedisService.get_redis

      pattern = "presence:chat_channel.*"

      keys = []
      redis.scan_each(match: pattern) do |key|
        keys << key
      end

      deleted_count = 0
      # 大量キーでもコマンドが肥大化しないよう 500 件ずつ削除
      keys.each_slice(500) do |batch|
        deleted_count += redis.del(*batch)
      end

      puts "Deleted #{deleted_count} key(s) matching #{pattern}."
    end
  end
end