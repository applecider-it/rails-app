class ChatChannel < ApplicationCable::Channel
  def subscribed
    channel_id = "chat_channel.#{params[:room]}"
    p('subscribed channel_id', channel_id)
    p('subscribed current_user', current_user)

    @meta = {
      channel_id: channel_id,
      current_user_id: current_user.id,
    }

    p('subscribed @meta', @meta)

    stream_from channel_id

    ActionCable.server.broadcast(
      channel_id,
      {
        type: "subscribed",
        data: {
          id: current_user.id,
          email: current_user.email,
          name: current_user.name,
        }
      }
    )
  end

  def unsubscribed
    p('unsubscribed current_user', current_user)
    p('unsubscribed @meta', @meta)
    p('unsubscribed @meta[:channel_id]', @meta[:channel_id])
    # Any cleanup needed when channel is unsubscribed

    ActionCable.server.broadcast(
      @meta[:channel_id],
      {
        type: "unsubscribed",
        data: {
          id: current_user.id,
          email: current_user.email,
          name: current_user.name,
        }
      }
    )
  end
end
