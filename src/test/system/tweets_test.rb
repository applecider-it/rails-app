require "application_system_test_case"

class TweetsTest < ApplicationSystemTestCase
  setup do
    @user = users(:one)
    login_as(@user, scope: :user)
  end

  test "visiting the index" do
    visit tweets_url
    assert_selector "h2", text: "ツイート一覧"
  end

  test "should create user tweet" do
    visit tweets_url
    click_on "新規作成"

    fill_in "投稿内容", with: "ツイートテスト"
    click_on "確認"

    assert_difference -> { UserTweet.count }, 1 do
      click_on "登録する"

      assert_text "作成しました。"
    end
  end
end