require "net/http"
require "json"

# ワードプレスAPIの共通管理
class CmsServices::CmsService
  # APIのベースURL
  def base_url
    Rails.configuration.x.cms_api_base_url
  end

  # 共通のGETリクエスト処理
  def http_get(uri)
    res = Net::HTTP.start(uri.host, uri.port,
                    use_ssl: uri.scheme == "https", # httpsのときだけSSLを有効にする
                    open_timeout: 3,                # 接続できるまでの待ち時間(秒)
                    read_timeout: 5) do |http|      # レスポンスを読み込む待ち時間(秒)
      Rails.logger.info("[WordPress] GET #{uri}")
      http.get(uri.request_uri)
    end

    # 問題のあるステータスの時は、例外を出力
    case res
    when Net::HTTPSuccess
    when Net::HTTPNotFound
    else
      raise "WordPress API error: #{res.code} #{uri}"
    end

    res
  end
end