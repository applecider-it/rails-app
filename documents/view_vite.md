# ViewとViteの橋渡し

## ページごとのViteを読み込む

チャットページなど参照。

## アプリケーション用のJSオブジェクト

```
window.App

window.App.funcs <- Viewから直接利用したい関数を登録する
```

直接JSで、ViteとViewの橋渡しをする。

## 意味のあるセレクタ

`data-app-element-`がプレフィックス

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

#### target

ターゲットのファイルインプットボックスのID

#### info

ファイル情報を表示するHTMLエレメントのID

#### dragover_class

ドラックオーバーしたときに適応されるCSSクラス

Tailwindの利用可

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

#### postal_code

郵便番号のインプットボックスのID

#### prefecture

都道府県のセレクトボックスのID

#### city

市区町村のインプットボックスのID

#### address_line1

町域のインプットボックスのID


