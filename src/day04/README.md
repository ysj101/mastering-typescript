# Day04: 配列の変換

## 学習目標

- `Array.map()` の使い方を理解する
- map関数での型推論を学ぶ
- `readonly` 配列の扱い方を習得する
- 配列の要素から特定のプロパティを抽出する方法を学ぶ

## 背景知識

### Array.map() の基本

`map()` は配列の各要素を変換して新しい配列を作成します。

```typescript
const numbers = [1, 2, 3, 4, 5];

// 各要素を2倍にする
const doubled = numbers.map((n) => n * 2);
// => [2, 4, 6, 8, 10]

// 各要素を文字列に変換
const strings = numbers.map((n) => `Number: ${n}`);
// => ['Number: 1', 'Number: 2', ...]
```

**重要なポイント:**

- 元の配列は変更されない（イミュータブル）
- 新しい配列を返す
- 配列の長さは変わらない（要素数は同じ）

### オブジェクト配列のmap

実務では、オブジェクトの配列から特定のプロパティだけを抽出することがよくあります。

```typescript
type User = {
  id: number;
  name: string;
  email: string;
  age: number;
};

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', age: 30 },
  { id: 2, name: 'Bob', email: 'bob@example.com', age: 25 },
];

// 名前だけを抽出
const names = users.map((user) => user.name);
// => ['Alice', 'Bob']
// 型: string[]

// IDと名前のペアを抽出
const pairs = users.map((user) => ({ id: user.id, name: user.name }));
// => [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
// 型: { id: number; name: string; }[]
```

**重要なポイント:**

- TypeScriptは自動的に戻り値の型を推論する
- プロパティアクセス時に型安全性が保証される
- 存在しないプロパティにアクセスするとコンパイルエラーになる

### 型推論の仕組み

```typescript
type Product = {
  id: number;
  name: string;
  price: number;
};

const products: Product[] = [
  { id: 1, name: 'Laptop', price: 1000 },
  { id: 2, name: 'Mouse', price: 20 },
];

// TypeScript は map の戻り値の型を自動的に推論する
const prices = products.map((p) => p.price);
// TypeScript が推論した型: number[]

const descriptions = products.map((p) => `${p.name}: $${p.price}`);
// TypeScript が推論した型: string[]
```

**重要なポイント:**

- map関数のコールバック関数の戻り値から配列の型が推論される
- `p.price` → `number` なので `number[]` になる
- 明示的な型注釈は通常不要（TypeScriptが推論してくれる）

### readonly 配列

`readonly` を使うと、配列を変更不可能（イミュータブル）にできます。

```typescript
// 通常の配列
const mutableArray: number[] = [1, 2, 3];
mutableArray.push(4); // OK
mutableArray[0] = 10; // OK

// readonly 配列
const readonlyArray: readonly number[] = [1, 2, 3];
readonlyArray.push(4); // ❌ コンパイルエラー: push は存在しない
readonlyArray[0] = 10; // ❌ コンパイルエラー: 代入できない

// しかし、map は使える（新しい配列を返すから）
const doubled = readonlyArray.map((n) => n * 2); // ✅ OK
// doubled の型: number[]（readonly ではない）
```

**重要なポイント:**

- `readonly` 配列は変更メソッド（`push`, `pop`, `splice` など）が使えない
- インデックスでの代入もできない
- 非破壊的メソッド（`map`, `filter`, `slice` など）は使える
- 戻り値は通常の配列（`readonly` ではない）

### readonly 配列の型定義

```typescript
// 型エイリアスでの定義
type User = {
  readonly id: number;
  name: string;
};

type Users = readonly User[];

// または ReadonlyArray<T> を使う
const users: ReadonlyArray<User> = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

// map は問題なく動作
const names = users.map((u) => u.name); // ✅ OK
```

## 問題: `mapToNames`の実装

### 要件

ユーザーオブジェクトの配列から名前だけを抽出する関数を実装してください。

- 入力: `users` - `readonly User[]` - ユーザーオブジェクトの配列（readonly）
- 出力: `string[]` - ユーザー名の配列

```typescript
type User = {
  readonly id: number;
  name: string;
  email: string;
};
```

