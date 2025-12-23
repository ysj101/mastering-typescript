# Day09: 配列のフラット化

## 学習目標

- **ネストした配列**の扱い方を理解する
- `Array.flat()`と`Array.flatMap()`の使い方を学ぶ
- 再帰的な処理パターンを習得する
- 型の推論と配列の次元を理解する

## 背景知識

### ネストした配列とは

配列の中に配列が含まれている構造を「ネストした配列」と呼びます：

```typescript
// 1次元配列
const flat = [1, 2, 3, 4, 5];

// 2次元配列（配列の配列）
const nested2D = [[1, 2], [3, 4], [5]];

// 3次元配列
const nested3D = [[[1, 2]], [[3, 4]], [[5]]];

// 不規則なネスト
const irregular = [1, [2, 3], [4, [5, 6]], 7];
```

### Array.flat() の基本

`flat()` は配列を指定した深さまでフラット化します：

```typescript
const nested = [1, [2, 3], [4, [5, 6]]];

// 1階層フラット化（デフォルト）
nested.flat();
// => [1, 2, 3, 4, [5, 6]]

// 2階層フラット化
nested.flat(2);
// => [1, 2, 3, 4, 5, 6]

// すべてフラット化
nested.flat(Infinity);
// => [1, 2, 3, 4, 5, 6]
```

**重要なポイント:**

- `flat()` は元の配列を変更しない（非破壊的）
- 引数で深さを指定できる（デフォルトは1）
- `Infinity` を指定すると完全にフラット化

### Array.flatMap() の基本

`flatMap()` は `map()` と `flat()` を組み合わせた関数です：

```typescript
const numbers = [1, 2, 3];

// map() + flat(1) と同じ
numbers.flatMap((n) => [n, n * 2]);
// => [1, 2, 2, 4, 3, 6]

// 通常の map() だとネストする
numbers.map((n) => [n, n * 2]);
// => [[1, 2], [2, 4], [3, 6]]
```

**flatMap() の使用例:**

```typescript
// 文字列を単語に分割してフラット化
const sentences = ['Hello World', 'TypeScript is great'];
sentences.flatMap((sentence) => sentence.split(' '));
// => ['Hello', 'World', 'TypeScript', 'is', 'great']

// 条件に応じて要素数を変える
const numbers = [1, 2, 3, 4, 5];
numbers.flatMap((n) => (n % 2 === 0 ? [n, n] : [n]));
// => [1, 2, 2, 3, 4, 4, 5]  偶数だけ2回含まれる

// 空配列でフィルタリング
const numbers2 = [1, 2, 3, 4, 5];
numbers2.flatMap((n) => (n % 2 === 0 ? [n] : []));
// => [2, 4]  偶数だけを抽出
```

### 再帰的なフラット化

`flat()` を使わずに再帰で実装することもできます：

```typescript
function flattenDeep(arr: any[]): any[] {
  const result: any[] = [];

  for (const item of arr) {
    if (Array.isArray(item)) {
      // 配列なら再帰的にフラット化
      result.push(...flattenDeep(item));
    } else {
      // 配列でなければそのまま追加
      result.push(item);
    }
  }

  return result;
}

flattenDeep([1, [2, [3, [4, 5]]]]);
// => [1, 2, 3, 4, 5]
```

### TypeScriptの型と配列の次元

```typescript
// 型の推論
const nested: number[][] = [[1, 2], [3, 4]];
const flattened = nested.flat(); // number[]

// 多次元配列の型
type OneDim = number[];          // [1, 2, 3]
type TwoDim = number[][];        // [[1, 2], [3, 4]]
type ThreeDim = number[][][];    // [[[1, 2]], [[3, 4]]]

// flat() の型
const arr2D: number[][] = [[1], [2]];
const arr1D: number[] = arr2D.flat();  // 1階層減る

const arr3D: number[][][] = [[[1]], [[2]]];
const arr2D_result: number[][] = arr3D.flat();  // 1階層減る
```

### 実務での活用例

```typescript
// ケース1: APIレスポンスのページネーション結果を統合
type Page<T> = {
  items: T[];
  page: number;
};

const pages: Page<Product>[] = [
  { items: [product1, product2], page: 1 },
  { items: [product3, product4], page: 2 },
];

const allProducts = pages.flatMap((page) => page.items);
// => [product1, product2, product3, product4]

// ケース2: タグのリストを統合
type Article = {
  title: string;
  tags: string[];
};

const articles: Article[] = [
  { title: 'TypeScript', tags: ['programming', 'typescript'] },
  { title: 'React', tags: ['programming', 'react', 'ui'] },
];

const allTags = articles.flatMap((article) => article.tags);
// => ['programming', 'typescript', 'programming', 'react', 'ui']

// 重複を除去
const uniqueTags = [...new Set(allTags)];
// => ['programming', 'typescript', 'react', 'ui']

// ケース3: カテゴリ内の商品を全て取得
type Category = {
  name: string;
  products: Product[];
};

const categories: Category[] = [
  { name: 'Fruits', products: [apple, banana] },
  { name: 'Vegetables', products: [carrot, spinach] },
];

const allProducts2 = categories.flatMap((cat) => cat.products);
```

