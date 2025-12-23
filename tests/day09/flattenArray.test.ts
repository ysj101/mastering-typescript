/**
 * Day09: flattenArrayのテスト
 */

import { flattenArray } from '../../solutions/day09/flattenArray';

describe('flattenArray', () => {
  describe('基本動作', () => {
    test('正常系: 数値の2次元配列をフラット化', () => {
      const input = [[1, 2], [3, 4], [5]];
      const result = flattenArray(input);

      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    test('正常系: 文字列の2次元配列をフラット化', () => {
      const input = [['a', 'b'], ['c', 'd']];
      const result = flattenArray(input);

      expect(result).toEqual(['a', 'b', 'c', 'd']);
    });

    test('正常系: オブジェクトの2次元配列をフラット化', () => {
      type User = { name: string };
      const input: User[][] = [
        [{ name: 'Alice' }, { name: 'Bob' }],
        [{ name: 'Charlie' }],
      ];
      const result = flattenArray(input);

      expect(result).toEqual([
        { name: 'Alice' },
        { name: 'Bob' },
        { name: 'Charlie' },
      ]);
    });
  });

  describe('エッジケース', () => {
    test('エッジケース: 空の配列', () => {
      const input: number[][] = [];
      const result = flattenArray(input);

      expect(result).toEqual([]);
    });

    test('エッジケース: 空の配列を含む', () => {
      const input = [[1, 2], [], [3, 4]];
      const result = flattenArray(input);

      expect(result).toEqual([1, 2, 3, 4]);
    });

    test('エッジケース: すべて空の配列', () => {
      const input: number[][] = [[], [], []];
      const result = flattenArray(input);

      expect(result).toEqual([]);
    });

    test('エッジケース: 単一の配列', () => {
      const input = [[1, 2, 3]];
      const result = flattenArray(input);

      expect(result).toEqual([1, 2, 3]);
    });

    test('エッジケース: 各配列が1要素のみ', () => {
      const input = [[1], [2], [3], [4], [5]];
      const result = flattenArray(input);

      expect(result).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('非破壊的な動作', () => {
    test('正常系: 元の配列を変更しない', () => {
      const input = [[1, 2], [3, 4]];
      const original = [[1, 2], [3, 4]];

      flattenArray(input);

      expect(input).toEqual(original);
    });
  });

  describe('型の推論', () => {
    test('正常系: 型が正しく推論される', () => {
      const numbers = flattenArray([[1, 2], [3, 4]]);
      const strings = flattenArray([['a', 'b'], ['c']]);
      const booleans = flattenArray([[true, false], [true]]);

      // 型レベルでの検証（実行時には影響しない）
      const _n: number[] = numbers;
      const _s: string[] = strings;
      const _b: boolean[] = booleans;

      expect(typeof numbers[0]).toBe('number');
      expect(typeof strings[0]).toBe('string');
      expect(typeof booleans[0]).toBe('boolean');
    });
  });

  describe('実践的なケース', () => {
    test('実践: ページネーション結果の統合', () => {
      type Page<T> = {
        items: T[];
        page: number;
      };

      type Product = {
        id: number;
        name: string;
      };

      const pages: Page<Product>[] = [
        {
          items: [
            { id: 1, name: 'Apple' },
            { id: 2, name: 'Banana' },
          ],
          page: 1,
        },
        {
          items: [
            { id: 3, name: 'Cherry' },
            { id: 4, name: 'Date' },
          ],
          page: 2,
        },
      ];

      const allProducts = flattenArray(pages.map((p) => p.items));

      expect(allProducts).toEqual([
        { id: 1, name: 'Apple' },
        { id: 2, name: 'Banana' },
        { id: 3, name: 'Cherry' },
        { id: 4, name: 'Date' },
      ]);
    });

    test('実践: タグのリストを統合', () => {
      type Article = {
        title: string;
        tags: string[];
      };

      const articles: Article[] = [
        { title: 'TypeScript', tags: ['programming', 'typescript'] },
        { title: 'React', tags: ['programming', 'react', 'ui'] },
        { title: 'Node.js', tags: ['programming', 'nodejs', 'backend'] },
      ];

      const allTags = flattenArray(articles.map((a) => a.tags));

      expect(allTags).toEqual([
        'programming',
        'typescript',
        'programming',
        'react',
        'ui',
        'programming',
        'nodejs',
        'backend',
      ]);

      // 重複を除去
      const uniqueTags = [...new Set(allTags)];
      expect(uniqueTags).toEqual([
        'programming',
        'typescript',
        'react',
        'ui',
        'nodejs',
        'backend',
      ]);
    });

    test('実践: カテゴリ内の商品を全て取得', () => {
      type Product = {
        id: number;
        name: string;
      };

      type Category = {
        name: string;
        products: Product[];
      };

      const categories: Category[] = [
        {
          name: 'Fruits',
          products: [
            { id: 1, name: 'Apple' },
            { id: 2, name: 'Banana' },
          ],
        },
        {
          name: 'Vegetables',
          products: [
            { id: 3, name: 'Carrot' },
            { id: 4, name: 'Spinach' },
          ],
        },
      ];

      const allProducts = flattenArray(categories.map((c) => c.products));

      expect(allProducts).toEqual([
        { id: 1, name: 'Apple' },
        { id: 2, name: 'Banana' },
        { id: 3, name: 'Carrot' },
        { id: 4, name: 'Spinach' },
      ]);
    });
  });

  describe('大量データ', () => {
    test('正常系: 大量の配列をフラット化', () => {
      const input: number[][] = Array.from({ length: 100 }, (_, i) =>
        Array.from({ length: 10 }, (_, j) => i * 10 + j)
      );

      const result = flattenArray(input);

      expect(result.length).toBe(1000);
      expect(result[0]).toBe(0);
      expect(result[999]).toBe(999);
    });
  });
});
