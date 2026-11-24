/**
 * 日付のフォーマット
 *
 * ```
 * type:
 * ymdwhis: YYYY/MM/DD (W) HH:MM:SS
 * ```
 */
export function dateFormat(obj: Date, type: string) {
  const days = ['日', '月', '火', '水', '木', '金', '土'];

  const pad = (num: number) => String(num).padStart(2, '0');

  const y = obj.getFullYear();
  const m = pad(obj.getMonth() + 1);
  const d = pad(obj.getDate());

  const h = pad(obj.getHours());
  const i = pad(obj.getMinutes());
  const s = pad(obj.getSeconds());

  const w = days[obj.getDay()];

  if (type === 'ymdwhis') {
    return `${y}/${m}/${d} (${w}) ${h}:${i}:${s}`;
  }

  throw Error(`dateFormat() error. Invalid Type: ${type}`);
}
