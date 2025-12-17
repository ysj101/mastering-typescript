/**
 * Day05: オブジェクトのマッピング - テスト
 */

import {
  transformUser,
  type InputUser,
  type OutputUser,
} from '../../solutions/day05/transformUser';

describe('Day05: transformUser', () => {
  describe('基本動作', () => {
    it('成人のユーザーを正しく変換できる', () => {
      const input: InputUser = {
        id: 1,
        firstName: 'Alice',
        lastName: 'Smith',
        age: 25,
      };

      const result = transformUser(input);

      expect(result).toEqual({
        id: 1,
        fullName: 'Alice Smith',
        isAdult: true,
      });
    });

    it('未成年のユーザーを正しく変換できる', () => {
      const input: InputUser = {
        id: 2,
        firstName: 'Bob',
        lastName: 'Johnson',
        age: 15,
      };

      const result = transformUser(input);

      expect(result).toEqual({
        id: 2,
        fullName: 'Bob Johnson',
        isAdult: false,
      });
    });

    it('ちょうど18歳のユーザーは成人として扱われる', () => {
      const input: InputUser = {
        id: 3,
        firstName: 'Charlie',
        lastName: 'Brown',
        age: 18,
      };

      const result = transformUser(input);

      expect(result).toEqual({
        id: 3,
        fullName: 'Charlie Brown',
        isAdult: true,
      });
    });
  });

  describe('境界値テスト', () => {
    it('17歳のユーザーは未成年として扱われる', () => {
      const input: InputUser = {
        id: 4,
        firstName: 'Dave',
        lastName: 'Wilson',
        age: 17,
      };

      const result = transformUser(input);

      expect(result.isAdult).toBe(false);
    });

    it('19歳のユーザーは成人として扱われる', () => {
      const input: InputUser = {
        id: 5,
        firstName: 'Eve',
        lastName: 'Davis',
        age: 19,
      };

      const result = transformUser(input);

      expect(result.isAdult).toBe(true);
    });

    it('0歳のユーザーは未成年として扱われる', () => {
      const input: InputUser = {
        id: 6,
        firstName: 'Baby',
        lastName: 'Doe',
        age: 0,
      };

      const result = transformUser(input);

      expect(result.isAdult).toBe(false);
    });

    it('100歳のユーザーは成人として扱われる', () => {
      const input: InputUser = {
        id: 7,
        firstName: 'Old',
        lastName: 'Person',
        age: 100,
      };

      const result = transformUser(input);

      expect(result.isAdult).toBe(true);
    });
  });

  describe('fullName の生成', () => {
    it('firstName と lastName が正しく結合される', () => {
      const input: InputUser = {
        id: 8,
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
      };

      const result = transformUser(input);

      expect(result.fullName).toBe('John Doe');
    });

    it('短い名前も正しく処理できる', () => {
      const input: InputUser = {
        id: 9,
        firstName: 'A',
        lastName: 'B',
        age: 25,
      };

      const result = transformUser(input);

      expect(result.fullName).toBe('A B');
    });

    it('長い名前も正しく処理できる', () => {
      const input: InputUser = {
        id: 10,
        firstName: 'Alexander',
        lastName: 'Montgomery-Williams',
        age: 35,
      };

      const result = transformUser(input);

      expect(result.fullName).toBe('Alexander Montgomery-Williams');
    });

    it('特殊文字を含む名前も正しく処理できる', () => {
      const input: InputUser = {
        id: 11,
        firstName: "O'Brien",
        lastName: 'Smith-Jones',
        age: 28,
      };

      const result = transformUser(input);

      expect(result.fullName).toBe("O'Brien Smith-Jones");
    });

    it('日本語の名前も正しく処理できる', () => {
      const input: InputUser = {
        id: 12,
        firstName: '太郎',
        lastName: '山田',
        age: 22,
      };

      const result = transformUser(input);

      expect(result.fullName).toBe('太郎 山田');
    });
  });

  describe('id の保持', () => {
    it('id が正しく保持される', () => {
      const input: InputUser = {
        id: 999,
        firstName: 'Test',
        lastName: 'User',
        age: 20,
      };

      const result = transformUser(input);

      expect(result.id).toBe(999);
    });

    it('id が 0 でも正しく保持される', () => {
      const input: InputUser = {
        id: 0,
        firstName: 'Zero',
        lastName: 'User',
        age: 20,
      };

      const result = transformUser(input);

      expect(result.id).toBe(0);
    });
  });

  describe('元のオブジェクトへの影響', () => {
    it('元のオブジェクトを変更しない（イミュータブル）', () => {
      const input: InputUser = {
        id: 13,
        firstName: 'Immutable',
        lastName: 'Test',
        age: 30,
      };

      const originalInput = { ...input };

      transformUser(input);

      // 元のオブジェクトが変更されていないことを確認
      expect(input).toEqual(originalInput);
    });
  });

  describe('型の検証', () => {
    it('戻り値の型が OutputUser である', () => {
      const input: InputUser = {
        id: 14,
        firstName: 'Type',
        lastName: 'Test',
        age: 25,
      };

      const result = transformUser(input);

      // 型レベルでの検証（実行時には影響しない）
      const _typeCheck: OutputUser = result;
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('fullName');
      expect(result).toHaveProperty('isAdult');
      expect(typeof result.id).toBe('number');
      expect(typeof result.fullName).toBe('string');
      expect(typeof result.isAdult).toBe('boolean');
    });
  });

  describe('複数のユーザーを変換', () => {
    it('配列のmap関数と組み合わせて使える', () => {
      const users: InputUser[] = [
        { id: 1, firstName: 'Alice', lastName: 'Smith', age: 25 },
        { id: 2, firstName: 'Bob', lastName: 'Johnson', age: 15 },
        { id: 3, firstName: 'Charlie', lastName: 'Brown', age: 30 },
      ];

      const results = users.map(transformUser);

      expect(results).toEqual([
        { id: 1, fullName: 'Alice Smith', isAdult: true },
        { id: 2, fullName: 'Bob Johnson', isAdult: false },
        { id: 3, fullName: 'Charlie Brown', isAdult: true },
      ]);
    });
  });
});
