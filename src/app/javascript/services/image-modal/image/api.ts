import { sleep } from '@/services/system/date';

/** 画像取得 */
export async function getImages(page: number) {
  console.log('getImages', { page });

  // 画面の挙動の確認用にスリープさせる
  await sleep(1000 * 0.5);

  const list = [];

  // ダミーデータ
  Array.from({ length: 5 }).forEach((_, index) => {
    list.push('http://localhost:3000/icon.svg');
    list.push('http://localhost:3000/icon.png');
  });

  return {
    list,
    pageCount: 3,
  };
}
