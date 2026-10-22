class HomeController < ApplicationController
  def index
  end

  # お知らせ
  def info
    post_service = CmsServices::PostService.new
    
    @page = params.fetch(:page, 1).to_i.clamp(1, 1000)
    
    @result = post_service.posts(1, @page)
  end

  # お知らせ詳細
  def info_detail
    post_service = CmsServices::PostService.new
    
    @post = post_service.post(params[:id])
    raise ActionController::RoutingError, "Not Found" if @post.nil?
  end
end
