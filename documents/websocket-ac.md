# ActionCable

## ActionCableブロードキャスト時

### チャット

チャンネルベースID: `chat_channel`

#### 入室退室

```
{
  type: 'subscribed' | 'unsubscribed',
  {
    id: integer,
    email: string,
    name: string,
  }
}
```

#### メッセージ送信

```
{
  type: 'message',
  {
    message: string,
    user: {
      id: integer,
      email: string,
      name: string,
    }
  }
}
```
