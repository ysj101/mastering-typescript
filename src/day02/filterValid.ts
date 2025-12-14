/**
 * Day02: 配列のフィルタリング
 * TODO: この関数を実装してください
 */

// ユーザー型（オプショナルなフィールドを持つ）
export type User = {
  id: number;
  name?: string;
  email?: string;
  age?: number;
};

// 有効なユーザー型（すべてのフィールドが必須）
export type ValidUser = {
  id: number;
  name: string;
  email: string;
  age: number;
};

/**
 * ユーザー配列から有効なユーザーのみをフィルタリングする
 * @param users - フィルタリング対象のユーザー配列
 * @returns 有効なユーザーのみを含む配列
 */
export function filterValid(users: User[]): ValidUser[] {
  // ===== ステップ1: 型ガード関数を実装する =====
  // 以下の条件をすべて満たすかチェックする関数を作成：
  // 1. nameが存在し、空文字列でない
  // 2. emailが存在し、空文字列でない
  // 3. ageが存在し、0以上の数値である
  //
  // ヒント: function isValidUser(user: User): user is ValidUser { ... }

  // TODO: ここに型ガード関数を実装

  // ===== ステップ2: filterメソッドで配列をフィルタリング =====
  // 型ガード関数を使って、有効なユーザーのみを抽出
  //
  // ヒント: users.filter(isValidUser)

  // TODO: ここにフィルタリング処理を実装

  throw new Error('Not implemented');
}
