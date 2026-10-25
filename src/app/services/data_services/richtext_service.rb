# リッチテキスト管理
class DataServices::RichtextService
  # HTML上に表示するのを許可しているタグ
  def self.allowed_tags
    (
      ActionView::Base.sanitized_allowed_tags.to_a +
      %w[figure figcaption iframe]
    )
  end

  # HTML上に表示するのを許可しているアトリビュート
  def self.allowed_attributes
    (
      ActionView::Base.sanitized_allowed_attributes.to_a +
      %w[style srcset sizes loading decoding width height]
    )
  end
end
