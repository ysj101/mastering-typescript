/**
 * Day04: 配列の変換
 *
 * Array.map() を使って、ユーザーオブジェクトの配列から名前だけを抽出します。
 */

export type User = {
  readonly id: number;
  name: string;
  email: string;
};

/**
 * ユーザーオブジェクトの配列から名前だけを抽出する関数
 *
 * @param users - ユーザーオブジェクトの配列（readonly）
 * @returns ユーザー名の配列
 *
 * @example
 * ```typescript
 * const users = [
 *   { id: 1, name: 'Alice', email: 'alice@example.com' },
 *   { id: 2, name: 'Bob', email: 'bob@example.com' }
 * ];
 * mapToNames(users); // => ['Alice', 'Bob']
 * ```
 */
export function mapToNames(users: readonly User[]): string[] {
  // TODO: Array.map() を使って、各ユーザーの name プロパティを抽出してください
  //
  // ヒント1: users.map((user) => ...) を使う
  // ヒント2: たった1行で実装できます
  // ヒント3: TypeScript が戻り値の型を自動的に推論してくれます
  //
  // 実装例の構造:
  // return users.map(...);

  throw new Error('Not implemented');
}
