# Rails Importmap実装例

## 実装内容

- stimulusコントローラーの動作確認
- stimulusコントローラーからVueの起動
- サービスクラスの動作確認
- ページ遷移演出の動作確認
- Turbo Driveで状態が残るので、unload処理の動作確認

## stimulusの機能を利用していない部分

stimulusの機能で値を渡していない理由は、jsonにしてallで渡したほうが手っ取り早いし、潰しがきく方法だから。

## ブラウザの警告について

```
The resource http://localhost:3000/assets/application-???????.css was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate as value and it is preloaded intentionally.
```

これは、ページ遷移や、prefetchをturbo driveでするときに、なぜか、cssだけ再取得してしまうことがあるのが原因。

リロードしてから、一定時間経過したときに、上記のアクションをすると起きる。

ただし、この警告が出る場合と、でない場合がある。

出現条件は不明。
## その他

- [評価](./evaluation.md)
