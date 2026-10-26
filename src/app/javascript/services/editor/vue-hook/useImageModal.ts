import { ref } from 'vue';

/**
 * 画像モーダルウィンドウ用composable
 */
export function useImageModal<T = string>() {
  const isOpen = ref<boolean>(false);
  const value = ref<T | null>(null);

  // Promise の resolve を保持するための変数
  let resolvePromise: ((value: T | null) => void) | null = null;

  /**
   * モーダルを開き、ユーザーが結果を確定または閉じるまで待機する
   *
   * 決定時は文字列を返す。  
   * キャンセル・モーダルを閉じたときはnullを返す。
   */
  const open = (initialValue: T | null = null): Promise<T | null> => {
    value.value = initialValue;
    isOpen.value = true;

    return new Promise((resolve) => {
      resolvePromise = resolve;
    });
  };

  /** 決定ボタンが押されたとき */
  const onCommit = () => {
    end(value.value);
  };

  /** キャンセルされたとき */
  const onCancel = () => {
    end(null);
  };

  /** 終了処理 */
  const end = (val: T) => {
    isOpen.value = false;
    if (resolvePromise) {
      resolvePromise(val);
      resolvePromise = null; // メモリリークの防止と多重呼び出し（バグ）の防止のための措置
    }
    value.value = '';
  };

  return {
    isOpen,
    value,
    open,
    onCommit,
    onCancel,
  };
}
