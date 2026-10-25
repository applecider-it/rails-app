require "net/http"
require "json"

# ワードプレスAPIの投稿管理
class CmsServices::PostService
  def initialize
    @cms_service = CmsServices::CmsService.new
  end

  # 投稿一覧取得
  def posts(per_page, page)
    uri = URI("#{@cms_service.base_url}/wp-json/wp/v2/posts")

    uri.query = URI.encode_www_form(
      per_page: per_page,
      page: page,
      _fields: "id,date,title,excerpt"
    )

    res = @cms_service.http_get(uri)
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
    uri = URI("#{@cms_service.base_url}/wp-json/wp/v2/posts/#{Integer(id)}")

    # 詳細表示に必要な項目だけを指定する(本文 content を含める)
    uri.query = URI.encode_www_form(
      _fields: "id,date,title,content"
    )

    res = @cms_service.http_get(uri)
    post = JSON.parse(res.body)

    Rails.logger.debug { "[WordPress] post:\n#{JSON.pretty_generate(post)}" }

    # レコードが見つからないときはnil
    if res.is_a?(Net::HTTPNotFound)
      Rails.logger.info("[WordPress] post not found: id=#{id}")
      return nil
    end

    post
  end
end