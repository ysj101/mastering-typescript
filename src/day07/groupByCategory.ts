/**
 * Day07: 配列のグルーピング
 * TODO: この関数を実装してください
 */

// 商品の型定義
export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
};

/**
 * 商品の配列をカテゴリごとにグループ化する
 * @param products - 商品の配列
 * @returns カテゴリをキー、商品配列を値とするMap
 */
export function groupByCategory(products: Product[]): Map<string, Product[]> {
  // ===== ステップ1: 結果を格納するMapを作成 =====
  // Map<string, Product[]>型のMapを作成します
  // キーはカテゴリ名（string）、値は商品の配列（Product[]）

  // TODO: ここにステップ1のコードを書く

  // ===== ステップ2: 各商品を繰り返し処理 =====
  // for...ofループで各商品を処理します
  // 1. 商品のカテゴリを取得
  // 2. そのカテゴリのグループが既にMapに存在するかチェック
  // 3. 存在する場合: そのグループ（配列）に商品を追加
  // 4. 存在しない場合: 新しいグループを作成して商品を追加

  // TODO: ここにステップ2のコードを書く

  // ===== ステップ3: 完成したMapを返す =====
  // グループ化が完了したMapを返します

  // TODO: ここにステップ3のコードを書く

  throw new Error('Not implemented');
}
