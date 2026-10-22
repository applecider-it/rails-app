require "net/http"
require "json"

# ワードプレスAPIの投稿管理
class CmsServices::PostService
  BASE_URL = ENV.fetch("APP_WORDPRESS_URL", "http://localhost:8080")

  # 投稿一覧取得
  def posts(per_page, page)
    uri = URI("#{BASE_URL}/wp-json/wp/v2/posts")

    uri.query = URI.encode_www_form(
      per_page: per_page,
      page: page,
      _fields: "id,date,title,excerpt"
    )

    res = httpGet(uri)
    posts = JSON.parse(res.body)

    Rails.logger.debug { "[WordPress] posts:\n#{JSON.pretty_generate(posts)}" }

    {
      posts: posts,
      total: res["X-WP-Total"].to_i,
      total_pages: res["X-WP-TotalPages"].to_i
    }
  end

  # 投稿1件取得(存在しないIDのときは nil を返す)
  def post(id)
    # 記事IDをパスに付けると1件だけ取得できる
    uri = URI("#{BASE_URL}/wp-json/wp/v2/posts/#{Integer(id)}")

    # 詳細表示に必要な項目だけを指定する(本文 content を含める)
    uri.query = URI.encode_www_form(
      _fields: "id,date,title,content"
    )

    res = httpGet(uri)
    post = JSON.parse(res.body)

    Rails.logger.debug { "[WordPress] post:\n#{JSON.pretty_generate(post)}" }

    case res
    when Net::HTTPNotFound
      Rails.logger.info("[WordPress] post not found: id=#{id}")
      return nil
    end

    post
  end

  # 共通のGETリクエスト処理
  private def httpGet(uri)
    res = Net::HTTP.start(uri.host, uri.port,
                    use_ssl: uri.scheme == "https",
                    open_timeout: 3,
                    read_timeout: 5) do |http|
      Rails.logger.info("[WordPress] GET #{uri}")
      http.get(uri.request_uri)
    end

    case res
    when Net::HTTPSuccess
    when Net::HTTPNotFound
    else
      raise "WordPress API error: #{res.code} #{uri}"
    end

    res
  end
end