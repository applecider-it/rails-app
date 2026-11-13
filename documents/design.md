# 設計

## アプリケーション構成

- Railsをモノリスにする。

- websocketはgo, Pusher, ACのマイクロサービス。

  - soketiは、`microservices`のWebサーバーを起動する必要がある。

  - Go WebSocketサーバーは、`microservices`のWebサーバーを起動する必要がある。

- ヘッドレスCMSはwordpressのマイクロサービス。

- アプリ化対応はPWA。

## ディレクトリ構成

```
src/ <- Railsモノリス
  documents/ <- Railsモノリス固有のドキュメント
documents/ <- 全体のドキュメント
```
