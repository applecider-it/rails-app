class ChatPusherController < ApplicationController
  before_action :authenticate_user!

  # チャット画面
  def index
    room_service = ChatServices::RoomService.new

    room = params[:room]

    ret = room_service.get_room_info(room)
    
    @rooms = ret[:rooms]
    @room = ret[:room]

    @token = current_user.jwt_token(ChannelServices::ChatChannelService.get_channel(@room))
  end

  # Pusherによる送信
  def store_p
    pusher_service = ChatServices::PusherService.new
    form = ChatForm.new

    form.assign_attributes({
      message: params[:message],
    })

    if form.valid?
      pusher_service.broadcast(params[:room], form.message, current_user)

      render json: { status: 'OK' }
    else
      render json: {errors: form.errors}, status: :unprocessable_entity
    end
  end
end
