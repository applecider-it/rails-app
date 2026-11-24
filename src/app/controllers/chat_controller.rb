class ChatController < ApplicationController
  before_action :authenticate_user!

  # チャット画面
  def index
    room_service = ChatServices::RoomService.new

    room = params[:room]

    ret = room_service.get_room_info(room)
    
    @rooms = ret[:rooms]
    @room = ret[:room]
  end

  # ActionCableによる送信
  def store
    actioncable_service = ChatServices::ActioncableService.new
    form = ChatForm.new

    form.assign_attributes({
      message: params[:message],
    })

    if form.valid?
      actioncable_service.broadcast(params[:room], form.message, current_user)

      render json: { status: 'OK' }
    else
      render json: {errors: form.errors}, status: :unprocessable_entity
    end
  end
end
