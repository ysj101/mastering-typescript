# Day11: タグ付きユニオン型（Discriminated Union Types）

## 学習目標

- タグ付きユニオン型の基本概念を理解する
- discriminatorプロパティを使った型の絞り込みを学ぶ
- 実務で役立つResult型パターンを習得する
- 型安全なエラーハンドリングを実装する

## 背景知識

### タグ付きユニオン型とは

タグ付きユニオン型（Discriminated Union Types）は、共通のプロパティ（discriminator）を持つ複数の型を組み合わせた型です。このパターンにより、TypeScriptが自動的に型を絞り込んでくれます。

```typescript
// 基本的な例
type Success = {
  status: 'success';
  data: string;
};

type Error = {
  status: 'error';
  message: string;
};

type Result = Success | Error;

// TypeScriptは status プロパティで型を判別できる
function handleResult(result: Result) {
  if (result.status === 'success') {
    // ここでは result は Success 型
    console.log(result.data); // OK
    // console.log(result.message); // エラー: Success に message はない
  } else {
    // ここでは result は Error 型
    console.log(result.message); // OK
    // console.log(result.data); // エラー: Error に data はない
  }
}
```

### discriminatorプロパティの役割

discriminatorは、ユニオン型のどの型かを判別するための共通プロパティです：

```typescript
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rectangle'; width: number; height: number }
  | { kind: 'square'; size: number };

// kind が discriminator
function getArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'rectangle':
      return shape.width * shape.height;
    case 'square':
      return shape.size ** 2;
  }
}
```

**discriminatorの特徴:**
- リテラル型（文字列リテラルや数値リテラル）を使用
- ユニオン内のすべての型で同じ名前
- 各型で異なる値を持つ

### 型の絞り込み（Type Narrowing）

TypeScriptは、条件分岐内で自動的に型を絞り込みます：

```typescript
type APIResponse =
  | { status: 'loading' }
  | { status: 'success'; data: User[] }
  | { status: 'error'; error: string };

function handleResponse(response: APIResponse) {
  // if文による絞り込み
  if (response.status === 'success') {
    // response は { status: 'success'; data: User[] } 型
    response.data.forEach(user => console.log(user));
  }

  // switch文による絞り込み
  switch (response.status) {
    case 'loading':
      // response は { status: 'loading' } 型
      console.log('Loading...');
      break;
    case 'success':
      // response は { status: 'success'; data: User[] } 型
      console.log('Data:', response.data);
      break;
    case 'error':
      // response は { status: 'error'; error: string } 型
      console.error('Error:', response.error);
      break;
  }
}
```

### Result型パターン

エラーハンドリングでよく使われるパターンです：

```typescript
type Result<T, E = Error> =
  | { success: true; value: T }
  | { success: false; error: E };

// 使用例
function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return { success: false, error: 'Division by zero' };
  }
  return { success: true, value: a / b };
}

const result = divide(10, 2);
if (result.success) {
  console.log('Result:', result.value); // 5
} else {
  console.error('Error:', result.error);
}
```

### 実務での活用例

#### ケース1: APIレスポンスの状態管理

```typescript
type LoadingState<T> =
  | { type: 'idle' }
  | { type: 'loading' }
  | { type: 'success'; data: T }
  | { type: 'error'; error: Error };

// Reactでの使用例
function UserList() {
  const [state, setState] = useState<LoadingState<User[]>>({ type: 'idle' });

  useEffect(() => {
    setState({ type: 'loading' });
    fetchUsers()
      .then(data => setState({ type: 'success', data }))
      .catch(error => setState({ type: 'error', error }));
  }, []);

  // 型安全なレンダリング
  switch (state.type) {
    case 'idle':
      return <div>Click to load</div>;
    case 'loading':
      return <div>Loading...</div>;
    case 'success':
      return <ul>{state.data.map(user => <li>{user.name}</li>)}</ul>;
    case 'error':
      return <div>Error: {state.error.message}</div>;
  }
}
```

#### ケース2: イベントハンドリング

