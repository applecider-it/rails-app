# 評価

railsは、すべてのアプリケーション開発の中で、一番生産性が高いと思う。

## 問題点

- JS、CSS管理でviteを標準にしていない。
- ビジネスロジックの置き場の模範解答を提示してこなかった。
- rubyは、ある程度複雑な処理も１行で書けるため、共通関数にするべき部分が共通関数にされないことがある。（これはruby,railsの問題じゃなくて、rubyを使う人の問題）
- 名前空間の管理が危なっかしい。
- 微妙な部分
- 厄介な部分

この問題点を解決する必要はある。

問題点はあるけど、生産性の高さは圧倒的だと思う。

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

## 微妙な部分

respond_toは、普通は使わない。

一応実装するという考えは、余計なメンテナンスコストになるので、必要な時だけ使うほうがいいと思う。

jbuilderより、as_jsonのほうがいいと思う。

railsの機能の中には、このような微妙なものもあるので、取捨選択は必須だと思う。

## 厄介な部分

実装例のTweetsJsControllerの`wrap_parameters false`がないと、railsが自動変換してパラメーターを追加してしまい警告が発生する。

しかも、追加されるキーが、tweets_jsではなく、tweets_jになる。

なぜなら、railsはjsのsを複数形と判断して省いてしまうから。

この辺は、便利になる場合がある一方で、地味に厄介になることもある。

railsが嫌われる要因になりやすい。

## リンク

Railsで利用しているオートロードのライブラリー

https://github.com/fxn/zeitwerk
