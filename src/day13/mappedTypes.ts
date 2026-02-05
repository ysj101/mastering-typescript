/**
 * Day13: Mapped Types（マップ型）
 * TODO: この型定義を実装してください
 */

// ===== ステップ1: MyPartialの実装 =====
// Mapped Typesを使って、Tのすべてのプロパティをオプショナルにする
//
// 実装のヒント:
// - `[K in keyof T]`でTのすべてのキーを反復処理
// - プロパティ名の後ろに`?`を付けてオプショナルにする
// - 型は`T[K]`のまま保持

// TODO: ここにMyPartial<T>の実装を書く
export type MyPartial<T> = T; // TODO: Mapped Typesを使って実装してください

// ===== ステップ2: MyReadonlyの実装 =====
// Mapped Typesを使って、Tのすべてのプロパティをreadonlyにする
//
// 実装のヒント:
// - `[K in keyof T]`でTのすべてのキーを反復処理
// - プロパティ名の前に`readonly`を付けて読み取り専用にする
// - 型は`T[K]`のまま保持

// TODO: ここにMyReadonly<T>の実装を書く
export type MyReadonly<T> = T; // TODO: Mapped Typesを使って実装してください

// ===== テスト用の型定義 =====
// これらは実装確認用です。実装後にコメントを外してテストしてください。

// type User = {
//   id: number;
//   name: string;
//   email: string;
// };

// // MyPartialのテスト
// type PartialUser = MyPartial<User>;
// const partialUser: PartialUser = { name: 'Alice' }; // すべてオプショナル

// // MyReadonlyのテスト
// type ReadonlyUser = MyReadonly<User>;
// const readonlyUser: ReadonlyUser = { id: 1, name: 'Bob', email: 'bob@example.com' };
// // readonlyUser.id = 2; // エラーになるはず: Cannot assign to 'id' because it is a read-only property
