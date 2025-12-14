# Day01: 型ガードとバリデーション

## 学習目標

- `unknown`型の安全な使い方を理解する
- 型ガード（type guard）を使った型の絞り込みを習得する
- Result型パターンを使ったエラーハンドリングを学ぶ

## 背景知識

### unknown型とは

`unknown`型は、TypeScriptで「何の型か分からない値」を表現する型です。`any`型と似ていますが、より安全です。

```typescript
// any型: 何でもできる（危険）
let value1: any = 'hello';
value1.toUpperCase(); // OK（実行時エラーの可能性）

// unknown型: 型チェックが必須（安全）
let value2: unknown = 'hello';
// value2.toUpperCase(); // ❌ エラー: 型が不明
if (typeof value2 === 'string') {
  value2.toUpperCase(); // ✅ OK: 型が絞り込まれた
}
```

**重要**: `unknown`型の値は、型を確認してから使う必要があります。

### 型ガード（Type Guard）

型ガードは、実行時に型をチェックして、TypeScriptに型情報を伝える仕組みです。

```typescript
// typeof による型ガード
function processValue(value: unknown) {
  if (typeof value === 'string') {
    // この中では value は string 型
    return value.toUpperCase();
  }
  if (typeof value === 'number') {
    // この中では value は number 型
    return value.toFixed(2);
  }
}

// in演算子による型ガード
function hasId(obj: unknown): obj is { id: unknown } {
  return typeof obj === 'object' && obj !== null && 'id' in obj;
}
```

**よく使う型ガード**:

- `typeof value === "string"` - 文字列チェック
- `typeof value === "number"` - 数値チェック
- `typeof value === "object"` - オブジェクトチェック
- `"property" in obj` - プロパティ存在チェック
- `Array.isArray(value)` - 配列チェック

### Result型パターン

Result型は、成功/失敗を型安全に表現するパターンです。

```typescript
type Result<T> = { ok: true; value: T } | { ok: false; error: string };

// 成功の場合
const success: Result<number> = {
  ok: true,
  value: 42,
};

// 失敗の場合
const failure: Result<number> = {
  ok: false,
  error: 'Invalid input',
};

// 使い方
function divide(a: number, b: number): Result<number> {
  if (b === 0) {
    return { ok: false, error: 'Division by zero' };
  }
  return { ok: true, value: a / b };
}

const result = divide(10, 2);
if (result.ok) {
  console.log(result.value); // 5
} else {
  console.error(result.error);
}
```

**メリット**:

- 例外を投げずにエラーを扱える
- 型システムでエラー処理を強制できる
- どんなエラーが起こりうるか明確

## 問題: parseUser関数の実装

### 要件

`unknown`型の入力値を受け取り、安全に`User`型にパースする関数を実装してください。

- 入力: `unknown`型の値（何が渡されるか分からない）
- 出力: `Result<User>`型
  - 成功: `{ ok: true, value: User }`
  - 失敗: `{ ok: false, error: string }`

### User型の定義

```typescript
type User = {
  id: string;
  age: number;
};
```

### 成功条件

入力が以下の条件を**すべて**満たす場合、成功として`User`オブジェクトを返す：

1. オブジェクトである（`typeof input === "object"` かつ `input !== null`）
2. `id`プロパティを持つ
3. `id`が文字列型である
4. `age`プロパティを持つ
5. `age`が数値型である

### 失敗条件とエラーメッセージ

条件を満たさない場合は、以下のエラーメッセージを返す：

- オブジェクトでない: `"Input must be an object"`
- `id`が存在しない: `"Missing required property: id"`
- `id`が文字列でない: `"Property 'id' must be a string"`
- `age`が存在しない: `"Missing required property: age"`
- `age`が数値でない: `"Property 'age' must be a number"`

### 実装ステップ

```typescript
export function parseUser(input: unknown): Result<User> {
  // Step 1: inputがオブジェクトかチェック
  // typeof input === "object" && input !== null
  // Step 2: idプロパティの存在と型をチェック
  // "id" in input && typeof input.id === "string"
  // Step 3: ageプロパティの存在と型をチェック
  // "age" in input && typeof input.age === "number"
  // Step 4: すべてのチェックが通ったら成功を返す
  // return { ok: true, value: { id: input.id, age: input.age } };
}
```

### テスト例

```typescript
// 成功ケース
parseUser({ id: 'user123', age: 25 });
// => { ok: true, value: { id: "user123", age: 25 } }

// 失敗ケース1: idが数値
parseUser({ id: 123, age: 25 });
// => { ok: false, error: "Property 'id' must be a string" }

// 失敗ケース2: ageが文字列
parseUser({ id: 'user123', age: '25' });
// => { ok: false, error: "Property 'age' must be a number" }

// 失敗ケース3: プロパティ欠落
parseUser({ id: 'user123' });
// => { ok: false, error: "Missing required property: age" }

// 失敗ケース4: オブジェクトでない
parseUser('not an object');
// => { ok: false, error: "Input must be an object" }
```

## ヒント

### ヒント1: オブジェクトチェックの順序

```typescript
// まずオブジェクトかチェック
if (typeof input !== 'object' || input === null) {
  return { ok: false, error: 'Input must be an object' };
}

// ここまで来たら input は object型（nullでない）
```

**注意**: `typeof null === "object"`なので、必ず`input !== null`もチェックしましょう。

### ヒント2: プロパティの存在チェック

```typescript
// プロパティが存在するかチェック
if (!('id' in input)) {
  return { ok: false, error: 'Missing required property: id' };
}

// 存在することが確認できたら、型をチェック
if (typeof input.id !== 'string') {
  return { ok: false, error: "Property 'id' must be a string" };
}
```

### ヒント3: 型アサーション

型ガードで安全性を確認したら、型アサーションで型を明示できます：

```typescript
// すべてのチェックが通った後
const user: User = {
  id: (input as { id: string }).id,
  age: (input as { age: number }).age,
};
return { ok: true, value: user };
```

## 学習のポイント

1. **`any`を使わない**: `unknown`を使って型安全にする習慣をつけましょう
2. **段階的な型の絞り込み**: 一度に全部チェックせず、順番に絞り込む
3. **早期リターン**: エラーケースは早めに`return`して、コードをフラットに保つ
4. **エラーメッセージの明確性**: ユーザーが何が問題か分かるメッセージを返す

## 次のステップ

この問題ができたら：

- `solutions/day01/parseUser.ts`に実装する
- `npm test`を実行して動作確認する
- `npm run typecheck`で型エラーがないか確認する
- 追加のエッジケース（空オブジェクト、余分なプロパティなど）を考えてみる
