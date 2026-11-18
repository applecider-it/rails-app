require "application_system_test_case"

class TweetsTest < ApplicationSystemTestCase
  include Warden::Test::Helpers

  setup do
    @user = users(:one)
    login_as(@user, scope: :user)
  end

  test "visiting the index" do
    visit tweets_url
    assert_selector "h2", text: "ツイート一覧"
  end
end