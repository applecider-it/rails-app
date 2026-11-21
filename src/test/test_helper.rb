ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"

module ActiveSupport
  class TestCase
    # Run tests in parallel with specified workers
    parallelize(workers: :number_of_processors)

    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all

    # すべてのテストの前に実行する
    setup :setup_mock_redis_service

    # Add more helper methods to be used by all tests here...

    # Redisを無効化する
    def setup_mock_redis_service
      # ダミー用のRedisオブジェクト
      dummy_redis = Object.new
      dummy_redis.define_singleton_method(:publish) do |*args|
        Rails.logger.info("publish dummy: " + args.to_json)
      end

      # クラス関数( DataServices::RedisService.get_redis() )入れ替え
      DataServices::RedisService.define_singleton_method(:get_redis) do
        dummy_redis
      end
    end
  end
end

class ActionDispatch::IntegrationTest
  # Devise 用のログイン・ログアウト用ヘルパーメソッドを使えるようにする
  include Devise::Test::IntegrationHelpers
end
