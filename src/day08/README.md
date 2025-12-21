# Day08: 配列のソート

## 学習目標

- **比較関数**の仕組みを理解する
- `Array.sort()`の使い方を習得する
- 型安全な**カスタムソート**の実装方法を学ぶ
- オブジェクトの配列を特定のプロパティでソートする

## 背景知識

### Array.sort() の基本

`sort()` は配列の要素を**その場で**ソートする関数です。

```typescript
// 数値の配列をソート
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
numbers.sort((a, b) => a - b);
// => [1, 1, 2, 3, 4, 5, 6, 9]

// 文字列の配列をソート
const words = ['banana', 'apple', 'cherry'];
words.sort();
// => ['apple', 'banana', 'cherry']
```

**重要なポイント:**

- `sort()` は元の配列を変更する（破壊的メソッド）
- 比較関数を渡さないと、要素は文字列として比較される
- 数値のソートには必ず比較関数が必要

### 比較関数の仕組み

比較関数は2つの要素 `a` と `b` を受け取り、数値を返します：

```typescript
function compare(a: number, b: number): number {
  // a < b の場合: 負の数を返す → a を b の前に配置
  // a > b の場合: 正の数を返す → b を a の前に配置
  // a === b の場合: 0を返す → 順序を変更しない

  return a - b; // 昇順
  // return b - a; // 降順
}

const numbers = [3, 1, 4, 1, 5];
numbers.sort(compare);
// => [1, 1, 3, 4, 5]
```

**戻り値の意味:**

| 戻り値 | 意味 | 結果 |
|--------|------|------|
| < 0 (負の数) | a は b より小さい | a を b の前に配置 |
| > 0 (正の数) | a は b より大きい | b を a の前に配置 |
| 0 | a と b は等しい | 順序を変更しない |

### よくある間違い: 数値のソート

```typescript
const numbers = [1, 2, 10, 20];

// ❌ 間違い: 比較関数なし
numbers.sort();
// => [1, 10, 2, 20]  ← 文字列として比較される！

// ✅ 正解: 比較関数あり
numbers.sort((a, b) => a - b);
// => [1, 2, 10, 20]
```

### オブジェクトの配列をソート

実務では、オブジェクトの配列を特定のプロパティでソートすることが多いです：

```typescript
type Person = {
  name: string;
  age: number;
};

const people: Person[] = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 },
];

// 年齢でソート（昇順）
people.sort((a, b) => a.age - b.age);
// => [
//   { name: 'Bob', age: 25 },
//   { name: 'Alice', age: 30 },
//   { name: 'Charlie', age: 35 }
// ]

// 名前でソート（アルファベット順）
people.sort((a, b) => a.name.localeCompare(b.name));
// => [
//   { name: 'Alice', age: 30 },
//   { name: 'Bob', age: 25 },
//   { name: 'Charlie', age: 35 }
// ]
```

### 文字列の比較: localeCompare()

文字列のソートには `localeCompare()` を使います：

```typescript
const words = ['banana', 'apple', 'cherry'];

// ✅ 正解: localeCompare を使う
words.sort((a, b) => a.localeCompare(b));
// => ['apple', 'banana', 'cherry']

// ❌ 比較演算子は使えない
// words.sort((a, b) => a - b); // エラー: string型に - 演算子は使えない
```

**localeCompare の戻り値:**

```typescript
'apple'.localeCompare('banana'); // => -1 (負の数)
'banana'.localeCompare('apple'); // => 1 (正の数)
'apple'.localeCompare('apple');  // => 0
```

### 破壊的メソッドと非破壊的メソッド

```typescript
const numbers = [3, 1, 4, 1, 5];

// ❌ 破壊的: 元の配列が変更される
numbers.sort((a, b) => a - b);
console.log(numbers); // => [1, 1, 3, 4, 5] (元の配列が変更された)

// ✅ 非破壊的: 元の配列は変更されない
const original = [3, 1, 4, 1, 5];
const sorted = [...original].sort((a, b) => a - b);
console.log(original); // => [3, 1, 4, 1, 5] (元の配列は変わらない)
console.log(sorted);   // => [1, 1, 3, 4, 5] (新しい配列)
```

### ソートの安定性

同じ値を持つ要素の順序が保たれるかどうか：

```typescript
type Product = {
  name: string;
  price: number;
  stock: number;
};

const products: Product[] = [
  { name: 'A', price: 100, stock: 5 },
  { name: 'B', price: 100, stock: 3 }, // 同じ価格
  { name: 'C', price: 200, stock: 2 },
];

// 価格でソート
products.sort((a, b) => a.price - b.price);
// => 'A' と 'B' の順序は保たれる（安定ソート）
```

## 問題: `sortByProperty`の実装

### 要件

商品の配列を受け取り、**指定されたプロパティ**でソートした新しい配列を返す関数を実装してください。

