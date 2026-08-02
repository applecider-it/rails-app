# 設計

Javascript,CSS管理は、Laravelと同じように、vite, tailwind。

MVCSにして、ビジネスロジックは、カテゴリーごとにフォルダを分けたサービスクラスにまとめている。

javascriptを使わないでtypescriptだけ利用している。

インタラクティブな部分は、vueをアイランドアーキテクチャで利用している。

## 通常のRails以外の構成

```
app/
  controllers/
    admin/ <- 管理画面
    admin_users/ <- devise関連
    users/ <- devise関連
    tweets_controller.rb <- user_tweets_controller.rbにしないで、Tweetというドメインを表すようにしている。
  javascript/
    entrypoints/ <- vite_railsのエントリーポイント
      フォルダを分けて管理ができなさそうなので、「___」を区切りに使っている。
    services/ <- ビジネスロジックなど
      (カテゴリーごとにディレクトリを分けて、そのなかにサービスクラスを配置している)
  services/ <- ビジネスロジックなど
    (カテゴリーごとにディレクトリを分けて、そのなかにサービスクラスを配置している)
    sample_services/ <- サービスクラス実装例
    .
    .
    .
  views/
    admin_users/ <- devise関連
    kaminari/ <- paginationファイル
    users/ <- devise関連
    .
    .
    .
  config/
    vite.json <- vite_rails設定ファイル
    .
    .
    .

documents/ <- Railsモノリス固有のドキュメント

(foreman用ファイル)
Procfile.dev
Procfile.prod

(npm関連の設定ファイル)
postcss.config.js
tailwind.config.js
tsconfig.json
vite.config.ts
```

## Rubyのサービスクラスの命名規則

モジュール名、クラス名の衝突を避けるため、カテゴリーごとのディレクトリには`_services`、サービスクラスには`_service`をポストフィックスにしている。

## Railswayじゃない部分

- モデルはDB構成に連動させるべきですが、コントローラーはドメインの区切りに合わせるべきなので、user_tweets_controller.rbにしないで、tweets_controller.rbにして、UserTweetモデルとの連動を断っています。

- ビジネスロジックは、コントローラーやモデルやconcernに書かないで、サービスクラスにまとめています。

- Viteを使うため、importmapは利用していない。

- turboは副作用があるので利用していない。

- stimulusは潰しがきかないので利用していない。

## その他の技術選択の理由

- activeadminは、ブラックボックスのため難しくなってくるので利用していない。

- deviseも、ブラックボックス化しやすいデザインパターンだけど、ある程度は、何とかならなくはない程度で、さらに、デファクトスタンダードになっているため、利用できるエンジニアが多いため採用している。

## その他

- `/config/locales/ja.yml`の、`errors.format`を`"%{message}"`にすることで、エラーメッセージを自由に組み立てられるようにしています。