require "application_system_test_case"

class TweetsTest < ApplicationSystemTestCase
  setup do
    @user = users(:one)
  end

  test "visiting the index" do
    # ログイン画面へ移動
    visit new_user_session_path

    # フォームにメールアドレスとパスワードを入力
    fill_in "メールアドレス", with: @user.email
    fill_in "パスワード", with: "password"

    # ログインボタンをクリック
    click_button "Log in"

    # ログイン後のページでテストを続ける
    visit tweets_url
    assert_selector "h2", text: "ツイート一覧"
  end
end
