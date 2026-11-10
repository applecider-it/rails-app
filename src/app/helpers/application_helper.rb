module ApplicationHelper
  # 項目エラー表示
  def app_field_error(form, field)
    return unless form.object.errors[field].any?

    content_tag(:div, form.object.errors[field].first, class: "text-red-600")
  end

  # リッチテキスト表示
  def app_output_richtext(val)
    DataServices::RichtextService.sanitize_richtext(val)
  end
end
