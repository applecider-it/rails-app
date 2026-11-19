# frozen_string_literal: true

# 管理者モデル
# 
# ドキュメント
# /documents/models/admin_user.md
class AdminUser < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, 
         :rememberable, :validatable

  # JSONで出力可能な項目
  def self.public_json_attributes
    %i[id email]
  end
end