```typescript
type UserEvent =
  | { type: 'login'; userId: string; timestamp: Date }
  | { type: 'logout'; userId: string; timestamp: Date }
  | { type: 'purchase'; userId: string; itemId: string; amount: number }
  | { type: 'pageview'; userId: string; url: string };

function trackEvent(event: UserEvent) {
  switch (event.type) {
    case 'login':
      analytics.track('User Login', { userId: event.userId });
      break;
    case 'logout':
      analytics.track('User Logout', { userId: event.userId });
      break;
    case 'purchase':
      analytics.track('Purchase', {
        userId: event.userId,
        itemId: event.itemId,
        amount: event.amount,
      });
      break;
    case 'pageview':
      analytics.track('Page View', {
        userId: event.userId,
        url: event.url,
      });
      break;
  }
}
```

#### ケース3: フォームの検証結果

```typescript
type ValidationResult<T> =
  | { valid: true; value: T }
  | { valid: false; errors: string[] };

function validateEmail(email: string): ValidationResult<string> {
  const errors: string[] = [];

  if (!email) {
    errors.push('Email is required');
  }
  if (!email.includes('@')) {
    errors.push('Email must contain @');
  }
  if (email.length < 5) {
    errors.push('Email is too short');
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return { valid: true, value: email.toLowerCase() };
}

const result = validateEmail('user@example.com');
if (result.valid) {
  console.log('Valid email:', result.value);
} else {
  console.error('Validation errors:', result.errors);
}
```

## 問題: APIレスポンスハンドリングの実装

### 要件

API呼び出しの結果を表すタグ付きユニオン型と、それを処理する関数を実装してください。

**型定義:**

```typescript
// APIレスポンスの状態を表す型
type ApiResponse<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

// ユーザー型
type User = {
  id: number;
  name: string;
  email: string;
};
```

**実装する関数:**

1. `isLoading`: レスポンスがローディング中かチェック
   - 入力: `response: ApiResponse<T>`
   - 出力: `boolean`

2. `isSuccess`: レスポンスが成功かチェック
   - 入力: `response: ApiResponse<T>`
   - 出力: `response is { status: 'success'; data: T }`（型ガード）

3. `isError`: レスポンスがエラーかチェック
   - 入力: `response: ApiResponse<T>`
   - 出力: `response is { status: 'error'; error: string }`（型ガード）

4. `getResponseMessage`: レスポンスに応じたメッセージを返す
   - 入力: `response: ApiResponse<User[]>`
   - 出力: `string`

5. `extractData`: 成功時のデータを取得、失敗時はデフォルト値を返す
   - 入力: `response: ApiResponse<T>`, `defaultValue: T`
   - 出力: `T`

### 成功条件

各関数が以下の条件を満たす場合に成功とします：

1. **isLoading**: `status`が`'loading'`の場合に`true`を返す
2. **isSuccess**: `status`が`'success'`の場合に`true`を返し、型ガードとして機能する
3. **isError**: `status`が`'error'`の場合に`true`を返し、型ガードとして機能する
4. **getResponseMessage**:
   - loading → "Loading..."
   - success → "Success: X users loaded"（Xはユーザー数）
   - error → "Error: [エラーメッセージ]"
5. **extractData**: 成功時は`data`を返し、それ以外は`defaultValue`を返す

### 実装ステップ

#### 1. isLoading の実装

```typescript
export function isLoading<T>(response: ApiResponse<T>): boolean {
  // Step 1: response.status が 'loading' かチェック
  // ヒント: 単純な等価比較で OK
}
```

#### 2. isSuccess の実装（型ガード）

```typescript
export function isSuccess<T>(
  response: ApiResponse<T>
): response is { status: 'success'; data: T } {
  // Step 1: response.status が 'success' かチェック
  // ヒント: 返り値の型が特殊（型ガード関数）
  // これにより、if (isSuccess(response)) の中では response.data にアクセスできる
}
```

#### 3. isError の実装（型ガード）

```typescript
export function isError<T>(
  response: ApiResponse<T>
): response is { status: 'error'; error: string } {
  // Step 1: response.status が 'error' かチェック
  // ヒント: isSuccess と同じパターン
}
```

#### 4. getResponseMessage の実装

```typescript
export function getResponseMessage(response: ApiResponse<User[]>): string {
  // Step 1: switch 文で response.status を判定
  // Step 2: 各 case で適切なメッセージを返す
  //   - 'loading': "Loading..."
  //   - 'success': "Success: X users loaded" (response.data.length を使う)
  //   - 'error': "Error: [エラーメッセージ]" (response.error を使う)
}
```

