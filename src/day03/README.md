# Day03: オプショナル型とnullish

## 学習目標

- `undefined`と`null`の違いを理解する
- Optional Chaining (`?.`) の使い方を学ぶ
- Nullish Coalescing (`??`) の使い方を学ぶ
- オプショナルなプロパティを安全に扱う方法を習得する

## 背景知識

### undefined vs null

TypeScriptでは、値が存在しない状態を表す2つの特別な値があります。

```typescript
let value1: string | undefined = undefined; // 値が未定義
let value2: string | null = null; // 値が意図的に空

// オプショナルプロパティは自動的に undefined になる
type User = {
  name: string;
  age?: number; // age: number | undefined と同じ
};

const user: User = { name: 'Alice' };
console.log(user.age); // => undefined
```

**重要なポイント:**

- `undefined`: 値がまだ設定されていない（初期化されていない）
- `null`: 値が意図的に「空」であることを示す
- オプショナルプロパティ（`?`）は自動的に `| undefined` を含む

### Optional Chaining (`?.`)

ネストしたオブジェクトのプロパティに安全にアクセスできます。

```typescript
type Address = {
  city: string;
  zipCode?: string;
};

type User = {
  name: string;
  address?: Address;
};

const user1: User = {
  name: 'Alice',
  address: { city: 'Tokyo', zipCode: '100-0001' },
};

const user2: User = {
  name: 'Bob',
  // address がない
};

// Optional Chaining を使わない場合
const zipCode1 = user1.address ? user1.address.zipCode : undefined;
const zipCode2 = user2.address ? user2.address.zipCode : undefined;

// Optional Chaining を使う場合
const zipCode3 = user1.address?.zipCode; // => '100-0001'
const zipCode4 = user2.address?.zipCode; // => undefined（エラーにならない！）
```

**重要なポイント:**

- `?.` の前の値が `null` または `undefined` の場合、`undefined` を返す
- エラーを防ぎながら安全にネストしたプロパティにアクセスできる

### Nullish Coalescing (`??`)

`null` または `undefined` のときのみデフォルト値を使います。

```typescript
const value1 = null ?? 'default'; // => 'default'
const value2 = undefined ?? 'default'; // => 'default'
const value3 = 0 ?? 'default'; // => 0（0 は nullish ではない！）
const value4 = '' ?? 'default'; // => ''（空文字は nullish ではない！）
const value5 = false ?? 'default'; // => false（false は nullish ではない！）
```

**`||` との違い:**

```typescript
// || は falsy な値すべてでデフォルト値を返す
const a = 0 || 10; // => 10
const b = '' || 'default'; // => 'default'
const c = false || true; // => true

// ?? は null/undefined のときだけデフォルト値を返す
const x = 0 ?? 10; // => 0
const y = '' ?? 'default'; // => ''
const z = false ?? true; // => false
```

**重要なポイント:**

- `??` は `null` と `undefined` のみを「nullish」として扱う
- `0`, `''`, `false` は nullish ではないので、そのまま返される
- デフォルト値が必要な場合は `??` の方が安全

### Optional Chaining と Nullish Coalescing の組み合わせ

```typescript
type Config = {
  timeout?: number;
  retries?: number;
};

const config1: Config = { timeout: 3000 };
const config2: Config = { timeout: 0 }; // 0 は有効な値
const config3: Config = {};

// timeout が存在しない場合は 5000 をデフォルト値にする
const timeout1 = config1.timeout ?? 5000; // => 3000
const timeout2 = config2.timeout ?? 5000; // => 0（0 は有効な値なので保持）
const timeout3 = config3.timeout ?? 5000; // => 5000
```

## 問題: `getProperty`の実装

### 要件

オブジェクトから指定されたキーの値を安全に取得する関数を実装してください。

- 入力:
  - `obj`: `Record<string, unknown> | null | undefined` - 対象のオブジェクト（null/undefined の可能性あり）
  - `key`: `string` - 取得したいプロパティのキー
  - `defaultValue`: `string` - プロパティが存在しないときのデフォルト値
- 出力: `string` - プロパティの値、または デフォルト値

### 成功条件

以下の条件を満たす場合、プロパティの値を返します:

1. `obj` が `null` でも `undefined` でもない
2. `obj` に `key` のプロパティが存在する
3. そのプロパティの値が `string` 型である

それ以外の場合は `defaultValue` を返します。

### 実装ステップ

```typescript
export function getProperty(
  obj: Record<string, unknown> | null | undefined,
  key: string,
  defaultValue: string
): string {
  // Step 1: オブジェクトから値を安全に取得
  // Optional Chaining を使って obj[key] にアクセス

  // Step 2: 値が string 型かチェック
  // typeof を使って型ガード

  // Step 3: 条件に応じて値またはデフォルト値を返す
  // Nullish Coalescing を活用
}
```

### テスト例

```typescript
// 成功ケース: プロパティが存在して string 型
getProperty({ name: 'Alice', age: 30 }, 'name', 'Unknown');
// => 'Alice'

// オブジェクトが null
getProperty(null, 'name', 'Unknown');
// => 'Unknown'

// プロパティが存在しない
getProperty({ age: 30 }, 'name', 'Unknown');
// => 'Unknown'

// プロパティが string 型ではない
getProperty({ name: 123 }, 'name', 'Unknown');
// => 'Unknown'

// 値が空文字列（有効な値として扱う）
getProperty({ name: '' }, 'name', 'Unknown');
// => ''
```

## ヒント

### ヒント1: Optional Chaining でプロパティアクセス

```typescript
// obj が null/undefined でもエラーにならない
const value = obj?.[key];
```

### ヒント2: 型ガードで string かチェック

```typescript
if (typeof value === 'string') {
  // ここでは value は string 型として扱われる
  return value;
}
```

### ヒント3: すべてを組み合わせる

```typescript
// 1. Optional Chaining で安全に取得
const value = obj?.[key];

// 2. string 型ならその値、そうでなければ undefined
const stringValue = typeof value === 'string' ? value : undefined;

// 3. Nullish Coalescing でデフォルト値を適用
return stringValue ?? defaultValue;
```

**注意:** 空文字列 `''` は有効な string 値なので、デフォルト値に置き換えてはいけません。

## 学習のポイント

1. **Optional Chaining の重要性**: `obj` が `null` や `undefined` でもエラーが発生しない
2. **Nullish Coalescing の使い分け**: `||` ではなく `??` を使うことで、`0` や `''` を有効な値として扱える
3. **型ガードとの組み合わせ**: `typeof` で型を確認してから値を使う
4. **安全なプロパティアクセス**: 実務では常に値が存在するとは限らないので、防御的なコードが重要

## 次のステップ

この問題ができたら:

- テストを書いて動作確認する
- `npm test` を実行して確認
- `obj?.[key]` の代わりに `obj && obj[key]` で書いた場合の違いを考えてみる
- ネストしたオブジェクト（`obj?.nested?.deep?.property`）でも試してみる
