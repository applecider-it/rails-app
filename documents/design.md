# 設計

## 構成

Railsをモノリスにする。

websocketはgoのマイクロサービス。

ヘッドレスCMSはwordpressのマイクロサービス。

アプリ化対応はPWA。

```
go/ <- goマイクロサービス
  documents/ <- goマイクロサービス固有のドキュメント
src/ <- Railsモノリス
  documents/ <- Railsモノリス固有のドキュメント
selenium/ <- セレニウム
wordpress/ <- ヘッドレスCMS用wordpress
documents/ <- 全体のドキュメント
```
