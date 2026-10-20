require "net/http"
require "json"

# ワードプレスAPIの投稿管理
class CmsServices::PostService
  BASE_URL = ENV.fetch("APP_WORDPRESS_URL", "http://localhost:8080")

  # 投稿一覧取得
  def posts(per_page, page)
    # 記事一覧のエンドポイントのURLを組み立てる
    uri = URI("#{BASE_URL}/wp-json/wp/v2/posts")

    # クエリパラメータ(?per_page=10&page=1... の部分)を作ってURLに付ける
    uri.query = URI.encode_www_form(
      per_page: per_page,                # 1ページあたりの件数
      page: page,                        # 取得するページ番号
      _fields: "id,date,title,content"   # 返してほしい項目だけを指定(レスポンスを軽くする)
    )

    # HTTPでGETリクエストを送る
    res = Net::HTTP.start(uri.host, uri.port,
                          use_ssl: uri.scheme == "https",  # httpsのときだけSSLを有効にする
                          open_timeout: 3,                 # 接続できるまでの待ち時間(秒)
                          read_timeout: 5) do |http|       # レスポンスを読み込む待ち時間(秒)
      Rails.logger.info("[WordPress] URL: " + uri.request_uri)
      http.get(uri.request_uri)
    end

    # レスポンス本文(JSON文字列)をRubyの配列に変換
    posts = JSON.parse(res.body)

    Rails.logger.debug { "[WordPress] posts:\n#{JSON.pretty_generate(posts)}" }

    {
      posts: posts,
      total: res["X-WP-Total"].to_i,            # 記事の総件数(レスポンスヘッダーから取得)
      total_pages: res["X-WP-TotalPages"].to_i  # 総ページ数(同じくヘッダーから取得)
    }
  end
end