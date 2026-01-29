/**
 * Day12: 型述語（Type Predicate）
 * TODO: 各型ガード関数を実装してください
 */

// ===== 型定義 =====

export type User = {
  type: 'user';
  id: number;
  name: string;
  email: string;
};

export type Admin = {
  type: 'admin';
  id: number;
  name: string;
  permissions: string[];
};

export type Guest = {
  type: 'guest';
  sessionId: string;
  expiresAt: Date;
};

export type Account = User | Admin | Guest;

// ===== 型ガード関数 =====

/**
 * accountがUser型かどうかを判定する型ガード関数
 *
 * @param account - 判定対象のアカウント
 * @returns accountがUser型の場合true
 *
 * ヒント: 型述語 `account is User` を戻り値の型として指定する
 */
export function isUser(account: Account): account is User {
  // ===== Step 1: User型の判定 =====
  // account.typeが'user'かどうかを判定する
  // 型述語により、trueを返すと呼び出し元でUser型として扱える

  // TODO: ここに判定ロジックを書く

  throw new Error('Not implemented');
}

/**
 * accountがAdmin型かどうかを判定する型ガード関数
 *
 * @param account - 判定対象のアカウント
 * @returns accountがAdmin型の場合true
 *
 * ヒント: isUserと同様のパターンで実装する
 */
export function isAdmin(account: Account): account is Admin {
  // ===== Step 2: Admin型の判定 =====
  // account.typeが'admin'かどうかを判定する
  // 型述語により、trueを返すと呼び出し元でAdmin型として扱える

  // TODO: ここに判定ロジックを書く

  throw new Error('Not implemented');
}

/**
 * accountがGuest型かどうかを判定する型ガード関数
 *
 * @param account - 判定対象のアカウント
 * @returns accountがGuest型の場合true
 *
 * ヒント: isUser、isAdminと同様のパターンで実装する
 */
export function isGuest(account: Account): account is Guest {
  // ===== Step 3: Guest型の判定 =====
  // account.typeが'guest'かどうかを判定する
  // 型述語により、trueを返すと呼び出し元でGuest型として扱える

  // TODO: ここに判定ロジックを書く

  throw new Error('Not implemented');
}
