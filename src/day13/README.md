# Day13: Mapped Types（マップ型）

## 学習目標

- Mapped Typesの基本構文を理解する
- 既存の型から新しい型を生成する方法を習得する
- `Partial<T>`や`Readonly<T>`のような組み込みユーティリティ型の仕組みを理解する

## 背景知識

### Mapped Typesとは

Mapped Typesは、既存の型のプロパティを反復処理して、新しい型を生成するTypeScriptの機能です。オブジェクトの全プロパティに対して一括で型変換を適用できます。

```typescript
type User = {
  id: number;
  name: string;
  email: string;
};

// すべてのプロパティをオプショナルにする
type PartialUser = {
  id?: number;
  name?: string;
  email?: string;
};
```

上記のように手動で書く代わりに、Mapped Typesを使うと自動化できます。

### Mapped Typesの基本構文

```typescript
type MappedType<T> = {
  [K in keyof T]: T[K];
};
```

構文の説明：
- `K in keyof T` - Tのすべてのキーを反復処理
- `K` - 現在のプロパティ名
- `T[K]` - 現在のプロパティの型
- `keyof T` - Tのすべてのプロパティ名のユニオン型

### 具体例

```typescript
type User = {
  id: number;
  name: string;
};

// keyof User => "id" | "name"

type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};
// 結果:
// {
//   readonly id: number;
//   readonly name: string;
// }
```

### プロパティの修飾子

Mapped Typesでは、プロパティに修飾子を追加・削除できます：

```typescript
// オプショナルにする
type Optional<T> = {
  [K in keyof T]?: T[K];
};

// readonlyにする
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

// オプショナルを削除する（-?）
type Required<T> = {
  [K in keyof T]-?: T[K];
};

// readonlyを削除する（-readonly）
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};
```

### 型の変換

プロパティの型も変換できます：

```typescript
type User = {
  id: number;
  name: string;
  age: number;
};

// すべてのプロパティを文字列型に変換
type StringifiedUser = {
  [K in keyof User]: string;
};
// 結果:
// {
//   id: string;
//   name: string;
//   age: string;
// }
```

## 問題: MyPartialとMyReadonlyの実装

### 要件

TypeScriptの組み込みユーティリティ型である`Partial<T>`と`Readonly<T>`を自分で実装してください。

- `MyPartial<T>` - Tのすべてのプロパティをオプショナルにする
- `MyReadonly<T>` - Tのすべてのプロパティをreadonlyにする

### 実装する型

```typescript
type MyPartial<T> = {
  // ここを実装
};

type MyReadonly<T> = {
  // ここを実装
};
```

### 成功条件

以下のテスト型がエラーなくコンパイルできること：

```typescript
type User = {
  id: number;
  name: string;
  email: string;
};

// MyPartialのテスト
type PartialUser = MyPartial<User>;
// 期待される型:
// {
//   id?: number;
//   name?: string;
//   email?: string;
// }

const partialUser: PartialUser = { name: 'Alice' }; // OK

// MyReadonlyのテスト
type ReadonlyUser = MyReadonly<User>;
// 期待される型:
// {
//   readonly id: number;
//   readonly name: string;
//   readonly email: string;
// }

const readonlyUser: ReadonlyUser = { id: 1, name: 'Bob', email: 'bob@example.com' };
// readonlyUser.id = 2; // エラー: Cannot assign to 'id' because it is a read-only property
```

### 実装ステップ

```typescript
// Step 1: MyPartialを実装
// - `[K in keyof T]`でTのすべてのキーを反復
// - `?`修飾子を使ってオプショナルにする
// - 型は`T[K]`のまま

type MyPartial<T> = {
  // ここを実装
};

// Step 2: MyReadonlyを実装
// - `[K in keyof T]`でTのすべてのキーを反復
// - `readonly`修飾子を追加
// - 型は`T[K]`のまま

type MyReadonly<T> = {
  // ここを実装
};
```

### テスト例

```typescript
type Product = {
  id: number;
  name: string;
  price: number;
};

// MyPartialのテスト
type PartialProduct = MyPartial<Product>;
const product1: PartialProduct = {}; // OK（すべてオプショナル）
const product2: PartialProduct = { name: 'Book' }; // OK
const product3: PartialProduct = { id: 1, name: 'Pen', price: 100 }; // OK

// MyReadonlyのテスト
type ReadonlyProduct = MyReadonly<Product>;
const product4: ReadonlyProduct = { id: 1, name: 'Book', price: 500 };
// product4.price = 600; // エラー: Cannot assign to 'price' because it is a read-only property
```

## ヒント

### ヒント1: Mapped Typesの基本構文

```typescript
type Example<T> = {
  [K in keyof T]: T[K];
};
```

これは元の型をそのままコピーします。ここに修飾子を追加していきます。

### ヒント2: オプショナル修飾子

プロパティ名の後ろに`?`を付けると、そのプロパティがオプショナルになります。

```typescript
{
  [K in keyof T]?: ... // オプショナル
}
```

### ヒント3: readonly修飾子

プロパティ名の前に`readonly`を付けると、そのプロパティが読み取り専用になります。

```typescript
{
  readonly [K in keyof T]: ... // 読み取り専用
}
```

### ヒント4: テスト方法

型の動作を確認するには、以下のように使ってみてください：

```typescript
type Test = {
  a: number;
  b: string;
};

type Result = MyPartial<Test>;

// ホバーで型を確認
const test: Result = {};
```

VSCodeでホバーすると、生成された型が表示されます。

## 学習のポイント

1. **Mapped Typesは型レベルのループ**: `[K in keyof T]`は、オブジェクトの`for...in`ループの型版と考えられる

2. **修飾子の追加と削除**: `?`や`readonly`は追加できるだけでなく、`-?`や`-readonly`で削除もできる

3. **組み込みユーティリティ型の仕組み**: TypeScriptの`Partial<T>`や`Readonly<T>`も、内部ではMapped Typesを使って実装されている

4. **再利用可能な型変換**: 一度Mapped Typeを定義すれば、どんな型にも適用できる

```typescript
type User = { id: number; name: string };
type Product = { id: number; price: number };

type PartialUser = MyPartial<User>;
type PartialProduct = MyPartial<Product>; // 同じ型を再利用
```

## 次のステップ

この問題ができたら：

- テストを書いて動作確認する
- `npm test`を実行して確認
- 他のユーティリティ型を実装してみる（`Required<T>`, `Pick<T, K>`, `Omit<T, K>`など）
- Mapped Typesと条件型を組み合わせた応用問題に挑戦する
