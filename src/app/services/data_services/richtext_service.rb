# リッチテキスト管理
class DataServices::RichtextService
  # 表示用にサニタイズしたHTMLを返す
  def self.sanitize_richtext(val)
    allowed_tags = (
      ActionView::Base.sanitized_allowed_tags.to_a +
      %w[figure figcaption iframe]
    )

    allowed_attributes = (
      ActionView::Base.sanitized_allowed_attributes.to_a +
      %w[style srcset sizes loading decoding width height]
    )

    ActionController::Base.helpers.sanitize(
      val,
      tags: allowed_tags,
      attributes: allowed_attributes
    )
  end
end
