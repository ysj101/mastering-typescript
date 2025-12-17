# Day05: オブジェクトのマッピング

## 学習目標

- オブジェクトのプロパティを変換する方法を理解する
- 型安全なプロパティアクセスを学ぶ
- オブジェクトの構造を変更しながら型安全性を保つ方法を習得する
- Mapped Typesの基礎を理解する

## 背景知識

### オブジェクトの変換

実務では、あるオブジェクトの形式を別の形式に変換することがよくあります。例えば、データベースから取得したデータをAPIレスポンスの形式に変換する場合などです。

```typescript
// データベースの形式
type DBUser = {
  user_id: number;
  user_name: string;
  email_address: string;
  created_at: string;
};

// APIレスポンスの形式
type ApiUser = {
  id: number;
  name: string;
  email: string;
};

// 変換関数
function toApiUser(dbUser: DBUser): ApiUser {
  return {
    id: dbUser.user_id,
    name: dbUser.user_name,
    email: dbUser.email_address,
    // created_at は含めない
  };
}
```

**重要なポイント:**

- プロパティ名を変更できる（`user_id` → `id`）
- 不要なプロパティを除外できる（`created_at`）
- TypeScriptが型チェックしてくれる（タイポを防げる）

### オブジェクトスプレッド構文

オブジェクトの一部を変更しながら、残りをそのまま保持する方法です。

```typescript
type User = {
  id: number;
  name: string;
  email: string;
  age: number;
};

const user: User = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  age: 30,
};

// name だけを大文字に変換
const upperUser = {
  ...user, // 他のプロパティはそのまま
  name: user.name.toUpperCase(), // name だけ変更
};
// => { id: 1, name: 'ALICE', email: 'alice@example.com', age: 30 }
```

**重要なポイント:**

- `...user` で全プロパティをコピー
- その後に書いたプロパティで上書き
- 元のオブジェクトは変更されない（イミュータブル）

### 型安全なプロパティアクセス

TypeScriptでは、存在しないプロパティにアクセスするとコンパイルエラーになります。

```typescript
type Product = {
  id: number;
  name: string;
  price: number;
};

const product: Product = {
  id: 1,
  name: 'Laptop',
  price: 1000,
};

// ✅ OK: 存在するプロパティ
const name = product.name; // string

// ❌ エラー: 存在しないプロパティ
const quantity = product.quantity; // コンパイルエラー
```

### 計算されたプロパティ名

オブジェクトのキーを動的に生成できます。

```typescript
type Item = {
  id: number;
  name: string;
  price: number;
};

const item: Item = {
  id: 1,
  name: 'Book',
  price: 20,
};

// プロパティ名を変数で指定
const key: keyof Item = 'name';
const value = item[key]; // string | number（型が広い）

// より型安全なアクセス
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const itemName = getProperty(item, 'name'); // string（型が正確）
const itemPrice = getProperty(item, 'price'); // number（型が正確）
```

**重要なポイント:**

- `keyof T` は型 `T` のすべてのキーの Union 型
- `T[K]` は型 `T` のキー `K` に対応する値の型
- ジェネリクスを使うことで型推論が正確になる

### オブジェクトのプロパティ変換パターン

```typescript
type User = {
  firstName: string;
  lastName: string;
  age: number;
};

// パターン1: 新しいプロパティを追加
function addFullName(user: User) {
  return {
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
  };
}

// パターン2: プロパティを変換
function incrementAge(user: User) {
  return {
    ...user,
    age: user.age + 1,
  };
}

// パターン3: 複数のプロパティを同時に変換
function formatUser(user: User) {
  return {
    firstName: user.firstName.toUpperCase(),
    lastName: user.lastName.toUpperCase(),
    age: user.age,
  };
}
```

## 問題: `transformUser`の実装

### 要件

ユーザーオブジェクトを変換する関数を実装してください。

入力として、以下の形式のユーザーオブジェクトを受け取ります：

```typescript
type InputUser = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
};
```

出力として、以下の形式のオブジェクトを返します：

```typescript
type OutputUser = {
  id: number;
  fullName: string; // firstName + " " + lastName
  isAdult: boolean; // age >= 18
};
```

### 成功条件

1. `id` はそのまま保持する
2. `firstName` と `lastName` を結合して `fullName` を作成する
3. `age` が18以上の場合 `isAdult` は `true`、それ以外は `false`

### 実装ステップ

```typescript
export function transformUser(user: InputUser): OutputUser {
  // Step 1: firstName と lastName を結合して fullName を作成
  // const fullName = ...

  // Step 2: age が 18 以上かチェックして isAdult を決定
  // const isAdult = ...

  // Step 3: 新しいオブジェクトを返す
  // return { id: ..., fullName: ..., isAdult: ... }
}
```

