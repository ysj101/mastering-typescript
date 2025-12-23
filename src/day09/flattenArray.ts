/**
 * Day09: 配列のフラット化
 * TODO: この関数を実装してください
 */

/**
 * 2次元配列を1次元配列にフラット化する
 * @param arrays - 要素の配列の配列
 * @returns フラット化された配列
 *
 * @example
 * ```typescript
 * flattenArray([[1, 2], [3, 4], [5]]);
 * // => [1, 2, 3, 4, 5]
 *
 * flattenArray([['a', 'b'], ['c']]);
 * // => ['a', 'b', 'c']
 * ```
 */
export function flattenArray<T>(arrays: T[][]): T[] {
  // ===== 実装方法の選択肢 =====
  //
  // 方法1: flat() メソッドを使う（最もシンプル）
  // return arrays.flat();
  //
  // 方法2: flatMap() を使う
  // return arrays.flatMap(arr => arr);
  //
  // 方法3: reduce() を使う
  // return arrays.reduce((acc, arr) => [...acc, ...arr], []);
  //
  // 方法4: for...of を使う
  // const result: T[] = [];
  // for (const arr of arrays) {
  //   result.push(...arr);
  // }
  // return result;
  //
  // いずれかの方法を選んで実装してください

  // TODO: ここに実装を書く

  throw new Error('Not implemented');
}
