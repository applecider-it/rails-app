
# Railsモノリスのテスト用アプリケーション

- [設計](./design.md)

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

- メディア機能
- 地図、GPS
- スライドエディター
- ドラッグアンドドロップによるファイル指定
- 郵便番号検索
- リッチテキストエディタ
- モーダル
- カスタムジェネレーター実装例
- ヘッドレスCMS
- お知らせ管理

## 意味のあるセレクタ

### [data-app-element-drag-and-drop]

ドラッグアンドドロップによるファイル指定

ドラッグアンドドロップするエリアに設置する

```
{
  target: string;
  info: string;
  dragover_class: string;
}
```

### [data-app-element-postal-code]

郵便番号検索

検索ボタンに設置する

```
{
  postal_code: string;
  prefecture: string;
  city: string;
  address_line1: string;
}
```

