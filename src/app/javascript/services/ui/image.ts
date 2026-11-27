import type { useImageModal } from '@/services/ui/vue-hook/useImageModal';
import { sleep } from '@/services/system/date';

/** 画像用モーダル */
let imageModal: ReturnType<typeof useImageModal>;

/** 画像管理のセットアップ */
export function setupImage(imageModalArg: ReturnType<typeof useImageModal>) {
  imageModal = imageModalArg;
}

/** 画像Popup */
export async function openImage(initialValue: string = '') {
  return await imageModal.open(initialValue);
}

/** 画像取得 */
export async function getImages() {
  await sleep(1000 * 0.5);

  const list = [];

  // ダミーデータ
  Array.from({ length: 5 }).forEach((_, index) => {
    list.push('http://localhost:3000/icon.svg');
    list.push('http://localhost:3000/icon.png');
  });

  return list;
}
