/**
 * Day08: sortByPropertyのテスト
 */

import { sortByProperty, Product } from '../../solutions/day08/sortByProperty';

describe('sortByProperty', () => {
  const sampleProducts: Product[] = [
    { id: 1, name: 'Banana', price: 120, stock: 10 },
    { id: 2, name: 'Apple', price: 100, stock: 5 },
    { id: 3, name: 'Cherry', price: 150, stock: 3 },
    { id: 4, name: 'Date', price: 100, stock: 8 },
  ];

  describe('数値プロパティのソート', () => {
    test('正常系: 価格で昇順ソート', () => {
      const result = sortByProperty(sampleProducts, 'price', 'asc');

      expect(result).toEqual([
        { id: 2, name: 'Apple', price: 100, stock: 5 },
        { id: 4, name: 'Date', price: 100, stock: 8 },
        { id: 1, name: 'Banana', price: 120, stock: 10 },
        { id: 3, name: 'Cherry', price: 150, stock: 3 },
      ]);
    });

    test('正常系: 価格で降順ソート', () => {
      const result = sortByProperty(sampleProducts, 'price', 'desc');

      expect(result).toEqual([
        { id: 3, name: 'Cherry', price: 150, stock: 3 },
        { id: 1, name: 'Banana', price: 120, stock: 10 },
        { id: 2, name: 'Apple', price: 100, stock: 5 },
        { id: 4, name: 'Date', price: 100, stock: 8 },
      ]);
    });

    test('正常系: 在庫数で昇順ソート', () => {
      const result = sortByProperty(sampleProducts, 'stock', 'asc');

      expect(result).toEqual([
        { id: 3, name: 'Cherry', price: 150, stock: 3 },
        { id: 2, name: 'Apple', price: 100, stock: 5 },
        { id: 4, name: 'Date', price: 100, stock: 8 },
        { id: 1, name: 'Banana', price: 120, stock: 10 },
      ]);
    });

    test('正常系: 在庫数で降順ソート', () => {
      const result = sortByProperty(sampleProducts, 'stock', 'desc');

      expect(result).toEqual([
        { id: 1, name: 'Banana', price: 120, stock: 10 },
        { id: 4, name: 'Date', price: 100, stock: 8 },
        { id: 2, name: 'Apple', price: 100, stock: 5 },
        { id: 3, name: 'Cherry', price: 150, stock: 3 },
      ]);
    });

    test('正常系: IDで昇順ソート', () => {
      const result = sortByProperty(sampleProducts, 'id', 'asc');

      expect(result).toEqual([
        { id: 1, name: 'Banana', price: 120, stock: 10 },
        { id: 2, name: 'Apple', price: 100, stock: 5 },
        { id: 3, name: 'Cherry', price: 150, stock: 3 },
        { id: 4, name: 'Date', price: 100, stock: 8 },
      ]);
    });
  });

  describe('文字列プロパティのソート', () => {
    test('正常系: 名前で昇順ソート', () => {
      const result = sortByProperty(sampleProducts, 'name', 'asc');

      expect(result).toEqual([
        { id: 2, name: 'Apple', price: 100, stock: 5 },
        { id: 1, name: 'Banana', price: 120, stock: 10 },
        { id: 3, name: 'Cherry', price: 150, stock: 3 },
        { id: 4, name: 'Date', price: 100, stock: 8 },
      ]);
    });

    test('正常系: 名前で降順ソート', () => {
      const result = sortByProperty(sampleProducts, 'name', 'desc');

      expect(result).toEqual([
        { id: 4, name: 'Date', price: 100, stock: 8 },
        { id: 3, name: 'Cherry', price: 150, stock: 3 },
        { id: 1, name: 'Banana', price: 120, stock: 10 },
        { id: 2, name: 'Apple', price: 100, stock: 5 },
      ]);
    });
  });

  describe('デフォルト引数', () => {
    test('正常系: orderを省略すると昇順になる', () => {
      const result = sortByProperty(sampleProducts, 'price');

      expect(result).toEqual([
        { id: 2, name: 'Apple', price: 100, stock: 5 },
        { id: 4, name: 'Date', price: 100, stock: 8 },
        { id: 1, name: 'Banana', price: 120, stock: 10 },
        { id: 3, name: 'Cherry', price: 150, stock: 3 },
      ]);
    });
  });

  describe('非破壊的な動作', () => {
    test('正常系: 元の配列を変更しない', () => {
      const original = [...sampleProducts];

      sortByProperty(sampleProducts, 'price', 'asc');

      expect(sampleProducts).toEqual(original);
    });

    test('正常系: 新しい配列を返す', () => {
      const result = sortByProperty(sampleProducts, 'price', 'asc');

      expect(result).not.toBe(sampleProducts);
    });
  });

  describe('エッジケース', () => {
    test('エッジケース: 空の配列', () => {
      const empty: Product[] = [];
      const result = sortByProperty(empty, 'price', 'asc');

      expect(result).toEqual([]);
    });

    test('エッジケース: 単一要素の配列', () => {
      const single: Product[] = [
        { id: 1, name: 'Apple', price: 100, stock: 5 },
      ];
      const result = sortByProperty(single, 'price', 'asc');

      expect(result).toEqual(single);
    });

    test('エッジケース: すべて同じ値のプロパティ', () => {
      const samePrice: Product[] = [
        { id: 1, name: 'Apple', price: 100, stock: 5 },
        { id: 2, name: 'Banana', price: 100, stock: 10 },
        { id: 3, name: 'Cherry', price: 100, stock: 3 },
      ];
      const result = sortByProperty(samePrice, 'price', 'asc');

      expect(result.every((p) => p.price === 100)).toBe(true);
    });
  });

  describe('readonly配列の扱い', () => {
    test('正常系: readonly配列を受け取っても正しく動作する', () => {
      const readonlyProducts: readonly Product[] = sampleProducts;
      const result = sortByProperty(readonlyProducts, 'price', 'asc');

      expect(result).toEqual([
        { id: 2, name: 'Apple', price: 100, stock: 5 },
        { id: 4, name: 'Date', price: 100, stock: 8 },
        { id: 1, name: 'Banana', price: 120, stock: 10 },
        { id: 3, name: 'Cherry', price: 150, stock: 3 },
      ]);
    });
  });

  describe('実践的なケース', () => {
    test('実践: 在庫切れ商品を最後に表示', () => {
      const products: Product[] = [
        { id: 1, name: 'Apple', price: 100, stock: 5 },
        { id: 2, name: 'Banana', price: 120, stock: 0 },
        { id: 3, name: 'Cherry', price: 150, stock: 3 },
        { id: 4, name: 'Date', price: 100, stock: 0 },
      ];

      const result = sortByProperty(products, 'stock', 'desc');

      expect(result[0]!.stock).toBeGreaterThan(0);
      expect(result[1]!.stock).toBeGreaterThan(0);
      expect(result[2]!.stock).toBe(0);
      expect(result[3]!.stock).toBe(0);
    });

    test('実践: 高額商品から順に表示', () => {
      const result = sortByProperty(sampleProducts, 'price', 'desc');

      expect(result[0]!.price).toBeGreaterThanOrEqual(result[1]!.price);
      expect(result[1]!.price).toBeGreaterThanOrEqual(result[2]!.price);
      expect(result[2]!.price).toBeGreaterThanOrEqual(result[3]!.price);
    });

    test('実践: 商品名のアルファベット順に表示', () => {
      const result = sortByProperty(sampleProducts, 'name', 'asc');

      expect(result[0]!.name).toBe('Apple');
      expect(result[1]!.name).toBe('Banana');
      expect(result[2]!.name).toBe('Cherry');
      expect(result[3]!.name).toBe('Date');
    });
  });
});