### 成功条件

1. すべてのユーザーの `name` プロパティを抽出する
2. 元の配列の順序を保つ
3. 空の配列が渡された場合は空の配列を返す
4. `readonly` 配列を正しく扱う

### 実装ステップ

```typescript
export function mapToNames(users: readonly User[]): string[] {
  // Step 1: Array.map() を使って各ユーザーから name プロパティを抽出
  // users.map((user) => ...)

  // Step 2: TypeScript の型推論を確認
  // 戻り値の型が string[] になっているか確認

  // ヒント: たった1行で実装できます！
}
```

### テスト例

```typescript
// 通常のケース
mapToNames([
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
]);
// => ['Alice', 'Bob', 'Charlie']

// 空の配列
mapToNames([]);
// => []

// 単一要素
mapToNames([{ id: 1, name: 'Alice', email: 'alice@example.com' }]);
// => ['Alice']
```

## ヒント

### ヒント1: map の基本的な使い方

```typescript
// 配列の各要素に対して関数を適用
const result = array.map((element) => {
  // 何かを返す
  return transformedValue;
});
```

### ヒント2: プロパティへのアクセス

```typescript
// オブジェクトから name プロパティを取得
const name = user.name;

// map と組み合わせる
const names = users.map((user) => user.name);
```

### ヒント3: アロー関数の短縮形

```typescript
// 通常の書き方
users.map((user) => {
  return user.name;
});

// 短縮形（return を省略）
users.map((user) => user.name);
```

### ヒント4: readonly 配列の扱い

```typescript
// readonly 配列でも map は使える
const readonlyArray: readonly number[] = [1, 2, 3];
const result = readonlyArray.map((n) => n * 2); // ✅ OK

// 戻り値は通常の配列（readonly ではない）
result.push(10); // ✅ OK
```

## 学習のポイント

1. **map の理解**: 配列の変換には `map` を使う（`forEach` ではない）
2. **型推論**: TypeScriptは `map` のコールバックの戻り値から配列の型を推論する
3. **readonly の意味**: 配列を変更できないようにする（安全性の向上）
4. **イミュータブル操作**: `map` は元の配列を変更せず、新しい配列を返す

## よくある間違い

### 間違い1: forEach を使ってしまう

```typescript
// ❌ 間違い: forEach は値を返さない
function mapToNames(users: readonly User[]): string[] {
  const names: string[] = [];
  users.forEach((user) => {
    names.push(user.name);
  });
  return names;
}

// ✅ 正解: map を使う
function mapToNames(users: readonly User[]): string[] {
  return users.map((user) => user.name);
}
```

### 間違い2: 型注釈を過剰に書く

```typescript
// ❌ 不要: TypeScript は型を推論できる
const names: string[] = users.map((user: User): string => user.name);

// ✅ シンプル: 型推論に任せる
const names = users.map((user) => user.name);
```

### 間違い3: readonly 配列を通常の配列として扱う

```typescript
// ❌ エラー: readonly 配列は変更できない
function badFunction(users: readonly User[]): void {
  users.push({ id: 4, name: 'Dave', email: 'dave@example.com' }); // コンパイルエラー
}

// ✅ 正解: 新しい配列を作成する
function goodFunction(users: readonly User[]): User[] {
  return [...users, { id: 4, name: 'Dave', email: 'dave@example.com' }];
}
```

## 発展課題

この問題ができたら、以下にも挑戦してみましょう:

1. **複数のプロパティを抽出**: `name` と `email` のペアを抽出する関数
2. **条件付き変換**: 特定の条件を満たすユーザーだけ変換する
3. **ネストしたプロパティ**: オブジェクトがネストしている場合の抽出
4. **チェーン**: `filter` と `map` を組み合わせる

```typescript
// 例: IDが偶数のユーザーの名前だけを取得
const evenUserNames = users.filter((u) => u.id % 2 === 0).map((u) => u.name);
```

## 次のステップ

この問題ができたら:

- `npm test` を実行して確認
- `npm run typecheck` で型エラーがないか確認
- Day05に進んで、さらに複雑なオブジェクト変換に挑戦
