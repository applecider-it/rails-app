# Pusher(soketi)

一部は、Pusher(soketi)で実装している。

## Pusherのライブラリーの説明

チャンネル名に`presence-`があると、Pusherのライブラリー上ではprivate接続になる。

## アプリケーションで定義していること

チャンネル名と詳細情報の区切り文字は`---`

## Pusherブロードキャスト時

### チャット

チャンネル名: `presence-rails-chat-channel`

メッセージ名: `new-message`

```
{
  message: string,
  user_id: integer,
  email: string,
}
```
