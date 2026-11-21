require "test_helper"

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :selenium, using: :headless_chrome, screen_size: [ 1400, 1400 ]

  # Devise 用のログイン・ログアウト用ヘルパーメソッドを使えるようにする
  include Warden::Test::Helpers
end
