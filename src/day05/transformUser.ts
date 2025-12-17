/**
 * Day05: オブジェクトのマッピング
 *
 * ユーザーオブジェクトを別の形式に変換します。
 */

/**
 * 入力ユーザー型
 */
export type InputUser = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
};

/**
 * 出力ユーザー型
 */
export type OutputUser = {
  id: number;
  fullName: string;
  isAdult: boolean;
};

/**
 * ユーザーオブジェクトを変換する関数
 *
 * @param user - 変換元のユーザーオブジェクト
 * @returns 変換後のユーザーオブジェクト
 *
 * @example
 * ```typescript
 * const input = {
 *   id: 1,
 *   firstName: 'Alice',
 *   lastName: 'Smith',
 *   age: 25
 * };
 * transformUser(input);
 * // => { id: 1, fullName: 'Alice Smith', isAdult: true }
 * ```
 */
export function transformUser(user: InputUser): OutputUser {
  // TODO: ユーザーオブジェクトを変換してください
  //
  // ===== ステップ1: fullName を作成 =====
  // firstName と lastName を結合して fullName を作成します
  // テンプレートリテラル（`${...}`）を使うと便利です
  //
  // const fullName = `${user.firstName} ${user.lastName}`;

  // ===== ステップ2: isAdult を判定 =====
  // age が 18 以上かどうかを判定して isAdult を決定します
  // 比較演算子（>=）の結果は boolean 型になります
  //
  // const isAdult = user.age >= 18;

  // ===== ステップ3: 新しいオブジェクトを返す =====
  // 計算した値を使って、OutputUser 型のオブジェクトを作成して返します
  //
  // return {
  //   id: user.id,
  //   fullName,
  //   isAdult,
  // };

  throw new Error('Not implemented');
}
