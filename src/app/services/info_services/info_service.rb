# お知らせ管理
class InfoServices::InfoService
  def initialize
    @infos = load_infos
  end

  # お知らせを返す
  def get_infos
    @infos.map do |info|
      days = Rails.configuration.x.info_new_days
      info.merge(
        description: convert_description(info[:description]),
        is_new: info[:date].to_date > Time.zone.today - days,
      )
    end
    .select { |info| info.fetch(:visible, false) }  # 表示可能なものだけ絞り込む(未指定は非表示扱い)
    .sort_by { |info| info[:date] }.reverse  # 日付でソート
  end

  # 詳細を変換
  private def convert_description(text)
    # {{asset:ファイル名}} を asset_path の結果に置き換える
    text.gsub(/\{\{asset:([^}]+)\}\}/) do
      ActionController::Base.helpers.asset_path(Regexp.last_match(1))
    end
  end

  # YAMLファイルを読み込み、ハッシュの配列で返す
  private def load_infos
    path = Rails.root.join("app", "services", "data", "infos.yml")

    # タグ（!ruby/object:クラス名）を無効化した安全な読み込み
    YAML.safe_load_file(
      path,
      permitted_classes: [Date],  # Date 型として読むために許可
      symbolize_names: true       # キーをシンボル化する
    )
  end
end