ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"

module ActiveSupport
  class TestCase
    # Run tests in parallel with specified workers
    parallelize(workers: :number_of_processors)

    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all

    # Add more helper methods to be used by all tests here...

    # Redisを一時的に無効化する
    def with_mock_redis_service
      # ダミー用のRedisオブジェクト
      dummy_redis = Object.new
      dummy_redis.define_singleton_method(:publish) do |*args|
        Rails.logger.info("publish dummy: " + args.to_json)
      end

      # オリジナルのメソッドの中身を保存
      original_method = DataServices::RedisService.method(:get_redis)

      # クラス関数( DataServices::RedisService.get_redis() )入れ替え
      DataServices::RedisService.define_singleton_method(:get_redis) do
        dummy_redis
      end

      # ブロック実行
      yield
    ensure
      # オリジナルのメソッドを戻す
      DataServices::RedisService.define_singleton_method(:get_redis, original_method) if original_method
    end
  end
end

class ActionDispatch::IntegrationTest
  # Devise 用のログイン・ログアウト用ヘルパーメソッドを使えるようにする
  include Devise::Test::IntegrationHelpers
end
