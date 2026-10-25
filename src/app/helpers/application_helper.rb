module ApplicationHelper
  # 項目エラー表示
  def field_error(form, field)
    return unless form.object.errors[field].any?

    content_tag(:div, form.object.errors[field].first, class: "text-red-600")
  end

  # リッチテキスト表示
  def output_richtext(val)
    sanitize(
      val,
      tags: DataServices::RichtextService::allowed_tags,
      attributes: DataServices::RichtextService::allowed_attributes
    )
  end
end
