# 不具合

## ブラウザの警告について

```
The resource http://localhost:3000/assets/application-???????.css was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate as value and it is preloaded intentionally.
```

これは、ページ遷移や、prefetchをturbo driveでするときに、なぜか、cssだけ再取得してしまうことがあるのが原因。

リロードしてから、一定時間経過したときに、上記のアクションをすると起きる。

ただし、この警告が出る場合と、でない場合がある。

出現条件は不明。

## turbo特有の不具合対応

### ページ遷移時に古い状態を一時表示する処理を止めたいとき

対象ページのviewにこれを追加。

```ruby
<% content_for :head do %>
    <meta name="turbo-cache-control" content="no-cache">
<% end %>
```

### stimulusコントローラーのconnect()が２回動かないようにするための措置

対象ページのviewにこれを追加。

```ruby
<% content_for :head do %>
    <meta name="turbo-cache-control" content="no-cache">
<% end %>
```

### 日時情報などがあり、prefetchでデータが生成されると都合が悪いとき

対象ページへのリンクをすべてこうする。

```ruby
<%= link_to 'Wait', home_wait_path, data: { turbo_prefetch: false } %>
```
