# Day06: 配列の集計

## 学習目標

- `Array.reduce()` の使い方を理解する
- accumulatorの概念を学ぶ
- 初期値の型を正しく指定する方法を習得する
- 配列の要素を集計して単一の値を得る方法を学ぶ

## 背景知識

### Array.reduce() の基本

`reduce()` は配列の要素を順番に処理して、単一の値にまとめる関数です。

```typescript
const numbers = [1, 2, 3, 4, 5];

// 合計を計算
const sum = numbers.reduce((acc, num) => acc + num, 0);
// => 15

// 処理の流れ:
// 1回目: acc = 0, num = 1 → 0 + 1 = 1
// 2回目: acc = 1, num = 2 → 1 + 2 = 3
// 3回目: acc = 3, num = 3 → 3 + 3 = 6
// 4回目: acc = 6, num = 4 → 6 + 4 = 10
// 5回目: acc = 10, num = 5 → 10 + 5 = 15
```

**重要なポイント:**

- `acc` (accumulator): 累積値（前回の処理結果）
- `num` (current value): 現在の要素
- `0` (initial value): 初期値
- 戻り値が次の `acc` になる

### reduce の型定義

TypeScriptでは、reduceの型が自動的に推論されます。

```typescript
// 数値の配列を数値に集計
const numbers: number[] = [1, 2, 3];
const sum = numbers.reduce((acc, num) => acc + num, 0);
// sum の型: number

// 文字列の配列を文字列に集計
const words: string[] = ['Hello', ' ', 'World'];
const sentence = words.reduce((acc, word) => acc + word, '');
// sentence の型: string

// オブジェクトの配列を数値に集計
type Item = { price: number };
const items: Item[] = [{ price: 10 }, { price: 20 }];
const total = items.reduce((acc, item) => acc + item.price, 0);
// total の型: number
```

**重要なポイント:**

- 初期値の型が accumulator の型を決定する
- TypeScriptが戻り値の型を推論してくれる
- 型が一致しないとコンパイルエラーになる

### 初期値の重要性

初期値を指定しないとエラーが起きる可能性があります。

```typescript
const numbers = [1, 2, 3, 4, 5];

// ✅ 初期値あり: 安全
const sum1 = numbers.reduce((acc, num) => acc + num, 0);
// => 15

// ⚠️ 初期値なし: 配列が空だとエラー
const emptyArray: number[] = [];
// const sum2 = emptyArray.reduce((acc, num) => acc + num);
// => TypeError: Reduce of empty array with no initial value

// ✅ 空配列でも安全
const sum3 = emptyArray.reduce((acc, num) => acc + num, 0);
// => 0
```

**重要なポイント:**

- 初期値を省略すると、配列の最初の要素が初期値になる
- 空配列の場合、初期値がないとエラーになる
- 常に初期値を指定することを推奨

### オブジェクト配列の集計

実務では、オブジェクトの配列から特定のプロパティを集計することがよくあります。

```typescript
type Score = {
  subject: string;
  points: number;
};

const scores: Score[] = [
  { subject: 'Math', points: 80 },
  { subject: 'English', points: 90 },
  { subject: 'Science', points: 85 },
];

// 合計点を計算
const totalPoints = scores.reduce((acc, score) => acc + score.points, 0);
// => 255

// 平均点を計算
const averagePoints = scores.reduce((acc, score) => acc + score.points, 0) / scores.length;
// => 85
```

### reduce の応用パターン

```typescript
type Product = {
  name: string;
  price: number;
  quantity: number;
};

const cart: Product[] = [
  { name: 'Apple', price: 100, quantity: 2 },
  { name: 'Banana', price: 50, quantity: 3 },
  { name: 'Orange', price: 80, quantity: 1 },
];

// パターン1: 合計金額を計算
const totalAmount = cart.reduce((acc, product) => {
  return acc + product.price * product.quantity;
}, 0);
// => 100*2 + 50*3 + 80*1 = 200 + 150 + 80 = 430

// パターン2: 最大値を見つける
const maxPrice = cart.reduce((acc, product) => {
  return Math.max(acc, product.price);
}, 0);
// => 100

// パターン3: オブジェクトに集計
type Summary = {
  totalItems: number;
  totalAmount: number;
};

const summary = cart.reduce(
  (acc, product) => ({
    totalItems: acc.totalItems + product.quantity,
    totalAmount: acc.totalAmount + product.price * product.quantity,
  }),
  { totalItems: 0, totalAmount: 0 } as Summary
);
// => { totalItems: 6, totalAmount: 430 }
```

**重要なポイント:**

- reduceは単なる合計だけでなく、さまざまな集計に使える
- 初期値の型を明示することで型安全性が向上する
- 複雑な集計もreduceで表現できる

## 問題: `sumScores`の実装

### 要件

スコアオブジェクトの配列から合計点を計算する関数を実装してください。

入力として、以下の形式のスコアオブジェクトの配列を受け取ります：

```typescript
type Score = {
  subject: string;
  points: number;
};
```

出力として、すべてのスコアの `points` の合計値を返します。

### 成功条件

1. 配列のすべての `points` を合計する
2. 空の配列が渡された場合は `0` を返す
3. `reduce` 関数を使って実装する

### 実装ステップ

