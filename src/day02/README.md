# Day02: 配列のフィルタリング

## 学習目標

- 配列の`filter`メソッドを使った型安全なフィルタリング
- 型ガードを活用した条件分岐
- `undefined`や`null`を含むデータの安全な処理

## 背景知識

### 配列のfilterメソッド

JavaScriptの`filter`メソッドは、配列の各要素に対して条件を適用し、条件を満たす要素のみで新しい配列を作成します。

```typescript
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter((n) => n % 2 === 0);
// => [2, 4]
```

TypeScriptでは、`filter`の結果も正しく型推論されます。

### 型ガードとは

型ガードは、実行時のチェックによって型を絞り込む仕組みです。

```typescript
function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

const mixed: unknown[] = [1, 'hello', 2, null, 3];
const numbers = mixed.filter(isNumber);
// numbersの型は number[]
```

### undefinedとnullの扱い

JavaScriptでは、`undefined`と`null`は異なる値ですが、どちらも「値がない」ことを表します。

```typescript
const values = [1, 2, undefined, 3, null, 4];

// undefinedとnullを除外
const validNumbers = values.filter((v): v is number => v != null);
// validNumbersの型は number[]
```

**ポイント:**

- `v != null`は`v !== null && v !== undefined`と同じ意味
- `v !== null`だけではundefinedは除外されない

## 問題: filterValidの実装

### 要件

ユーザー情報の配列から、有効なユーザーのみをフィルタリングする関数`filterValid`を実装してください。

- 入力: `User[]` - ユーザー情報の配列（一部のフィールドが欠けている可能性がある）
- 出力: `ValidUser[]` - 必須フィールドがすべて揃ったユーザーの配列

### 型定義

```typescript
type User = {
  id: number;
  name?: string;
  email?: string;
  age?: number;
};

type ValidUser = {
  id: number;
  name: string;
  email: string;
  age: number;
};
```

### 成功条件

以下の条件をすべて満たすユーザーのみを含む配列を返す：

1. `name`が存在し、空文字列でない
2. `email`が存在し、空文字列でない
3. `age`が存在し、0以上の数値である

### 実装ステップ

```typescript
export function filterValid(users: User[]): ValidUser[] {
  // Step 1: 配列をfilterメソッドでフィルタリング
  // ヒント: filter((user) => ...)
  // Step 2: 型ガード関数を実装
  // ヒント: name, email, ageがすべて有効かチェック
  // Step 3: 型アサーションまたは型述語を使って型を絞り込む
  // ヒント: user is ValidUser
}
```

### テスト例

```typescript
const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', age: 25 },
  { id: 2, name: 'Bob', email: '', age: 30 }, // emailが空
  { id: 3, name: '', email: 'charlie@example.com', age: 35 }, // nameが空
  { id: 4, name: 'David', email: 'david@example.com' }, // ageが未定義
  { id: 5, name: 'Eve', email: 'eve@example.com', age: -5 }, // ageが負の数
  { id: 6, name: 'Frank', email: 'frank@example.com', age: 40 },
];

filterValid(users);
// => [
//   { id: 1, name: 'Alice', email: 'alice@example.com', age: 25 },
//   { id: 6, name: 'Frank', email: 'frank@example.com', age: 40 }
// ]
```

## ヒント

### ヒント1: 型ガード関数の実装

```typescript
function isValidUser(user: User): user is ValidUser {
  // name, email, ageの条件をすべてチェック
  return (
    user.name !== undefined &&
    user.name !== '' &&
    // 残りの条件を追加...
  );
}
```

### ヒント2: filterと組み合わせる

```typescript
export function filterValid(users: User[]): ValidUser[] {
  return users.filter(isValidUser);
}
```

型ガード関数（`user is ValidUser`）を使うことで、filterの結果が自動的に`ValidUser[]`型になります。

### ヒント3: 条件の組み合わせ

複数の条件は`&&`（AND演算子）でつなげます：

```typescript
condition1 && condition2 && condition3;
```

すべての条件が`true`のときだけ全体が`true`になります。

## 学習のポイント

1. **型ガード関数の威力**: `user is ValidUser`という型述語を使うことで、filterの結果の型が自動的に絞り込まれる
2. **undefinedチェック**: `user.name !== undefined`でundefinedを除外してから、さらに`!== ''`で空文字列を除外
3. **数値の検証**: `age`は存在するだけでなく、`>= 0`という条件も必要

## 次のステップ

この問題ができたら：

- テストを書いて動作確認する
- `npm test`を実行して確認
- より複雑な条件（メールアドレスの形式チェックなど）を追加してみる
- 他の配列メソッド（`map`, `reduce`）と組み合わせてみる
