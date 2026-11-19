# frozen_string_literal: true

# ユーザーツイートモデル
# 
# ドキュメント
# /documents/models/user_tweet.md
class UserTweet < ApplicationRecord
  include Discard::Model

  belongs_to :user

  validates :content, presence: true

  # キーワード検索用スコープ
  scope :search_by_keyword, ->(keyword) {
    return all if keyword.blank?
    where("content LIKE ?", "%#{sanitize_sql_like(keyword)}%")
  }

  # JSONで出力可能な項目
  def self.public_json_attributes
    %i[id content created_at]
  end
end
