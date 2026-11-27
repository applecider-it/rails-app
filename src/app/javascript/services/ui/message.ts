/** トースト出力 */
let showToastStatic: (message: string, type?: string) => void;
/** ローディング画面のオンオフ */
let setIsLoadingStatic: (value: boolean) => void;

/** メッセージ管理のセットアップ */
export function setupMessage(
  showToastArg: (message: string, type?: string) => void,
  setIsLoadingArg: (value: boolean) => void,
) {
  showToastStatic = showToastArg;
  setIsLoadingStatic = setIsLoadingArg;
}

/** トースト出力 */
export function showToast(message: string, type: string = 'notice') {
  showToastStatic(message, type);
}

/** ローディング画面のオンオフ */
export function setIsLoading(isLoading: boolean) {
  setIsLoadingStatic(isLoading);
}