## 問題: `flattenArray`の実装

### 要件

2次元配列（配列の配列）を受け取り、1次元配列にフラット化する関数を実装してください。

- 入力: `T[][]` - 要素の配列の配列
- 出力: `T[]` - フラット化された配列

```typescript
// ジェネリック型を使った定義
function flattenArray<T>(arrays: T[][]): T[]
```

### 成功条件

1. 2次元配列を1次元配列にフラット化する
2. 元の配列を変更しない（非破壊的）
3. 空の配列が含まれていても正しく処理する
4. ジェネリック型で任意の型に対応する

### 実装ステップ

```typescript
export function flattenArray<T>(arrays: T[][]): T[] {
  // Step 1: flat() メソッドを使う方法
  // arrays.flat() で1階層フラット化できる

  // Step 2: flatMap() を使う方法
  // arrays.flatMap(arr => arr) でも同じ結果

  // Step 3: reduce() を使う方法
  // arrays.reduce((acc, arr) => [...acc, ...arr], [])

  // いずれかの方法を選んで実装してください
}
```

### テスト例

```typescript
// 数値の配列
flattenArray([[1, 2], [3, 4], [5]]);
// => [1, 2, 3, 4, 5]

// 文字列の配列
flattenArray([['a', 'b'], ['c', 'd']]);
// => ['a', 'b', 'c', 'd']

// 空の配列を含む
flattenArray([[1, 2], [], [3, 4]]);
// => [1, 2, 3, 4]

// 完全に空
flattenArray([]);
// => []

// オブジェクトの配列
type User = { name: string };
flattenArray<User>([
  [{ name: 'Alice' }, { name: 'Bob' }],
  [{ name: 'Charlie' }],
]);
// => [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }]
```

## ヒント

### ヒント1: flat() を使う方法

```typescript
export function flattenArray<T>(arrays: T[][]): T[] {
  return arrays.flat();
}
```

これが最もシンプルで推奨される方法です。

### ヒント2: flatMap() を使う方法

```typescript
export function flattenArray<T>(arrays: T[][]): T[] {
  return arrays.flatMap((arr) => arr);
}
```

`flatMap()` で各配列をそのまま返すことでフラット化できます。

### ヒント3: reduce() を使う方法

```typescript
export function flattenArray<T>(arrays: T[][]): T[] {
  return arrays.reduce((acc, arr) => [...acc, ...arr], []);
}

// または concat を使って
export function flattenArray<T>(arrays: T[][]): T[] {
  return arrays.reduce((acc, arr) => acc.concat(arr), []);
}
```

### ヒント4: for...of を使う方法

```typescript
export function flattenArray<T>(arrays: T[][]): T[] {
  const result: T[] = [];

  for (const arr of arrays) {
    result.push(...arr);
    // または
    // for (const item of arr) {
    //   result.push(item);
    // }
  }

  return result;
}
```

### ヒント5: 型の推論

```typescript
// TypeScriptは自動的に型を推論します
const numbers = flattenArray([[1, 2], [3, 4]]);
// numbers の型: number[]

const strings = flattenArray([['a'], ['b']]);
// strings の型: string[]

// 明示的に型を指定することもできます
const users = flattenArray<User>([
  [user1, user2],
  [user3],
]);
// users の型: User[]
```

## 学習のポイント

1. **flat() と flatMap() の違い**
   - `flat()`: 配列をフラット化するだけ
   - `flatMap()`: map + flat を同時に実行

2. **配列の次元**
   - `T[][]` → `T[]` (2次元 → 1次元)
   - flat(1) は1階層だけフラット化

3. **ジェネリック型**
   - `<T>` で任意の型に対応
   - 型安全性を保ちながら再利用可能

4. **非破壊的な操作**
   - 元の配列は変更されない
   - 新しい配列を返す

## 次のステップ

この問題ができたら：

- `npm test -- day09`を実行して確認
- `npm run typecheck`で型エラーがないかチェック
- 3次元以上の配列をフラット化する拡張版に挑戦
  - 再帰を使った完全フラット化の実装
- Day10の「配列の検索」に進む
