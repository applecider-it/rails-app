# ブログ管理
class PostsController < ApplicationController
  # ブログ一覧
  def index
    post_service = CmsServices::PostService.new
    
    @page = params.fetch(:page, 1).to_i.clamp(1, 1000)
    
    @result = post_service.posts(1, @page)
  end

  # ブログ詳細
  def show
    post_service = CmsServices::PostService.new
    
    @post = post_service.post(params[:id])
    raise ActionController::RoutingError, "Not Found" if @post.nil?
  end

  # 接続エラー時
  rescue_from Errno::ECONNREFUSED do |e|
    Rails.logger.error("#{e.class}: #{e.message}")
    render :error, status: :service_unavailable
  end
end
