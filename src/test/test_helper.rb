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
    def mock_redis_service
      dummy_redis = Object.new
      dummy_redis.define_singleton_method(:publish) { |*args| Rails.logger.info("publish dummy: " + args.to_json) }

      # get_redis が呼ばれたらダミーを返すように特異クラスのメソッドを一時差し替え
      DataServices::RedisService.singleton_class.send(:define_method, :get_redis) do
        dummy_redis
      end
    end
  end
end

class ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers
end
