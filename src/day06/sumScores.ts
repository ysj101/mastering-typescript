/**
 * Day06: 配列の集計
 *
 * Array.reduce() を使って、スコアの合計を計算します。
 */

/**
 * スコア型
 */
export type Score = {
  subject: string;
  points: number;
};

/**
 * スコア配列の合計点を計算する関数
 *
 * @param scores - スコアオブジェクトの配列
 * @returns すべてのスコアの合計点
 *
 * @example
 * ```typescript
 * const scores = [
 *   { subject: 'Math', points: 80 },
 *   { subject: 'English', points: 90 },
 *   { subject: 'Science', points: 85 }
 * ];
 * sumScores(scores); // => 255
 * ```
 */
export function sumScores(scores: readonly Score[]): number {
  // TODO: Array.reduce() を使って合計点を計算してください
  //
  // ===== ステップ1: reduce 関数を使う =====
  // scores.reduce((accumulator, currentValue) => { ... }, initialValue)
  //
  // accumulator: 累積値（前回の処理結果）
  // currentValue: 現在処理している要素
  // initialValue: 初期値（0 を指定）

  // ===== ステップ2: accumulator に points を加算 =====
  // 各スコアの points を accumulator に足していきます
  // return accumulator + currentValue.points;

  // ===== ステップ3: 初期値を 0 に設定 =====
  // 空の配列でもエラーにならないように、初期値 0 を指定します
  //
  // 完全な実装例:
  // return scores.reduce((acc, score) => acc + score.points, 0);

  throw new Error('Not implemented');
}
