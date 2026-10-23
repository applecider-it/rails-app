import Image from '@tiptap/extension-image';

/**
 * style属性を保持できるカスタム画像拡張。
 * 標準のImageはstyle属性をスキーマに持たないため、
 * setContentでHTMLを読み込むとstyleが捨てられてしまう。
 * それを防ぐために、styleを属性として追加している。
 */
export const CustomImage = Image.extend({
  addAttributes() {
    return {
      // 標準のImageが持つ属性（src, alt, titleなど）をそのまま引き継ぐ
      ...this.parent?.(),
      style: {
        // style属性がない画像（新規挿入時など）に付けるデフォルトの幅
        default: 'width: 20rem;',
        // HTMLを読み込むとき: img要素のstyle属性をそのまま取り込む
        parseHTML: (element) => element.getAttribute('style'),
        // HTMLを出力するとき: 保持しているstyleをimg要素に付ける
        renderHTML: (attributes) => ({ style: attributes.style }),
      },
    };
  },
});

/** 文字色ボタンに表示する色の選択肢（label: ツールチップ用、value: カラーコード） */
export const COLORS = [
  { label: '赤', value: '#dc2626' },
  { label: '青', value: '#2563eb' },
  { label: '緑', value: '#16a34a' },
];

/** ツールバーボタン共通のクラス */
export const btnClass =
  'px-3 py-1.5 text-sm font-medium rounded-sm border transition-colors';

/** ボタンが有効状態のときのクラス */
export const btnActiveClass = 'bg-blue-600 text-white border-blue-600';

/** ボタンが無効状態（未適用）のときのクラス */
export const btnUnactiveClass =
  'bg-white text-gray-700 border-gray-300 hover:bg-gray-100';

  /** 見出しボタンに表示するレベル */
export const HEADING_LEVELS = [1, 2, 3, 4] as const;
