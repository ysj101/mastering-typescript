# Day12: 型述語（Type Predicate）

## 学習目標

- 型述語（Type Predicate）の構文と使い方を理解する
- `is`キーワードを使ったカスタム型ガード関数を実装できる
- ユニオン型から特定の型を絞り込む方法を習得する

## 背景知識

### 型ガードの限界

TypeScriptは`typeof`や`in`演算子で基本的な型の絞り込みができますが、独自の型を判定する場合は限界があります。

```typescript
type User = {
  type: 'user';
  name: string;
  email: string;
};

type Guest = {
  type: 'guest';
  sessionId: string;
};

type Visitor = User | Guest;

// これだけだとTypeScriptは戻り値がbooleanとしか認識しない
function checkIsUser(visitor: Visitor): boolean {
  return visitor.type === 'user';
}

function greet(visitor: Visitor) {
  if (checkIsUser(visitor)) {
    // エラー！TypeScriptはvisitorがUserだと認識できない
    console.log(visitor.email); // Property 'email' does not exist on type 'Visitor'
  }
}
```

### 型述語（Type Predicate）とは

型述語は、関数の戻り値の型として`value is Type`という形式で記述します。これにより、関数が`true`を返した場合に引数の型が絞り込まれることをTypeScriptに伝えられます。

```typescript
// 戻り値の型を `visitor is User` にする
function isUser(visitor: Visitor): visitor is User {
  return visitor.type === 'user';
}

function greet(visitor: Visitor) {
  if (isUser(visitor)) {
    // OK！TypeScriptはvisitorがUser型だと認識する
    console.log(visitor.email);
  }
}
```

### 型述語の構文

```typescript
function 関数名(引数: 引数の型): 引数名 is 絞り込み後の型 {
  // 型を判定するロジック
  return 判定結果; // boolean
}
```

重要なポイント：
- `引数名`は関数の引数名と一致させる
- 戻り値は`boolean`として評価される
- `true`を返すと、呼び出し元で型が絞り込まれる

### 複数の型を判定する例

```typescript
type Cat = { kind: 'cat'; meow: () => void };
type Dog = { kind: 'dog'; bark: () => void };
type Bird = { kind: 'bird'; fly: () => void };
type Animal = Cat | Dog | Bird;

function isCat(animal: Animal): animal is Cat {
  return animal.kind === 'cat';
}

function isDog(animal: Animal): animal is Dog {
  return animal.kind === 'dog';
}

function handleAnimal(animal: Animal) {
  if (isCat(animal)) {
    animal.meow(); // OK
  } else if (isDog(animal)) {
    animal.bark(); // OK
  } else {
    animal.fly(); // OK - TypeScriptはここでBirdと推論
  }
}
```

## 問題: isUserの実装

### 要件

複数の種類のアカウント（User, Admin, Guest）を扱うシステムで、各アカウントタイプを判定する型ガード関数を実装してください。

- 入力: `Account`型（`User | Admin | Guest`のユニオン型）
- 出力: `boolean`（型述語付き）

### 型定義

```typescript
type User = {
  type: 'user';
  id: number;
  name: string;
  email: string;
};

type Admin = {
  type: 'admin';
  id: number;
  name: string;
  permissions: string[];
};

type Guest = {
  type: 'guest';
  sessionId: string;
  expiresAt: Date;
};

type Account = User | Admin | Guest;
```

### 成功条件

以下の3つの型ガード関数を実装してください：

1. `isUser(account)` - accountがUser型かどうかを判定
2. `isAdmin(account)` - accountがAdmin型かどうかを判定
3. `isGuest(account)` - accountがGuest型かどうかを判定

### 実装ステップ

```typescript
// Step 1: isUser関数を実装
// account.typeが'user'かどうかを判定する

// Step 2: isAdmin関数を実装
// account.typeが'admin'かどうかを判定する

// Step 3: isGuest関数を実装
// account.typeが'guest'かどうかを判定する
```

### テスト例

```typescript
const user: Account = { type: 'user', id: 1, name: 'Alice', email: 'alice@example.com' };
const admin: Account = { type: 'admin', id: 2, name: 'Bob', permissions: ['read', 'write'] };
const guest: Account = { type: 'guest', sessionId: 'abc123', expiresAt: new Date() };

isUser(user);   // => true
isUser(admin);  // => false
isUser(guest);  // => false

isAdmin(admin); // => true
isAdmin(user);  // => false

isGuest(guest); // => true
isGuest(user);  // => false
```

## ヒント

### ヒント1: 型述語の書き方

```typescript
function isUser(account: Account): account is User {
  // ここに判定ロジックを書く
}
```

`account is User`という戻り値の型が型述語です。

### ヒント2: タグ付きユニオンの判定

Day11で学んだタグ付きユニオン型を思い出してください。`type`プロパティで判定できます。

```typescript
return account.type === 'user';
```

### ヒント3: 型述語が機能しているか確認

```typescript
function processAccount(account: Account) {
  if (isUser(account)) {
    // ここでaccount.emailにアクセスできればOK
    console.log(account.email);
  }
}
```

## 学習のポイント

1. **型述語は型の絞り込みを伝える**: 通常の`boolean`を返す関数では型が絞り込まれないが、型述語を使うと呼び出し元で型が絞り込まれる

2. **型安全なコードへの貢献**: 型述語を使うことで、`as`による型アサーションを減らし、より型安全なコードが書ける

3. **タグ付きユニオンとの相性**: タグ付きユニオン型と組み合わせると、非常に強力な型ガードになる

4. **配列のフィルタリングでの活用**: `filter`メソッドと組み合わせると型が保持される

```typescript
const accounts: Account[] = [user, admin, guest];
const users = accounts.filter(isUser); // users: User[]
```

## 次のステップ

この問題ができたら：

- テストを書いて動作確認する
- `npm test`を実行して確認
- 配列の`filter`メソッドと組み合わせて、特定の型だけを抽出してみる
- `unknown`型からの型ガードに挑戦する（より実践的なパターン）
