/**
 * Day11: タグ付きユニオン型（Discriminated Union Types）
 * TODO: この関数群を実装してください
 */

// APIレスポンスの状態を表すタグ付きユニオン型
export type ApiResponse<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

// ユーザー型の定義
export type User = {
  id: number;
  name: string;
  email: string;
};

/**
 * レスポンスがローディング中かチェックする
 * @param response - APIレスポンス
 * @returns ローディング中の場合true
 */
export function isLoading<T>(response: ApiResponse<T>): boolean {
  // ===== ステップ1: status が 'loading' かチェック =====
  // response.status === 'loading' を返すだけ
  // シンプルな等価比較で OK

  // TODO: ここに実装を書く

  throw new Error('Not implemented');
}

/**
 * レスポンスが成功かチェックする（型ガード関数）
 * @param response - APIレスポンス
 * @returns 成功の場合true、かつ型ガードとして機能
 */
export function isSuccess<T>(
  response: ApiResponse<T>
): response is { status: 'success'; data: T } {
  // ===== ステップ1: 型ガード関数の実装 =====
  // response.status === 'success' をチェック
  // 返り値の型が特殊: response is { status: 'success'; data: T }
  // これにより、if (isSuccess(response)) の中では response.data にアクセスできる

  // TODO: ここに実装を書く

  throw new Error('Not implemented');
}

/**
 * レスポンスがエラーかチェックする（型ガード関数）
 * @param response - APIレスポンス
 * @returns エラーの場合true、かつ型ガードとして機能
 */
export function isError<T>(
  response: ApiResponse<T>
): response is { status: 'error'; error: string } {
  // ===== ステップ1: 型ガード関数の実装 =====
  // response.status === 'error' をチェック
  // isSuccess と同じパターン

  // TODO: ここに実装を書く

  throw new Error('Not implemented');
}

/**
 * レスポンスに応じた適切なメッセージを返す
 * @param response - APIレスポンス（User[]型）
 * @returns 状態に応じたメッセージ文字列
 */
export function getResponseMessage(response: ApiResponse<User[]>): string {
  // ===== ステップ1: switch 文で status を判定 =====
  // switch (response.status) を使う
  //
  // ===== ステップ2: 各 case で適切なメッセージを返す =====
  // case 'loading': "Loading..." を返す
  // case 'success': "Success: X users loaded" を返す
  //   - X は response.data.length
  //   - テンプレートリテラルを使う: `Success: ${response.data.length} users loaded`
  // case 'error': "Error: [エラーメッセージ]" を返す
  //   - テンプレートリテラルを使う: `Error: ${response.error}`

  // TODO: ここに実装を書く

  throw new Error('Not implemented');
}

/**
 * 成功時のデータを取得、失敗時はデフォルト値を返す
 * @param response - APIレスポンス
 * @param defaultValue - 失敗時に返すデフォルト値
 * @returns 成功時はdata、それ以外はdefaultValue
 */
export function extractData<T>(
  response: ApiResponse<T>,
  defaultValue: T
): T {
  // ===== ステップ1: isSuccess を使って成功かチェック =====
  // if (isSuccess(response)) で判定
  // 型ガード関数を使うことで、response.data にアクセスできる
  //
  // ===== ステップ2: 成功なら response.data を返す =====
  // isSuccess が true の場合
  //
  // ===== ステップ3: それ以外なら defaultValue を返す =====
  // loading または error の場合

  // TODO: ここに実装を書く

  throw new Error('Not implemented');
}
