# 評価

railsは、すべてのアプリケーション開発の中で、一番生産性が高いと思う。

## 問題点

- JS、CSS管理でviteを標準にしていない。
- ビジネスロジックの置き場の模範解答を提示してこなかった。
- rubyは、ある程度複雑な処理も１行で書けるため、共通関数にするべき部分が共通関数にされないことがある。（これはruby,railsの問題じゃなくて、rubyを使う人の問題）
- 名前空間の管理が危なっかしい。

この問題点を解決する必要はある。

## 名前空間の管理が危なっかしい具体例

regist_service.rb
```ruby
class PostServices::RegistService
  def method1
    post = Post.find(1)
  end
end
```

構造1
```
models/
  post.rb <- これが対象になる
services/
  post_services/
    regist_service.rb
```

構造2
```
models/
  post.rb
services/
  post_services/
    regist_service/
      post.rb <- これが対象になる
    regist_service.rb
```

## respond_to, jbuilder

respond_toは、普通は使わない。

一応実装するという考えは、余計なメンテナンスコストになるので、必要な時だけ使うほうがいいと思う。

jbuilderより、as_jsonのほうがいいと思う。

railsの機能の中には、このような微妙なものもあるので、取捨選択は必須だと思う。

## リンク

Railsで利用しているオートロードのライブラリー

https://github.com/fxn/zeitwerk