### テスト例

```typescript
// 成人のケース
transformUser({
  id: 1,
  firstName: 'Alice',
  lastName: 'Smith',
  age: 25,
});
// => { id: 1, fullName: 'Alice Smith', isAdult: true }

// 未成年のケース
transformUser({
  id: 2,
  firstName: 'Bob',
  lastName: 'Johnson',
  age: 15,
});
// => { id: 2, fullName: 'Bob Johnson', isAdult: false }

// ちょうど18歳のケース（境界値）
transformUser({
  id: 3,
  firstName: 'Charlie',
  lastName: 'Brown',
  age: 18,
});
// => { id: 3, fullName: 'Charlie Brown', isAdult: true }
```

## ヒント

### ヒント1: fullName の作成

```typescript
// テンプレートリテラルを使う
const fullName = `${user.firstName} ${user.lastName}`;
```

### ヒント2: isAdult の判定

```typescript
// 比較演算子の結果は boolean になる
const isAdult = user.age >= 18;
```

### ヒント3: オブジェクトの作成

```typescript
// 新しいオブジェクトを作成して返す
return {
  id: user.id,
  fullName: fullName,
  isAdult: isAdult,
};

// プロパティ名と変数名が同じ場合は省略できる
return {
  id: user.id,
  fullName, // fullName: fullName と同じ
  isAdult, // isAdult: isAdult と同じ
};
```

### ヒント4: すべてをまとめる

```typescript
export function transformUser(user: InputUser): OutputUser {
  const fullName = `${user.firstName} ${user.lastName}`;
  const isAdult = user.age >= 18;

  return {
    id: user.id,
    fullName,
    isAdult,
  };
}

// または、1行でも書ける
export function transformUser(user: InputUser): OutputUser {
  return {
    id: user.id,
    fullName: `${user.firstName} ${user.lastName}`,
    isAdult: user.age >= 18,
  };
}
```

## 学習のポイント

1. **オブジェクト変換の理解**: 入力の形式と出力の形式が異なる場合の変換方法
2. **型安全性の保証**: TypeScriptが入力・出力の型をチェックしてくれる
3. **計算プロパティ**: 既存のプロパティから新しいプロパティを計算する
4. **イミュータブル操作**: 元のオブジェクトを変更せず、新しいオブジェクトを作成する

## よくある間違い

### 間違い1: 元のオブジェクトを変更してしまう

```typescript
// ❌ 間違い: 元のオブジェクトを変更している
function transformUser(user: InputUser): OutputUser {
  user.fullName = `${user.firstName} ${user.lastName}`; // エラー: fullName は存在しない
  // ...
}

// ✅ 正解: 新しいオブジェクトを作成
function transformUser(user: InputUser): OutputUser {
  return {
    id: user.id,
    fullName: `${user.firstName} ${user.lastName}`,
    isAdult: user.age >= 18,
  };
}
```

### 間違い2: 型が一致しない

```typescript
// ❌ 間違い: 戻り値の型が OutputUser と一致しない
function transformUser(user: InputUser): OutputUser {
  return {
    id: user.id,
    fullName: `${user.firstName} ${user.lastName}`,
    // isAdult がない → コンパイルエラー
  };
}
```

### 間違い3: isAdult の条件ミス

```typescript
// ❌ 間違い: 18歳を未成年として扱っている
const isAdult = user.age > 18; // 18歳は false になってしまう

// ✅ 正解: 18歳以上を成人として扱う
const isAdult = user.age >= 18;
```

## 発展課題

この問題ができたら、以下にも挑戦してみましょう:

1. **複数のユーザーを変換**: `transformUser` を `map` と組み合わせて配列を変換
2. **オプショナルプロパティの扱い**: `middleName?: string` を追加した場合の処理
3. **ネストしたオブジェクト**: `address: { city: string, zipCode: string }` の変換
4. **型安全なピック**: 特定のプロパティだけを選択する汎用関数

```typescript
// 例: 複数のユーザーを変換
const users: InputUser[] = [
  { id: 1, firstName: 'Alice', lastName: 'Smith', age: 25 },
  { id: 2, firstName: 'Bob', lastName: 'Johnson', age: 15 },
];

const transformedUsers = users.map((user) => transformUser(user));
// または
const transformedUsers = users.map(transformUser);
```

## 次のステップ

この問題ができたら:

- `npm test` を実行して確認
- `npm run typecheck` で型エラーがないか確認
- Day06に進んで、配列の集計（reduce関数）を学習
