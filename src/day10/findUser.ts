/**
 * Day10: 配列の検索
 * TODO: この関数群を実装してください
 */

// ユーザー型の定義
export type User = {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
};

/**
 * IDでユーザーを検索する
 * @param users - ユーザー配列
 * @param id - 検索するユーザーID
 * @returns 見つかったユーザー、または undefined
 */
export function findUserById(users: User[], id: number): User | undefined {
  // ===== ステップ1: find メソッドで検索 =====
  // users 配列の中から、user.id === id に一致するユーザーを探す
  // find メソッドは条件に一致する最初の要素を返す
  // 見つからない場合は undefined を返す

  // TODO: ここに実装を書く

  throw new Error('Not implemented');
}

/**
 * メールアドレスでユーザーのインデックスを検索する
 * @param users - ユーザー配列
 * @param email - 検索するメールアドレス
 * @returns 見つかったユーザーのインデックス、または -1
 */
export function findUserIndexByEmail(users: User[], email: string): number {
  // ===== ステップ1: findIndex メソッドで検索 =====
  // users 配列の中から、user.email === email に一致するインデックスを探す
  // findIndex メソッドは条件に一致する最初の要素のインデックスを返す
  // 見つからない場合は -1 を返す

  // TODO: ここに実装を書く

  throw new Error('Not implemented');
}

/**
 * アクティブなユーザーを検索する（最初の1人）
 * @param users - ユーザー配列
 * @returns 見つかったアクティブユーザー、または undefined
 */
export function findActiveUser(users: User[]): User | undefined {
  // ===== ステップ1: isActive が true のユーザーを検索 =====
  // users 配列の中から、user.isActive === true に一致するユーザーを探す
  // ヒント: user.isActive だけで true のチェックができる

  // TODO: ここに実装を書く

  throw new Error('Not implemented');
}

/**
 * カスタム条件でユーザーを検索する
 * @param users - ユーザー配列
 * @param condition - 検索条件関数
 * @returns 見つかったユーザー、または undefined
 */
export function findUserByCondition(
  users: User[],
  condition: (user: User) => boolean
): User | undefined {
  // ===== ステップ1: 条件関数を使って検索 =====
  // 渡された condition 関数をそのまま find メソッドに渡す
  // これにより、呼び出し側が自由な検索条件を指定できる

  // TODO: ここに実装を書く

  throw new Error('Not implemented');
}