```typescript
export function sumScores(scores: readonly Score[]): number {
  // Step 1: reduce 関数を使って配列を処理
  // scores.reduce((accumulator, currentValue) => { ... }, initialValue)

  // Step 2: accumulator に points を加算
  // 各要素の points を accumulator に足していく

  // Step 3: 初期値を 0 に設定
  // 空の配列でもエラーにならないように初期値を指定
}
```

### テスト例

```typescript
// 通常のケース
sumScores([
  { subject: 'Math', points: 80 },
  { subject: 'English', points: 90 },
  { subject: 'Science', points: 85 },
]);
// => 255

// 空の配列
sumScores([]);
// => 0

// 単一要素
sumScores([{ subject: 'Math', points: 100 }]);
// => 100

// すべて0点
sumScores([
  { subject: 'Math', points: 0 },
  { subject: 'English', points: 0 },
]);
// => 0
```

## ヒント

### ヒント1: reduce の基本構文

```typescript
// 配列.reduce((累積値, 現在の要素) => 新しい累積値, 初期値)
const result = array.reduce((acc, current) => acc + current.value, 0);
```

### ヒント2: accumulator への加算

```typescript
// 現在の accumulator に points を加算して返す
scores.reduce((acc, score) => acc + score.points, 0);
```

### ヒント3: 完全な実装

```typescript
export function sumScores(scores: readonly Score[]): number {
  return scores.reduce((acc, score) => acc + score.points, 0);
}

// または、明示的に書くと
export function sumScores(scores: readonly Score[]): number {
  return scores.reduce((accumulator, currentScore) => {
    return accumulator + currentScore.points;
  }, 0);
}
```

### ヒント4: 型の推論

```typescript
// TypeScript は以下のように型を推論します:
scores.reduce((acc, score) => acc + score.points, 0);
//             ^^^  ^^^^^
//             |    |
//             |    Score 型（配列の要素型から推論）
//             number 型（初期値の型から推論）
```

## 学習のポイント

1. **reduce の理解**: 配列を単一の値に集計する強力な関数
2. **accumulator の役割**: 前回の処理結果を保持し、次の処理に渡す
3. **初期値の重要性**: 空配列でもエラーにならないように必ず指定
4. **型推論**: TypeScriptが初期値から型を自動的に推論してくれる

## よくある間違い

### 間違い1: 初期値を指定しない

```typescript
// ❌ 間違い: 空配列でエラーになる
function sumScores(scores: readonly Score[]): number {
  return scores.reduce((acc, score) => acc + score.points);
  // 空配列の場合、TypeError が発生
}

// ✅ 正解: 初期値を指定
function sumScores(scores: readonly Score[]): number {
  return scores.reduce((acc, score) => acc + score.points, 0);
}
```

### 間違い2: 戻り値を忘れる

```typescript
// ❌ 間違い: return がない
function sumScores(scores: readonly Score[]): number {
  scores.reduce((acc, score) => {
    acc + score.points; // これは何も返していない
  }, 0);
  return 0; // 常に 0 を返してしまう
}

// ✅ 正解: 加算結果を return
function sumScores(scores: readonly Score[]): number {
  return scores.reduce((acc, score) => acc + score.points, 0);
}
```

### 間違い3: forEach を使ってしまう

```typescript
// ❌ 非効率: forEach + 外部変数
function sumScores(scores: readonly Score[]): number {
  let sum = 0;
  scores.forEach((score) => {
    sum += score.points;
  });
  return sum;
}

// ✅ 推奨: reduce を使う
function sumScores(scores: readonly Score[]): number {
  return scores.reduce((acc, score) => acc + score.points, 0);
}
```

## 発展課題

この問題ができたら、以下にも挑戦してみましょう:

1. **平均点を計算**: `averageScores` 関数を実装
2. **最高点を見つける**: `maxScore` 関数を実装
3. **条件付き合計**: 特定の科目だけを合計する
4. **複数の集計を同時に**: 合計、平均、最大、最小を一度に計算

```typescript
// 例1: 平均点
function averageScores(scores: readonly Score[]): number {
  if (scores.length === 0) return 0;
  const sum = scores.reduce((acc, score) => acc + score.points, 0);
  return sum / scores.length;
}

// 例2: 最高点
function maxScore(scores: readonly Score[]): number {
  return scores.reduce((acc, score) => Math.max(acc, score.points), 0);
}

// 例3: 条件付き合計（Mathの科目のみ）
function sumMathScores(scores: readonly Score[]): number {
  return scores
    .filter((score) => score.subject === 'Math')
    .reduce((acc, score) => acc + score.points, 0);
}

// 例4: 複数の集計を同時に
type ScoreSummary = {
  total: number;
  average: number;
  max: number;
  min: number;
};

function summarizeScores(scores: readonly Score[]): ScoreSummary {
  if (scores.length === 0) {
    return { total: 0, average: 0, max: 0, min: 0 };
  }

  const summary = scores.reduce(
    (acc, score) => ({
      total: acc.total + score.points,
      max: Math.max(acc.max, score.points),
      min: Math.min(acc.min, score.points),
      count: acc.count + 1,
    }),
    { total: 0, max: 0, min: Infinity, count: 0 }
  );

  return {
    total: summary.total,
    average: summary.total / summary.count,
    max: summary.max,
    min: summary.min,
  };
}
```

## 次のステップ

この問題ができたら:

- `npm test` を実行して確認
- `npm run typecheck` で型エラーがないか確認
- Day07に進んで、配列のグルーピング（Map型の活用）を学習
