require "test_helper"

class ChatControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one) # fixturesなどで用意されているユーザー

    sign_in @user
  end

  test "should get index" do
    get chat_index_url
    assert_response :success
  end
end
