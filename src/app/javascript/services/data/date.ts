/**
 * 日付のフォーマット
 *
 * ```
 * type:
 * all: YYYY/MM/DD (W) HH:MM:SS
 * full: YYYY/MM/DD HH:MM:SS
 * date: YYYY/MM/DD
 * ```
 */
export function dateFormat(obj: Date, type: string) {
  const days = ['日', '月', '火', '水', '木', '金', '土'];

  const pad = (num: number) => String(num).padStart(2, '0');

  const yyyy = obj.getFullYear();
  const mm = obj.getMonth() + 1;
  const dd = obj.getDate();

  const hh = obj.getHours();
  const mi = obj.getMinutes();
  const ss = obj.getSeconds();

  const mmPad = pad(mm);
  const ddPad = pad(dd);

  const hhPad = pad(hh);
  const miPad = pad(mi);
  const ssPad = pad(ss);

  const w = days[obj.getDay()];

  if (type === 'all') {
    return `${yyyy}/${mmPad}/${ddPad} (${w}) ${hhPad}:${miPad}:${ssPad}`;
  } else if (type === 'full') {
    return `${yyyy}/${mmPad}/${ddPad} ${hhPad}:${miPad}:${ssPad}`;
  } else if (type === 'date') {
    return `${yyyy}/${mmPad}/${ddPad}`;
  }

  throw Error(`dateFormat() error. Invalid Type: ${type}`);
}
