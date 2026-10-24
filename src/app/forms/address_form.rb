# 住所フォーム
class AddressForm
  include ActiveModel::Model
  include ActiveModel::Attributes

  # 属性の定義
  attribute :postal_code, :string
  attribute :prefecture, :string
  attribute :city, :string
  attribute :address_line1, :string
  attribute :address_line2, :string
end