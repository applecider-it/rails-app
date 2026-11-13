# websocket連携

websocketはgoで連携する。

Go WebSocketサーバーは、`microservices`のWebサーバーを起動する必要がある。


### チャットの場合のjsonをパースした状態

```
{
  message: string,
  user_id: integer,
  email: string,
}
```

### Tweetの場合のjsonをパースした状態

```
{
  content: string,
  user_id: integer,
}
```
