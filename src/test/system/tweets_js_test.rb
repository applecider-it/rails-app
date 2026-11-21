require "application_system_test_case"

class TweetsJsTest < ApplicationSystemTestCase
  setup do
    @user = users(:one)
    login_as(@user, scope: :user)
  end

  test "visiting the index" do
    visit tweets_js_url
    assert_selector "h2", text: "ツイート"
  end

  test "should create user tweet" do
    visit tweets_js_url

    fill_in "content", with: "ツイートテスト"

    #take_screenshot
    
    assert_difference -> { UserTweet.count }, 1 do
      click_on "確認"

      assert_text "ツイートしました"
    end
  end
end