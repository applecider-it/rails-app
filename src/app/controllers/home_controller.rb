class HomeController < ApplicationController
  before_action :authenticate_user!, only: [:pusher_auth]

  def index
  end

  # お知らせページなど
  def info
    info_service = InfoServices::InfoService.new

    @infos = info_service.get_infos
  end

  # Pusherの認証
  def pusher_auth
    pusher_service = WebsocketServices::PusherService.new
    response = pusher_service.authenticate(
      params[:channel_name], params[:socket_id], current_user
    )

    if response
      render json: response
    else
      head :forbidden
    end
  end
end
