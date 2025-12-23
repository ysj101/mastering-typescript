/**
 * Day10: findUser のテスト
 */

import {
  User,
  findUserById,
  findUserIndexByEmail,
  findActiveUser,
  findUserByCondition,
} from '../../solutions/day10/findUser';

describe('Day10: 配列の検索', () => {
  // テスト用のユーザーデータ
  const users: User[] = [
    {
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      age: 25,
      isActive: true,
    },
    { id: 2, name: 'Bob', email: 'bob@example.com', age: 30, isActive: false },
    {
      id: 3,
      name: 'Charlie',
      email: 'charlie@example.com',
      age: 35,
      isActive: true,
    },
    {
      id: 4,
      name: 'David',
      email: 'david@example.com',
      age: 28,
      isActive: false,
    },
    {
      id: 5,
      name: 'Eve',
      email: 'eve@example.com',
      age: 32,
      isActive: true,
    },
  ];

  describe('findUserById', () => {
    test('正常系: 存在するIDでユーザーを検索できる', () => {
      const result = findUserById(users, 2);
      expect(result).toEqual({
        id: 2,
        name: 'Bob',
        email: 'bob@example.com',
        age: 30,
        isActive: false,
      });
    });

    test('正常系: 最初のユーザーを検索できる', () => {
      const result = findUserById(users, 1);
      expect(result).toEqual({
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        age: 25,
        isActive: true,
      });
    });

    test('正常系: 最後のユーザーを検索できる', () => {
      const result = findUserById(users, 5);
      expect(result).toEqual({
        id: 5,
        name: 'Eve',
        email: 'eve@example.com',
        age: 32,
        isActive: true,
      });
    });

    test('異常系: 存在しないIDの場合はundefinedを返す', () => {
      const result = findUserById(users, 999);
      expect(result).toBeUndefined();
    });

    test('エッジケース: 空配列の場合はundefinedを返す', () => {
      const result = findUserById([], 1);
      expect(result).toBeUndefined();
    });
  });

  describe('findUserIndexByEmail', () => {
    test('正常系: 存在するメールアドレスでインデックスを検索できる', () => {
      const result = findUserIndexByEmail(users, 'charlie@example.com');
      expect(result).toBe(2);
    });

    test('正常系: 最初のユーザーのインデックスを検索できる', () => {
      const result = findUserIndexByEmail(users, 'alice@example.com');
      expect(result).toBe(0);
    });

    test('正常系: 最後のユーザーのインデックスを検索できる', () => {
      const result = findUserIndexByEmail(users, 'eve@example.com');
      expect(result).toBe(4);
    });

    test('異常系: 存在しないメールアドレスの場合は-1を返す', () => {
      const result = findUserIndexByEmail(users, 'nonexistent@example.com');
      expect(result).toBe(-1);
    });

    test('エッジケース: 空配列の場合は-1を返す', () => {
      const result = findUserIndexByEmail([], 'test@example.com');
      expect(result).toBe(-1);
    });
  });

  describe('findActiveUser', () => {
    test('正常系: 最初のアクティブユーザーを検索できる', () => {
      const result = findActiveUser(users);
      expect(result).toEqual({
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        age: 25,
        isActive: true,
      });
    });

    test('異常系: アクティブユーザーがいない場合はundefinedを返す', () => {
      const inactiveUsers: User[] = [
        {
          id: 1,
          name: 'Alice',
          email: 'alice@example.com',
          age: 25,
          isActive: false,
        },
        {
          id: 2,
          name: 'Bob',
          email: 'bob@example.com',
          age: 30,
          isActive: false,
        },
      ];
      const result = findActiveUser(inactiveUsers);
      expect(result).toBeUndefined();
    });

    test('エッジケース: 空配列の場合はundefinedを返す', () => {
      const result = findActiveUser([]);
      expect(result).toBeUndefined();
    });

    test('正常系: 複数のアクティブユーザーがいる場合は最初の1人を返す', () => {
      // users配列には Alice (id:1), Charlie (id:3), Eve (id:5) がアクティブ
      const result = findActiveUser(users);
      expect(result?.id).toBe(1); // 最初のアクティブユーザーのIDは1
    });
  });

  describe('findUserByCondition', () => {
    test('正常系: 年齢が30歳以上のユーザーを検索できる', () => {
      const result = findUserByCondition(users, (user) => user.age >= 30);
      expect(result).toEqual({
        id: 2,
        name: 'Bob',
        email: 'bob@example.com',
        age: 30,
        isActive: false,
      });
    });

    test('正常系: 名前が特定の文字列で始まるユーザーを検索できる', () => {
      const result = findUserByCondition(users, (user) =>
        user.name.startsWith('C')
      );
      expect(result).toEqual({
        id: 3,
        name: 'Charlie',
        email: 'charlie@example.com',
        age: 35,
        isActive: true,
      });
    });

    test('正常系: 複合条件（アクティブかつ30歳以上）で検索できる', () => {
      const result = findUserByCondition(
        users,
        (user) => user.isActive && user.age >= 30
      );
      expect(result).toEqual({
        id: 3,
        name: 'Charlie',
        email: 'charlie@example.com',
        age: 35,
        isActive: true,
      });
    });

    test('異常系: 条件に一致するユーザーがいない場合はundefinedを返す', () => {
      const result = findUserByCondition(users, (user) => user.age > 100);
      expect(result).toBeUndefined();
    });

    test('エッジケース: 空配列の場合はundefinedを返す', () => {
      const result = findUserByCondition([], (user) => user.isActive);
      expect(result).toBeUndefined();
    });

    test('正常系: メールドメインで検索できる', () => {
      const result = findUserByCondition(users, (user) =>
        user.email.endsWith('@example.com')
      );
      // すべてのユーザーが @example.com を持つので、最初のユーザーが返る
      expect(result?.id).toBe(1);
    });
  });
});
