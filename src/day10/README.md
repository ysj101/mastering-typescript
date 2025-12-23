# Day10: 配列の検索

## 学習目標

- `find`と`findIndex`メソッドの使い方を理解する
- 型安全な検索条件の実装方法を学ぶ
- 複数の検索パターンを使い分ける

## 背景知識

### find メソッド

`find`メソッドは、配列の中から条件に一致する**最初の要素**を返します。見つからない場合は`undefined`を返します。

```typescript
const numbers = [1, 2, 3, 4, 5];
const found = numbers.find((n) => n > 3);
console.log(found); // 4

const notFound = numbers.find((n) => n > 10);
console.log(notFound); // undefined
```

**型の特徴**:

```typescript
const numbers: number[] = [1, 2, 3];
const result = numbers.find((n) => n > 2);
// result の型は number | undefined
```

### findIndex メソッド

`findIndex`メソッドは、条件に一致する**最初の要素のインデックス**を返します。見つからない場合は`-1`を返します。

```typescript
const fruits = ['apple', 'banana', 'orange'];
const index = fruits.findIndex((f) => f === 'banana');
console.log(index); // 1

const notFound = fruits.findIndex((f) => f === 'grape');
console.log(notFound); // -1
```

### 型安全な検索条件

検索条件を型安全に実装するには、検索対象のプロパティが実際に存在することを保証する必要があります。

```typescript
type User = {
  id: number;
  name: string;
  email: string;
};

// 型安全な検索
function findUserById(users: User[], id: number): User | undefined {
  return users.find((user) => user.id === id);
}

// keyof を使った汎用的な検索
function findByProperty<T, K extends keyof T>(
  items: T[],
  key: K,
  value: T[K]
): T | undefined {
  return items.find((item) => item[key] === value);
}
```

## 問題: findUser の実装

### 要件

ユーザー配列から特定の条件でユーザーを検索する関数群を実装してください。

**型定義**:

```typescript
type User = {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
};
```

**実装する関数**:

1. `findUserById`: IDでユーザーを検索
   - 入力: `users: User[]`, `id: number`
   - 出力: `User | undefined`
2. `findUserIndexByEmail`: メールアドレスでインデックスを検索
   - 入力: `users: User[]`, `email: string`
   - 出力: `number`（見つからない場合は`-1`）
3. `findActiveUser`: アクティブなユーザーを検索（最初の1人）
   - 入力: `users: User[]`
   - 出力: `User | undefined`
4. `findUserByCondition`: カスタム条件でユーザーを検索
   - 入力: `users: User[]`, `condition: (user: User) => boolean`
   - 出力: `User | undefined`

### 成功条件

各関数が以下の条件を満たす場合に成功とします：

1. **findUserById**: 指定されたIDのユーザーが存在する場合はそのユーザーを返し、存在しない場合は`undefined`を返す
2. **findUserIndexByEmail**: 指定されたメールアドレスのユーザーのインデックスを返し、存在しない場合は`-1`を返す
3. **findActiveUser**: `isActive`が`true`の最初のユーザーを返し、存在しない場合は`undefined`を返す
4. **findUserByCondition**: カスタム条件関数に一致する最初のユーザーを返し、存在しない場合は`undefined`を返す

### 実装ステップ

#### 1. findUserById の実装

```typescript
export function findUserById(users: User[], id: number): User | undefined {
  // Step 1: find メソッドを使用して、id が一致するユーザーを探す
  // ヒント: user.id === id という条件で検索

  // Step 2: 見つかったユーザー（または undefined）を返す
}
```

#### 2. findUserIndexByEmail の実装

```typescript
export function findUserIndexByEmail(users: User[], email: string): number {
  // Step 1: findIndex メソッドを使用して、email が一致するインデックスを探す
  // ヒント: user.email === email という条件で検索

  // Step 2: 見つかったインデックス（または -1）を返す
}
```

#### 3. findActiveUser の実装

```typescript
export function findActiveUser(users: User[]): User | undefined {
  // Step 1: find メソッドを使用して、isActive が true のユーザーを探す
  // ヒント: user.isActive という条件で検索（true と明示的に比較する必要はない）

  // Step 2: 見つかったユーザー（または undefined）を返す
}
```

#### 4. findUserByCondition の実装

```typescript
export function findUserByCondition(
  users: User[],
  condition: (user: User) => boolean
): User | undefined {
  // Step 1: find メソッドに渡された condition 関数をそのまま使用
  // ヒント: users.find(condition) だけで完了

  // Step 2: 見つかったユーザー（または undefined）を返す
}
```

### テスト例

```typescript
const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', age: 25, isActive: true },
  {
    id: 2,
    name: 'Bob',
    email: 'bob@example.com',
    age: 30,
    isActive: false,
  },
  {
    id: 3,
    name: 'Charlie',
    email: 'charlie@example.com',
    age: 35,
    isActive: true,
  },
];

// findUserById
findUserById(users, 2);
// => { id: 2, name: 'Bob', email: 'bob@example.com', age: 30, isActive: false }

findUserById(users, 999);
// => undefined

// findUserIndexByEmail
findUserIndexByEmail(users, 'charlie@example.com');
// => 2

findUserIndexByEmail(users, 'nonexistent@example.com');
// => -1

// findActiveUser
findActiveUser(users);
// => { id: 1, name: 'Alice', email: 'alice@example.com', age: 25, isActive: true }

// findUserByCondition
findUserByCondition(users, (user) => user.age > 30);
// => { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 35, isActive: true }
```

## ヒント

### ヒント1: find の返り値の型

```typescript
// find は T | undefined を返す
const result = array.find((item) => condition);
// result の型は自動的に T | undefined になる
```

### ヒント2: findIndex の返り値

```typescript
// findIndex は number を返す（見つからない場合は -1）
const index = array.findIndex((item) => condition);
if (index !== -1) {
  console.log('Found at index:', index);
}
```

### ヒント3: 条件関数の渡し方

```typescript
// 条件関数を引数として受け取る場合
function findByCondition<T>(items: T[], condition: (item: T) => boolean) {
  return items.find(condition); // そのまま渡せる
}
```

### ヒント4: プロパティの型安全なアクセス

```typescript
// オブジェクトのプロパティにアクセスする際は、型が保証されている
function findByProperty<T, K extends keyof T>(
  items: T[],
  key: K,
  value: T[K]
) {
  return items.find((item) => item[key] === value);
}
```

## 学習のポイント

1. **find vs findIndex の使い分け**

   - 要素自体が必要 → `find`
   - インデックスが必要 → `findIndex`
   - どちらも最初に見つかった要素/インデックスのみを返す

2. **undefined のハンドリング**

   - `find`の返り値は常に`T | undefined`
   - 使用する前に`undefined`チェックが必要
   - Optional Chaining (`?.`) や Nullish Coalescing (`??`) が便利

3. **型安全な検索条件**

   - 検索条件関数の型は`(item: T) => boolean`
   - TypeScriptが型推論で安全性を保証
   - プロパティアクセスも型チェックされる

4. **高階関数としての活用**
   - 検索条件を関数として渡すことで柔軟性が向上
   - 再利用可能な検索ロジックの構築が可能

## 次のステップ

この問題ができたら：

- テストを書いて動作確認する
- `npm test -- day10`を実行して確認
- 型チェックも通ることを確認: `npm run typecheck`
- より複雑な検索条件（複数条件のAND/OR）に挑戦してみる
- Day11に進んで「タグ付きユニオン型」を学ぶ準備をする
