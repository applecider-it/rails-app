# WebsocketのJWTトークン管理クラス
class WebsocketServices::JwtTokenService
  # userのjwtトークン
  def create_user_jwt_token(user, channel)
    payload = {
      user_id: user.id,
      email: user.email,
      channel: channel,
      exp: 24.hours.from_now.to_i,
      iat: Time.current.to_i
    }

    secret = ENV['APP_JWT_SECRET']  # .env の値を参照

    JWT.encode(payload, secret, 'HS256')
  end
end
