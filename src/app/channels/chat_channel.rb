class ChatChannel < ApplicationCable::Channel
  def subscribed
    channel_id = "chat_channel.#{params[:room]}"
    p("ChatChannel subscribed channel_id: #{channel_id}")
    p("ChatChannel subscribed current_user", current_user)

    @meta = {
      channel_id: channel_id,
    }

    p('ChatChannel subscribed @meta', @meta)

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
    p("ChatChannel unsubscribed current_user", current_user)
    p("ChatChannel unsubscribed @meta", @meta)
    p("ChatChannel unsubscribed @meta[:channel_id]: #{@meta[:channel_id]}")
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
