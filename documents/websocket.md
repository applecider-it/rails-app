# websocket連携

websocketはgoで連携する。


### チャットの場合のjsonをパースした状態

チャンネル名: `chat`

```
{
  message: string,
  user_id: integer,
  email: string,
}
```

### Tweetの場合のjsonをパースした状態

チャンネル名: `tweet`

```
{
  content: string,
  user_id: integer,
}
```
