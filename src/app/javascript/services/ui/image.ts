/** 画像Popup用Hook */
let openImageHook;

/** 画像管理のセットアップ */
export function setupImage(openImageArg) {
  openImageHook = openImageArg;
}

/** 画像Popup */
export async function openImage(initialValue: string = '') {
  return await openImageHook(initialValue);
}
