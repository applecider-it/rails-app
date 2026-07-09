# 設計

## 構成

Railsをモノリスにする。

websocketはgoのマイクロサービス。

```
go/ <- goマイクロサービス
  documents/ <- goマイクロサービス固有のドキュメント
src/ <- Railsモノリス
  documents/ <- Railsモノリス固有のドキュメント
appli/ <- アプリ
  documents/ <- アプリ固有のドキュメント
selenium/ <- セレニウム
im/ <- Importmapを使った実装例
documents/ <- 全体のドキュメント
```
