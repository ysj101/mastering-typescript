/**
 * Day04: 配列の変換 - テスト
 */

import { mapToNames, type User } from '../../solutions/day04/mapToNames';

describe('Day04: mapToNames', () => {
  describe('基本動作', () => {
    it('ユーザー配列から名前だけを抽出できる', () => {
      const users: User[] = [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
        { id: 3, name: 'Charlie', email: 'charlie@example.com' },
      ];

      const result = mapToNames(users);

      expect(result).toEqual(['Alice', 'Bob', 'Charlie']);
    });

    it('空の配列を渡すと空の配列を返す', () => {
      const users: User[] = [];

      const result = mapToNames(users);

      expect(result).toEqual([]);
    });

    it('単一要素の配列を正しく処理できる', () => {
      const users: User[] = [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
      ];

      const result = mapToNames(users);

      expect(result).toEqual(['Alice']);
    });
  });

  describe('順序の保持', () => {
    it('元の配列の順序を保つ', () => {
      const users: User[] = [
        { id: 3, name: 'Charlie', email: 'charlie@example.com' },
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
      ];

      const result = mapToNames(users);

      expect(result).toEqual(['Charlie', 'Alice', 'Bob']);
    });
  });

  describe('readonly 配列の扱い', () => {
    it('readonly 配列を受け取っても正しく動作する', () => {
      const users: readonly User[] = [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
      ];

      const result = mapToNames(users);

      expect(result).toEqual(['Alice', 'Bob']);
    });

    it('戻り値は通常の配列（readonly ではない）', () => {
      const users: readonly User[] = [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
      ];

      const result = mapToNames(users);

      // 戻り値が通常の配列なので、変更可能
      result.push('New Name');
      expect(result).toEqual(['Alice', 'New Name']);
    });
  });

  describe('元の配列への影響', () => {
    it('元の配列を変更しない（イミュータブル）', () => {
      const users: User[] = [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
      ];

      const originalLength = users.length;
      const originalFirstUser = { ...users[0] };

      mapToNames(users);

      // 元の配列が変更されていないことを確認
      expect(users.length).toBe(originalLength);
      expect(users[0]).toEqual(originalFirstUser);
    });
  });

  describe('さまざまな名前', () => {
    it('特殊文字を含む名前を正しく処理できる', () => {
      const users: User[] = [
        { id: 1, name: "O'Brien", email: 'obrien@example.com' },
        { id: 2, name: 'Müller', email: 'muller@example.com' },
        { id: 3, name: '山田太郎', email: 'yamada@example.com' },
      ];

      const result = mapToNames(users);

      expect(result).toEqual(["O'Brien", 'Müller', '山田太郎']);
    });

    it('空の名前を含むユーザーも処理できる', () => {
      const users: User[] = [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: '', email: 'noname@example.com' },
        { id: 3, name: 'Bob', email: 'bob@example.com' },
      ];

      const result = mapToNames(users);

      expect(result).toEqual(['Alice', '', 'Bob']);
    });
  });

  describe('型の検証', () => {
    it('戻り値の型が string[] である', () => {
      const users: User[] = [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
      ];

      const result = mapToNames(users);

      // 型レベルでの検証（実行時には影響しない）
      const _typeCheck: string[] = result;
      expect(Array.isArray(result)).toBe(true);
      expect(typeof result[0]).toBe('string');
    });
  });

  describe('大量データの処理', () => {
    it('100件のユーザーデータを正しく処理できる', () => {
      const users: User[] = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `User${i + 1}`,
        email: `user${i + 1}@example.com`,
      }));

      const result = mapToNames(users);

      expect(result.length).toBe(100);
      expect(result[0]).toBe('User1');
      expect(result[99]).toBe('User100');
    });
  });
});
