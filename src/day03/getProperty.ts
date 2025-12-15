/**
 * Day03: オプショナル型とnullish
 * TODO: この関数を実装してください
 */

/**
 * オブジェクトから指定されたキーの値を安全に取得する関数
 *
 * @param obj - 対象のオブジェクト（null/undefined の可能性あり）
 * @param key - 取得したいプロパティのキー
 * @param defaultValue - プロパティが存在しないときのデフォルト値
 * @returns プロパティの値、またはデフォルト値
 */
export function getProperty(
  obj: Record<string, unknown> | null | undefined,
  key: string,
  defaultValue: string
): string {
  // ===== ステップ1: オブジェクトから値を安全に取得 =====
  // obj が null または undefined の場合でもエラーにならないように
  // Optional Chaining (?.) を使ってプロパティにアクセスする
  // obj?.[key] は obj が nullish なら undefined を返す

  // TODO: ここにステップ1のコードを書く

  // ===== ステップ2: 値が string 型かチェック =====
  // 取得した値が string 型であることを確認する
  // typeof 演算子を使って型ガードを実装
  // string 型でない場合（number, boolean, object など）は undefined にする

  // TODO: ここにステップ2のコードを書く

  // ===== ステップ3: 条件に応じて値またはデフォルト値を返す =====
  // string 型の値が存在すれば、その値を返す
  // 存在しない（undefined）場合は、defaultValue を返す
  // Nullish Coalescing (??) を使うと、null/undefined のときだけデフォルト値を使える
  // 注意: 空文字列 '' は有効な値なので、デフォルト値に置き換えてはいけない

  // TODO: ここにステップ3のコードを書く

  throw new Error('Not implemented');
}
