# 設計

## アプリケーション構成

- Railsをモノリスにする。

- websocketはgo, Pusher, ACのマイクロサービス。

  - soketiは、`microservices`のサーバーを起動する必要がある。

  - Go WebSocketサーバーは、`microservices`のサーバーを起動する必要がある。

- ヘッドレスCMSはwordpressのマイクロサービス。

  - wordpressサーバーは、`microservices`のサーバーを起動する必要がある。

- アプリ化対応はPWA。

## ディレクトリ構成

```
src/ <- Railsモノリス
  documents/ <- Railsモノリス固有のドキュメント
documents/ <- 全体のドキュメント
```
