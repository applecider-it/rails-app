# Pusher(soketi)

## Pusherのライブラリーの説明

チャンネル名に`presence-`があると、Pusherのライブラリー上ではprivate接続になる。

## アプリケーションで定義していること

チャンネル名と詳細情報の区切り文字は`---`

## Pusherブロードキャスト時

### チャット

チャンネルベースID: `presence-rails-chat-channel`

#### 入室退室ユーザー一覧取得時のユーザー情報

```
{
  id: string, <- Pusherの内部的な理由で文字列になっている
  {
    name: string,
    email: string,
  }
}
```

#### メッセージ送信

メッセージ名: `new-message`

```
{
  message: string,
  user: {
    id: integer,
    email: string,
    name: string,
  }
}
```
