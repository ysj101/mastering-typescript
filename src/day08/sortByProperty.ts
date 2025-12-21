/**
 * Day08: 配列のソート
 * TODO: この関数を実装してください
 */

// 商品の型定義
export type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

// ソート順序の型定義
export type SortOrder = 'asc' | 'desc';

/**
 * 商品の配列を指定されたプロパティでソートする
 * @param products - 商品の配列
 * @param key - ソートに使用するプロパティ名
 * @param order - ソート順序（'asc' = 昇順, 'desc' = 降順）
 * @returns ソートされた新しい配列
 */
export function sortByProperty(
  products: readonly Product[],
  key: keyof Product,
  order: SortOrder = 'asc'
): Product[] {
  // ===== ステップ1: 元の配列のコピーを作成 =====
  // スプレッド構文 [...products] を使って、元の配列を変更しないようにします
  // これにより非破壊的なソートが実現できます

  // TODO: ここにステップ1のコードを書く

  // ===== ステップ2: コピーした配列をソート =====
  // sort() メソッドと比較関数を使います
  // 比較関数: (a, b) => { ... }

  // TODO: ここにステップ2のコードを書く

  // ===== ステップ3: プロパティの値を取得 =====
  // a[key] と b[key] で、指定されたプロパティの値を取得します
  // keyof Product により、型安全にアクセスできます

  // TODO: ここにステップ3のコードを書く

  // ===== ステップ4: 数値か文字列かで比較方法を分ける =====
  // typeof で型を判定します
  // - 数値の場合: aValue - bValue（昇順）
  // - 文字列の場合: aValue.localeCompare(bValue)

  // TODO: ここにステップ4のコードを書く

  // ===== ステップ5: order が 'desc' の場合は結果を反転 =====
  // 比較結果に -1 を掛けることで、降順にできます

  // TODO: ここにステップ5のコードを書く

  throw new Error('Not implemented');
}
