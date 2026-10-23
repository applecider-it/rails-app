/**
 * HTML関連
 */

import { format } from 'prettier/standalone';
import * as htmlPlugin from 'prettier/plugins/html';

/** HTMLエスケープ */
export function escapeHtml(str) {
  str = String(str);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * METAタグ内のJSONデータを返す。
 */
export function getMetaJson(name: string) {
  const meta = document.querySelector(`meta[name="${name}"]`) as HTMLElement;

  if (meta) {
    const json = meta.dataset.json;
    const arr = JSON.parse(json);

    return arr;
  }

  return null;
}

/** HTMLをフォーマット */
export const formatHtml = async (val: string) => {
  return await format(val, {
    parser: 'html',
    plugins: [htmlPlugin],
    printWidth: 80,
  });
};
