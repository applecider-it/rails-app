# Rails Importmap実装例

上手に使えば、ある程度まとまりがある形にはなる。

ただし、importmapは実装が難しくなり、turboは副作用があり、stimulusは潰しがきかないという側面もある。

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
