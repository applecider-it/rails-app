require "test_helper"

class TweetsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    sign_in @user
  end

  test "should get index" do
    get tweets_url
    assert_response :success
  end

  test "should get new" do
    get new_tweet_url
    assert_response :success
  end

  test "should create tweet" do
    assert_difference("UserTweet.count", 1) do
      post tweets_url, params: { tweet: { content: 'テストツイート' }, commit: "on" }
    end

    assert_redirected_to tweets_url
  end
end