- 入力1: `Product[]` - 商品オブジェクトの配列
- 入力2: `keyof Product` - ソートに使用するプロパティ名
- 入力3: `'asc' | 'desc'` - 昇順または降順
- 出力: `Product[]` - ソートされた新しい配列

```typescript
type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

type SortOrder = 'asc' | 'desc';
```

### 成功条件

1. 元の配列を変更しない（非破壊的）
2. 指定されたプロパティでソートされた新しい配列を返す
3. `asc`（昇順）または `desc`（降順）を指定できる
4. 数値プロパティと文字列プロパティの両方に対応

### 実装ステップ

```typescript
export function sortByProperty(
  products: readonly Product[],
  key: keyof Product,
  order: SortOrder = 'asc'
): Product[] {
  // Step 1: 元の配列のコピーを作成
  // スプレッド構文 [...products] を使う

  // Step 2: コピーした配列をソート
  // sort() メソッドと比較関数を使う

  // Step 3: プロパティの値を取得
  // a[key] と b[key] で値を取得

  // Step 4: 数値か文字列かで比較方法を分ける
  // typeof で型を判定
  // 数値: a - b または b - a
  // 文字列: localeCompare()

  // Step 5: order が 'desc' の場合は結果を反転
  // 比較結果に -1 を掛ける
}
```

### テスト例

```typescript
const products: Product[] = [
  { id: 1, name: 'Banana', price: 120, stock: 10 },
  { id: 2, name: 'Apple', price: 100, stock: 5 },
  { id: 3, name: 'Cherry', price: 150, stock: 3 },
];

// 価格で昇順ソート
sortByProperty(products, 'price', 'asc');
// => [
//   { id: 2, name: 'Apple', price: 100, stock: 5 },
//   { id: 1, name: 'Banana', price: 120, stock: 10 },
//   { id: 3, name: 'Cherry', price: 150, stock: 3 }
// ]

// 価格で降順ソート
sortByProperty(products, 'price', 'desc');
// => [
//   { id: 3, name: 'Cherry', price: 150, stock: 3 },
//   { id: 1, name: 'Banana', price: 120, stock: 10 },
//   { id: 2, name: 'Apple', price: 100, stock: 5 }
// ]

// 名前で昇順ソート
sortByProperty(products, 'name', 'asc');
// => [
//   { id: 2, name: 'Apple', price: 100, stock: 5 },
//   { id: 1, name: 'Banana', price: 120, stock: 10 },
//   { id: 3, name: 'Cherry', price: 150, stock: 3 }
// ]

// 元の配列は変更されない
console.log(products);
// => [
//   { id: 1, name: 'Banana', price: 120, stock: 10 },
//   { id: 2, name: 'Apple', price: 100, stock: 5 },
//   { id: 3, name: 'Cherry', price: 150, stock: 3 }
// ]  ← 元のまま
```

## ヒント

### ヒント1: 配列のコピー

```typescript
// スプレッド構文でコピーを作成
const copy = [...products];

// これで元の配列を変更せずにソートできる
copy.sort(...);
```

### ヒント2: keyof を使ったプロパティアクセス

```typescript
function sortByProperty(
  products: readonly Product[],
  key: keyof Product,  // 'id' | 'name' | 'price' | 'stock'
  order: SortOrder
): Product[] {
  // key は Product のプロパティ名のいずれか
  const value = product[key];  // 型安全にアクセスできる
}
```

### ヒント3: 型による比較方法の分岐

```typescript
// プロパティの値を取得
const aValue = a[key];
const bValue = b[key];

// 数値の場合
if (typeof aValue === 'number' && typeof bValue === 'number') {
  return aValue - bValue;
}

// 文字列の場合
if (typeof aValue === 'string' && typeof bValue === 'string') {
  return aValue.localeCompare(bValue);
}

return 0;
```

### ヒント4: order による結果の反転

```typescript
// 昇順の比較結果
let result = /* 比較ロジック */;

// 降順の場合は結果を反転
if (order === 'desc') {
  result = -result;
}

return result;
```

## 学習のポイント

1. **比較関数の理解**
   - 負の数、0、正の数の意味
   - `a - b` で昇順、`b - a` で降順

2. **型による比較方法の違い**
   - 数値: 減算 (`-`)
   - 文字列: `localeCompare()`

3. **破壊的 vs 非破壊的**
   - `sort()` は元の配列を変更する
   - スプレッド構文でコピーして非破壊的に

4. **keyof による型安全性**
   - プロパティ名を型安全に扱える
   - 存在しないプロパティはコンパイルエラー

## 次のステップ

この問題ができたら：

- `npm test -- day08`を実行して確認
- `npm run typecheck`で型エラーがないかチェック
- 複数のプロパティでソートする拡張版に挑戦
  - 例: 価格が同じ場合は名前順でソート
- Day09の「配列のフラット化」に進む
