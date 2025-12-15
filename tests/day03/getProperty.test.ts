/**
 * Day03: getProperty のテスト
 */

import { getProperty } from '../../solutions/day03/getProperty';

describe('getProperty', () => {
  test('正常系: プロパティが存在して string 型の場合、その値を返す', () => {
    const obj = { name: 'Alice', age: 30 };
    const result = getProperty(obj, 'name', 'Unknown');
    expect(result).toBe('Alice');
  });

  test('正常系: 値が空文字列の場合、空文字列を返す（デフォルト値ではない）', () => {
    const obj = { name: '' };
    const result = getProperty(obj, 'name', 'Unknown');
    expect(result).toBe('');
  });

  test('異常系: オブジェクトが null の場合、デフォルト値を返す', () => {
    const result = getProperty(null, 'name', 'Unknown');
    expect(result).toBe('Unknown');
  });

  test('異常系: オブジェクトが undefined の場合、デフォルト値を返す', () => {
    const result = getProperty(undefined, 'name', 'Unknown');
    expect(result).toBe('Unknown');
  });

  test('異常系: プロパティが存在しない場合、デフォルト値を返す', () => {
    const obj = { age: 30 };
    const result = getProperty(obj, 'name', 'Unknown');
    expect(result).toBe('Unknown');
  });

  test('異常系: プロパティの値が number 型の場合、デフォルト値を返す', () => {
    const obj = { name: 123 };
    const result = getProperty(obj, 'name', 'Unknown');
    expect(result).toBe('Unknown');
  });

  test('異常系: プロパティの値が boolean 型の場合、デフォルト値を返す', () => {
    const obj = { name: true };
    const result = getProperty(obj, 'name', 'Unknown');
    expect(result).toBe('Unknown');
  });

  test('異常系: プロパティの値が object 型の場合、デフォルト値を返す', () => {
    const obj = { name: { firstName: 'Alice' } };
    const result = getProperty(obj, 'name', 'Unknown');
    expect(result).toBe('Unknown');
  });

  test('異常系: プロパティの値が null の場合、デフォルト値を返す', () => {
    const obj = { name: null };
    const result = getProperty(obj, 'name', 'Unknown');
    expect(result).toBe('Unknown');
  });

  test('異常系: プロパティの値が undefined の場合、デフォルト値を返す', () => {
    const obj = { name: undefined };
    const result = getProperty(obj, 'name', 'Unknown');
    expect(result).toBe('Unknown');
  });

  test('エッジケース: 複数のプロパティがあるオブジェクトから特定のプロパティを取得', () => {
    const obj = { name: 'Bob', email: 'bob@example.com', age: 25 };
    const result = getProperty(obj, 'email', 'no-email');
    expect(result).toBe('bob@example.com');
  });

  test('エッジケース: デフォルト値が空文字列の場合', () => {
    const obj = { age: 30 };
    const result = getProperty(obj, 'name', '');
    expect(result).toBe('');
  });
});
