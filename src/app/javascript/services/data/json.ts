/**
 * Json関連
 */

/** Jsonのクローン */
export function cloneJson(value: any): any {
  const newVal = JSON.parse(JSON.stringify(value));

  return newVal;
}
