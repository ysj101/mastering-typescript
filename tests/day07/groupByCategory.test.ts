/**
 * Day07: groupByCategoryのテスト
 */

import { groupByCategory, Product } from '../../solutions/day07/groupByCategory';

describe('groupByCategory', () => {
  test('正常系: 複数のカテゴリでグループ化', () => {
    const products: Product[] = [
      { id: 1, name: 'Apple', category: 'Fruit', price: 100 },
      { id: 2, name: 'Carrot', category: 'Vegetable', price: 80 },
      { id: 3, name: 'Banana', category: 'Fruit', price: 120 },
      { id: 4, name: 'Spinach', category: 'Vegetable', price: 90 },
    ];

    const result = groupByCategory(products);

    expect(result.size).toBe(2);
    expect(result.get('Fruit')).toEqual([
      { id: 1, name: 'Apple', category: 'Fruit', price: 100 },
      { id: 3, name: 'Banana', category: 'Fruit', price: 120 },
    ]);
    expect(result.get('Vegetable')).toEqual([
      { id: 2, name: 'Carrot', category: 'Vegetable', price: 80 },
      { id: 4, name: 'Spinach', category: 'Vegetable', price: 90 },
    ]);
  });

  test('正常系: 単一カテゴリのみ', () => {
    const products: Product[] = [
      { id: 1, name: 'Apple', category: 'Fruit', price: 100 },
      { id: 2, name: 'Banana', category: 'Fruit', price: 120 },
      { id: 3, name: 'Orange', category: 'Fruit', price: 110 },
    ];

    const result = groupByCategory(products);

    expect(result.size).toBe(1);
    expect(result.get('Fruit')).toEqual([
      { id: 1, name: 'Apple', category: 'Fruit', price: 100 },
      { id: 2, name: 'Banana', category: 'Fruit', price: 120 },
      { id: 3, name: 'Orange', category: 'Fruit', price: 110 },
    ]);
  });

  test('正常系: 各カテゴリに1つずつの商品', () => {
    const products: Product[] = [
      { id: 1, name: 'Apple', category: 'Fruit', price: 100 },
      { id: 2, name: 'Carrot', category: 'Vegetable', price: 80 },
      { id: 3, name: 'Chicken', category: 'Meat', price: 300 },
    ];

    const result = groupByCategory(products);

    expect(result.size).toBe(3);
    expect(result.get('Fruit')).toEqual([
      { id: 1, name: 'Apple', category: 'Fruit', price: 100 },
    ]);
    expect(result.get('Vegetable')).toEqual([
      { id: 2, name: 'Carrot', category: 'Vegetable', price: 80 },
    ]);
    expect(result.get('Meat')).toEqual([
      { id: 3, name: 'Chicken', category: 'Meat', price: 300 },
    ]);
  });

  test('エッジケース: 空の配列', () => {
    const products: Product[] = [];

    const result = groupByCategory(products);

    expect(result.size).toBe(0);
    expect(result).toEqual(new Map());
  });

  test('エッジケース: カテゴリの順序は最初の登場順を保つ', () => {
    const products: Product[] = [
      { id: 1, name: 'Carrot', category: 'Vegetable', price: 80 },
      { id: 2, name: 'Apple', category: 'Fruit', price: 100 },
      { id: 3, name: 'Chicken', category: 'Meat', price: 300 },
      { id: 4, name: 'Spinach', category: 'Vegetable', price: 90 },
    ];

    const result = groupByCategory(products);

    // Mapのキーの順序を確認
    const categories = Array.from(result.keys());
    expect(categories).toEqual(['Vegetable', 'Fruit', 'Meat']);
  });

  test('正常系: 同じ商品が複数回登場する場合', () => {
    const products: Product[] = [
      { id: 1, name: 'Apple', category: 'Fruit', price: 100 },
      { id: 1, name: 'Apple', category: 'Fruit', price: 100 },
    ];

    const result = groupByCategory(products);

    expect(result.size).toBe(1);
    expect(result.get('Fruit')).toEqual([
      { id: 1, name: 'Apple', category: 'Fruit', price: 100 },
      { id: 1, name: 'Apple', category: 'Fruit', price: 100 },
    ]);
  });
});
