/**
 * Day01: 型ガードとバリデーション
 * TODO: この関数を実装してください
 */

export type User = {
  id: string;
  age: number;
};

export type Result<T> = { ok: true; value: T } | { ok: false; error: string };

export function parseUser(input: unknown): Result<User> {
  // ===== ステップ1: オブジェクトかチェック =====
  // inputがオブジェクトでない、またはnullの場合
  // return { ok: false, error: "Input must be an object" };

  // TODO: ここにステップ1のコードを書く

  // ===== ステップ2: idプロパティのチェック =====
  // idプロパティが存在しない場合
  // return { ok: false, error: "Missing required property: id" };

  // idが文字列でない場合
  // return { ok: false, error: "Property 'id' must be a string" };

  // TODO: ここにステップ2のコードを書く

  // ===== ステップ3: ageプロパティのチェック =====
  // ageプロパティが存在しない場合
  // return { ok: false, error: "Missing required property: age" };

  // ageが数値でない場合
  // return { ok: false, error: "Property 'age' must be a number" };

  // TODO: ここにステップ3のコードを書く

  // ===== ステップ4: 成功を返す =====
  // すべてのチェックが通ったら、Userオブジェクトを返す
  // return { ok: true, value: { id: input.id, age: input.age } };

  // TODO: ここにステップ4のコードを書く

  throw new Error('Not implemented');
}
