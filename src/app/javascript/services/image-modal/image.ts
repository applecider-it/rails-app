import type { useImageModal } from './vue-hook/useImageModal';

/** 画像用モーダル */
let imageModalStatic: ReturnType<typeof useImageModal>;

/** 画像管理のセットアップ */
export function setupImage(imageModalArg: ReturnType<typeof useImageModal>) {
  imageModalStatic = imageModalArg;
}

/** 画像Popup */
export async function openImage(initialValue: string = '') {
  return await imageModalStatic.open(initialValue);
}
