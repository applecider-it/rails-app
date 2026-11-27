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

/** 画像取得 */
export async function getImages() {
  const list = [];

  // ダミーデータ
  Array.from({ length: 5 }).forEach((_, index) => {
    list.push('http://localhost:3000/icon.svg');
    list.push('http://localhost:3000/icon.png');
  });

  return list;
}