#### 5. extractData の実装

```typescript
export function extractData<T>(
  response: ApiResponse<T>,
  defaultValue: T
): T {
  // Step 1: isSuccess を使って成功かチェック
  // Step 2: 成功なら response.data を返す
  // Step 3: それ以外なら defaultValue を返す
}
```

### テスト例

```typescript
const loadingResponse: ApiResponse<User[]> = { status: 'loading' };
const successResponse: ApiResponse<User[]> = {
  status: 'success',
  data: [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
  ],
};
const errorResponse: ApiResponse<User[]> = {
  status: 'error',
  error: 'Network error',
};

// isLoading
isLoading(loadingResponse); // => true
isLoading(successResponse); // => false

// isSuccess（型ガードとして機能）
if (isSuccess(successResponse)) {
  console.log(successResponse.data); // OK: TypeScriptが型を理解
}

// isError（型ガードとして機能）
if (isError(errorResponse)) {
  console.log(errorResponse.error); // OK: TypeScriptが型を理解
}

// getResponseMessage
getResponseMessage(loadingResponse); // => "Loading..."
getResponseMessage(successResponse); // => "Success: 2 users loaded"
getResponseMessage(errorResponse); // => "Error: Network error"

// extractData
extractData(successResponse, []); // => [{ id: 1, ... }, { id: 2, ... }]
extractData(errorResponse, []); // => []
```

## ヒント

### ヒント1: 型ガード関数とは

```typescript
// 通常の boolean を返す関数
function isSuccess(response: ApiResponse<T>): boolean {
  return response.status === 'success';
}

// 型ガード関数（response is ... を使う）
function isSuccess<T>(
  response: ApiResponse<T>
): response is { status: 'success'; data: T } {
  return response.status === 'success';
}

// 型ガードの効果
const response = getResponse();
if (isSuccess(response)) {
  // TypeScriptは response が { status: 'success'; data: T } 型だと理解
  console.log(response.data); // エラーなし
}
```

### ヒント2: switch文での型の絞り込み

```typescript
function handleResponse(response: ApiResponse<string>) {
  switch (response.status) {
    case 'loading':
      // response は { status: 'loading' } 型
      return 'Loading...';
    case 'success':
      // response は { status: 'success'; data: string } 型
      return response.data; // OK
    case 'error':
      // response は { status: 'error'; error: string } 型
      return response.error; // OK
  }
}
```

### ヒント3: ジェネリック型の活用

```typescript
// ジェネリック型 T は、どんな型のデータでも扱える
function extractData<T>(response: ApiResponse<T>, defaultValue: T): T {
  // T は User[], string, number など何でも OK
}

// 使用時に型が決まる
extractData<User[]>(userResponse, []);
extractData<string>(stringResponse, '');
```

### ヒント4: 型の絞り込みパターン

```typescript
// パターン1: if文
if (response.status === 'success') {
  return response.data;
}

// パターン2: 三項演算子
return response.status === 'success' ? response.data : defaultValue;

// パターン3: 型ガード関数を使う
if (isSuccess(response)) {
  return response.data;
}
return defaultValue;
```

## 学習のポイント

1. **discriminatorの重要性**
   - 共通のプロパティ（`status`など）で型を判別
   - リテラル型を使うことでTypeScriptが自動的に型を絞り込む
   - 実行時とコンパイル時の両方で安全性を確保

2. **型ガード関数**
   - `response is Type` を使った型の絞り込み
   - TypeScriptに型情報を伝える
   - if文の中で型が自動的に絞り込まれる

3. **エラーハンドリングのパターン**
   - Result型パターンで型安全なエラー処理
   - 例外を投げずに、型で成功/失敗を表現
   - すべてのケースを処理する保証

4. **実務での活用**
   - API呼び出しの状態管理
   - イベントシステムの設計
   - 複雑なビジネスロジックの型安全な実装

## 次のステップ

この問題ができたら：

- テストを書いて動作確認する
- `npm test -- day11`を実行して確認
- 型チェックも通ることを確認: `npm run typecheck`
- より複雑なタグ付きユニオン型に挑戦してみる
  - ネストしたタグ付きユニオン型
  - 複数のdiscriminatorを持つ型
- Day12に進んで次のトピックを学ぶ準備をする
