/**
 * Day02: filterValidのテスト
 */

import { filterValid, type User, type ValidUser } from '../../solutions/day02/filterValid';

describe('filterValid', () => {
  test('正常系: すべてのフィールドが有効なユーザーのみを返す', () => {
    const users: User[] = [
      { id: 1, name: 'Alice', email: 'alice@example.com', age: 25 },
      { id: 2, name: 'Bob', email: 'bob@example.com', age: 30 },
    ];

    const result = filterValid(users);

    expect(result).toEqual([
      { id: 1, name: 'Alice', email: 'alice@example.com', age: 25 },
      { id: 2, name: 'Bob', email: 'bob@example.com', age: 30 },
    ]);
  });

  test('正常系: 無効なユーザーを除外する', () => {
    const users: User[] = [
      { id: 1, name: 'Alice', email: 'alice@example.com', age: 25 },
      { id: 2, name: 'Bob', email: '', age: 30 }, // emailが空
      { id: 3, name: '', email: 'charlie@example.com', age: 35 }, // nameが空
      { id: 4, name: 'David', email: 'david@example.com' }, // ageが未定義
      { id: 5, name: 'Eve', email: 'eve@example.com', age: -5 }, // ageが負の数
      { id: 6, name: 'Frank', email: 'frank@example.com', age: 40 },
    ];

    const result = filterValid(users);

    expect(result).toEqual([
      { id: 1, name: 'Alice', email: 'alice@example.com', age: 25 },
      { id: 6, name: 'Frank', email: 'frank@example.com', age: 40 },
    ]);
  });

  test('異常系: nameがundefinedのユーザーを除外', () => {
    const users: User[] = [{ id: 1, email: 'test@example.com', age: 20 }];

    const result = filterValid(users);

    expect(result).toEqual([]);
  });

  test('異常系: emailがundefinedのユーザーを除外', () => {
    const users: User[] = [{ id: 1, name: 'Alice', age: 25 }];

    const result = filterValid(users);

    expect(result).toEqual([]);
  });

  test('異常系: ageがundefinedのユーザーを除外', () => {
    const users: User[] = [{ id: 1, name: 'Alice', email: 'alice@example.com' }];

    const result = filterValid(users);

    expect(result).toEqual([]);
  });

  test('異常系: ageが0未満のユーザーを除外', () => {
    const users: User[] = [
      { id: 1, name: 'Alice', email: 'alice@example.com', age: -1 },
      { id: 2, name: 'Bob', email: 'bob@example.com', age: 0 },
    ];

    const result = filterValid(users);

    expect(result).toEqual([{ id: 2, name: 'Bob', email: 'bob@example.com', age: 0 }]);
  });

  test('エッジケース: 空配列を渡すと空配列を返す', () => {
    const users: User[] = [];

    const result = filterValid(users);

    expect(result).toEqual([]);
  });

  test('エッジケース: すべて無効なユーザーの場合は空配列を返す', () => {
    const users: User[] = [
      { id: 1, name: '', email: '', age: -1 },
      { id: 2 },
      { id: 3, name: 'Test' },
    ];

    const result = filterValid(users);

    expect(result).toEqual([]);
  });

  test('型チェック: 返り値がValidUser[]型であること', () => {
    const users: User[] = [{ id: 1, name: 'Alice', email: 'alice@example.com', age: 25 }];

    const result: ValidUser[] = filterValid(users);

    // 型エラーが出なければOK（コンパイル時チェック）
    expect(result.length).toBe(1);
    expect(result[0]?.name).toBe('Alice');
    expect(result[0]?.email).toBe('alice@example.com');
    expect(result[0]?.age).toBe(25);
  });
});
