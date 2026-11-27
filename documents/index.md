
# Railsアプリケーション

- [設計](./design.md)
- websocket
  - [ActionCable](./websocket-ac.md)
  - [Pusher](./websocket-pusher.md)

## 実装内容

- [ツイート機能](./features/tweet.md)
- [チャット機能](./features/chat.md)

## モデル

`id`, `created_at`, `updated_at`, `discarded_at`の説明は省略しています。

- [ユーザー](./models/user.md)
  - [ユーザーツイート](./models/user_tweet.md)
- [管理者](./models/admin_user.md)

## 追加した要素

- devise
- vite
- tailwind
- discard

## 細かいツール

- ページ単位
  - メディア機能
  - 地図、GPS
  - スライドエディター（データはダミー）
  - ヘッドレスCMS
  - お知らせ管理
  - PWAのトップ画面
- 部品
  - JS
    - ドラッグアンドドロップによるファイル指定
    - 郵便番号検索
    - リッチテキストエディタ
    - 汎用モーダル
    - 画像用モーダル（データはダミー）
    - フォーム変更チェック
    - クリップボード
    - ページ遷移しない独自ルーター
    - JSからのファイルアップロード
    - PWAの表示切替(JS)
    - トースト
    - ローディング演出
  - CSS
    - PWAの表示切替(CSS)
    - Tailwindの特殊な利用例
- その他
  - カスタムジェネレーター実装例
