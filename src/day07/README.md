# Day07: 配列のグルーピング

## 学習目標

- **Map型**の使い方を理解する
- 配列を**カテゴリ別にグループ化**する方法を学ぶ
- **型安全な辞書操作**のパターンを習得する

## 背景知識

### Map型とは

JavaScriptの`Map`は、キーと値のペアを保持するコレクションです。オブジェクト`{}`と似ていますが、以下の利点があります：

```typescript
// オブジェクトの場合（キーは文字列またはシンボルのみ）
const obj: { [key: string]: number } = {};
obj['key1'] = 100;

// Mapの場合（任意の型をキーにできる）
const map = new Map<string, number>();
map.set('key1', 100);

// Mapの主なメソッド
map.set('key2', 200);        // 値を設定
map.get('key1');             // => 100
map.has('key1');             // => true
map.delete('key2');          // 削除
map.size;                    // => 1
```

TypeScriptでのMap型：

```typescript
// Map<K, V> - Kがキーの型、Vが値の型
const usersByAge = new Map<number, string[]>();
usersByAge.set(20, ['Alice', 'Bob']);
usersByAge.set(30, ['Charlie']);

// 型安全にアクセス
const users = usersByAge.get(20); // string[] | undefined
```

### 配列のグルーピングパターン

配列を特定の基準でグループ化するのは、よくあるパターンです：

```typescript
type Product = {
  name: string;
  category: string;
  price: number;
};

const products: Product[] = [
  { name: 'Apple', category: 'Fruit', price: 100 },
  { name: 'Carrot', category: 'Vegetable', price: 80 },
  { name: 'Banana', category: 'Fruit', price: 120 },
];

// カテゴリ別にグループ化したい
// => Map {
//      'Fruit' => [{ name: 'Apple', ... }, { name: 'Banana', ... }],
//      'Vegetable' => [{ name: 'Carrot', ... }]
//    }
```

### Map.getとMap.setの組み合わせ

グループ化では「既存のグループに追加」または「新規グループを作成」のロジックが必要です：

```typescript
const groups = new Map<string, number[]>();

// 値を追加する関数
function addToGroup(key: string, value: number) {
  const existing = groups.get(key);

  if (existing) {
    // 既にグループが存在する場合は追加
    existing.push(value);
  } else {
    // 新規グループを作成
    groups.set(key, [value]);
  }
}

addToGroup('A', 1);
addToGroup('A', 2);
addToGroup('B', 3);

// => Map { 'A' => [1, 2], 'B' => [3] }
```

## 問題: `groupByCategory`の実装

### 要件

商品の配列を受け取り、**カテゴリごとにグループ化**した`Map`を返す関数を実装してください。

- 入力: `Product[]` - 商品オブジェクトの配列
- 出力: `Map<string, Product[]>` - カテゴリをキー、商品配列を値とするMap

```typescript
type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
};
```

### 成功条件

入力が以下の条件を満たす場合：

1. 同じカテゴリの商品は同じグループにまとめられる
2. 各カテゴリのグループは配列として保持される
3. 入力配列が空の場合は空のMapを返す
4. カテゴリの順序は最初に登場した順序を保つ

### 実装ステップ

```typescript
export function groupByCategory(products: Product[]): Map<string, Product[]> {
  // Step 1: 結果を格納するMapを作成

  // Step 2: 各商品を繰り返し処理
  //   - 商品のカテゴリを取得
  //   - そのカテゴリのグループが既に存在するかチェック
  //   - 存在する場合: そのグループに商品を追加
  //   - 存在しない場合: 新しいグループを作成して商品を追加

  // Step 3: 完成したMapを返す
}
```

### テスト例

```typescript
const products: Product[] = [
  { id: 1, name: 'Apple', category: 'Fruit', price: 100 },
  { id: 2, name: 'Carrot', category: 'Vegetable', price: 80 },
  { id: 3, name: 'Banana', category: 'Fruit', price: 120 },
  { id: 4, name: 'Spinach', category: 'Vegetable', price: 90 },
];

const result = groupByCategory(products);

// => Map {
//      'Fruit' => [
//        { id: 1, name: 'Apple', category: 'Fruit', price: 100 },
//        { id: 3, name: 'Banana', category: 'Fruit', price: 120 }
//      ],
//      'Vegetable' => [
//        { id: 2, name: 'Carrot', category: 'Vegetable', price: 80 },
//        { id: 4, name: 'Spinach', category: 'Vegetable', price: 90 }
//      ]
//    }

result.get('Fruit');     // => [{ id: 1, ... }, { id: 3, ... }]
result.get('Vegetable'); // => [{ id: 2, ... }, { id: 4, ... }]
result.size;             // => 2

// 空の配列の場合
groupByCategory([]);     // => Map {} (空のMap)
```

## ヒント

### ヒント1: Mapの基本操作

```typescript
// Mapの作成
const map = new Map<string, Product[]>();

// 値の取得（存在しない場合はundefined）
const group = map.get('Fruit'); // Product[] | undefined

// 値の設定
map.set('Fruit', [product1, product2]);

// キーの存在確認
if (map.has('Fruit')) {
  // ...
}
```

### ヒント2: グループへの追加パターン

```typescript
// パターン1: has()で存在確認
if (map.has(category)) {
  const existing = map.get(category)!; // !で非nullをアサート
  existing.push(product);
} else {
  map.set(category, [product]);
}

// パターン2: get()の結果で判定
const existing = map.get(category);
if (existing) {
  existing.push(product);
} else {
  map.set(category, [product]);
}
```

### ヒント3: for...ofループでの配列走査

```typescript
for (const product of products) {
  const category = product.category;
  // グループ化のロジック
}
```

## 学習のポイント

1. **Map vs オブジェクト**
   - Mapは任意の型をキーにできる
   - Mapはキーの挿入順序を保持する
   - サイズの取得が容易（`.size`プロパティ）

2. **型安全なグループ化**
   - `Map<K, V[]>`パターンでグループを表現
   - `get()`は`V | undefined`を返すことに注意
   - 非nullアサーション`!`または条件分岐で対処

3. **ミュータブルな操作**
   - Mapから取得した配列に直接`push()`できる
   - 参照を保持しているため、変更が反映される

## 次のステップ

この問題ができたら：

- `npm test -- day07`を実行して確認
- `npm run typecheck`で型エラーがないかチェック
- 複数のプロパティでグループ化する拡張版に挑戦
  - 例: カテゴリと価格帯の組み合わせでグループ化
- Day08の「配列のソート」に進む
