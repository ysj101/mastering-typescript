/**
 * Day01: parseUser関数のテスト
 */

import { parseUser } from '../../solutions/day01/parseUser';

describe('parseUser', () => {
  test('正常系: 正しいUserオブジェクトをパースできる', () => {
    const result = parseUser({ id: "user123", age: 25 });
    expect(result).toEqual({ ok: true, value: { id: "user123", age: 25 } });
  });

  test('正常系: 余分なプロパティがあっても成功する', () => {
    const result = parseUser({ id: "user456", age: 30, extra: "ignored" });
    expect(result).toEqual({ ok: true, value: { id: "user456", age: 30 } });
  });

  test('異常系: オブジェクトでない場合はエラーを返す', () => {
    const result = parseUser("not an object");
    expect(result).toEqual({ ok: false, error: "Input must be an object" });
  });

  test('異常系: nullの場合はエラーを返す', () => {
    const result = parseUser(null);
    expect(result).toEqual({ ok: false, error: "Input must be an object" });
  });

  test('異常系: idプロパティが欠落している場合はエラーを返す', () => {
    const result = parseUser({ age: 25 });
    expect(result).toEqual({ ok: false, error: "Missing required property: id" });
  });

  test('異常系: idが文字列でない場合はエラーを返す', () => {
    const result = parseUser({ id: 123, age: 25 });
    expect(result).toEqual({ ok: false, error: "Property 'id' must be a string" });
  });

  test('異常系: ageプロパティが欠落している場合はエラーを返す', () => {
    const result = parseUser({ id: "user123" });
    expect(result).toEqual({ ok: false, error: "Missing required property: age" });
  });

  test('異常系: ageが数値でない場合はエラーを返す', () => {
    const result = parseUser({ id: "user123", age: "25" });
    expect(result).toEqual({ ok: false, error: "Property 'age' must be a number" });
  });
});
