/**
 * Day11: apiResponse のテスト
 */

import {
  ApiResponse,
  User,
  isLoading,
  isSuccess,
  isError,
  getResponseMessage,
  extractData,
} from '../../solutions/day11/apiResponse';

describe('Day11: タグ付きユニオン型（Discriminated Union Types）', () => {
  // テスト用のデータ
  const testUsers: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' },
  ];

  const loadingResponse: ApiResponse<User[]> = { status: 'loading' };
  const successResponse: ApiResponse<User[]> = {
    status: 'success',
    data: testUsers,
  };
  const errorResponse: ApiResponse<User[]> = {
    status: 'error',
    error: 'Network error',
  };

  describe('isLoading', () => {
    test('正常系: ローディング状態の場合にtrueを返す', () => {
      expect(isLoading(loadingResponse)).toBe(true);
    });

    test('正常系: 成功状態の場合にfalseを返す', () => {
      expect(isLoading(successResponse)).toBe(false);
    });

    test('正常系: エラー状態の場合にfalseを返す', () => {
      expect(isLoading(errorResponse)).toBe(false);
    });

    test('正常系: ジェネリック型で動作する（string型）', () => {
      const stringLoading: ApiResponse<string> = { status: 'loading' };
      expect(isLoading(stringLoading)).toBe(true);
    });

    test('正常系: ジェネリック型で動作する（number型）', () => {
      const numberSuccess: ApiResponse<number> = { status: 'success', data: 42 };
      expect(isLoading(numberSuccess)).toBe(false);
    });
  });

  describe('isSuccess', () => {
    test('正常系: 成功状態の場合にtrueを返す', () => {
      expect(isSuccess(successResponse)).toBe(true);
    });

    test('正常系: ローディング状態の場合にfalseを返す', () => {
      expect(isSuccess(loadingResponse)).toBe(false);
    });

    test('正常系: エラー状態の場合にfalseを返す', () => {
      expect(isSuccess(errorResponse)).toBe(false);
    });

    test('型ガード: 成功時にdataプロパティにアクセスできる', () => {
      // TypeScriptの型チェックを確認するため、実際にdataにアクセス
      if (isSuccess(successResponse)) {
        // この中では successResponse.data が存在することが保証される
        expect(successResponse.data).toEqual(testUsers);
        expect(successResponse.data.length).toBe(3);
      } else {
        fail('isSuccess should return true for success response');
      }
    });

    test('型ガード: ジェネリック型で動作する', () => {
      const stringSuccess: ApiResponse<string> = {
        status: 'success',
        data: 'Hello',
      };
      if (isSuccess(stringSuccess)) {
        expect(stringSuccess.data).toBe('Hello');
      }
    });
  });

  describe('isError', () => {
    test('正常系: エラー状態の場合にtrueを返す', () => {
      expect(isError(errorResponse)).toBe(true);
    });

    test('正常系: ローディング状態の場合にfalseを返す', () => {
      expect(isError(loadingResponse)).toBe(false);
    });

    test('正常系: 成功状態の場合にfalseを返す', () => {
      expect(isError(successResponse)).toBe(false);
    });

    test('型ガード: エラー時にerrorプロパティにアクセスできる', () => {
      // TypeScriptの型チェックを確認するため、実際にerrorにアクセス
      if (isError(errorResponse)) {
        // この中では errorResponse.error が存在することが保証される
        expect(errorResponse.error).toBe('Network error');
      } else {
        fail('isError should return true for error response');
      }
    });

    test('型ガード: 異なるエラーメッセージでも動作する', () => {
      const customError: ApiResponse<User[]> = {
        status: 'error',
        error: 'Database connection failed',
      };
      if (isError(customError)) {
        expect(customError.error).toBe('Database connection failed');
      }
    });
  });

  describe('getResponseMessage', () => {
    test('正常系: ローディング状態の場合に"Loading..."を返す', () => {
      expect(getResponseMessage(loadingResponse)).toBe('Loading...');
    });

    test('正常系: 成功状態の場合に適切なメッセージを返す', () => {
      expect(getResponseMessage(successResponse)).toBe('Success: 3 users loaded');
    });

    test('正常系: エラー状態の場合に適切なメッセージを返す', () => {
      expect(getResponseMessage(errorResponse)).toBe('Error: Network error');
    });

    test('エッジケース: 空の配列の成功レスポンス', () => {
      const emptySuccess: ApiResponse<User[]> = {
        status: 'success',
        data: [],
      };
      expect(getResponseMessage(emptySuccess)).toBe('Success: 0 users loaded');
    });

    test('エッジケース: 1人だけの成功レスポンス', () => {
      const singleUserSuccess: ApiResponse<User[]> = {
        status: 'success',
        data: [{ id: 1, name: 'Alice', email: 'alice@example.com' }],
      };
      expect(getResponseMessage(singleUserSuccess)).toBe(
        'Success: 1 users loaded'
      );
    });

    test('正常系: 異なるエラーメッセージでも動作する', () => {
      const customError: ApiResponse<User[]> = {
        status: 'error',
        error: 'Server timeout',
      };
      expect(getResponseMessage(customError)).toBe('Error: Server timeout');
    });
  });

  describe('extractData', () => {
    test('正常系: 成功状態の場合にdataを返す', () => {
      const result = extractData(successResponse, []);
      expect(result).toEqual(testUsers);
    });

    test('正常系: ローディング状態の場合にdefaultValueを返す', () => {
      const defaultUsers: User[] = [
        { id: 999, name: 'Default', email: 'default@example.com' },
      ];
      const result = extractData(loadingResponse, defaultUsers);
      expect(result).toEqual(defaultUsers);
    });

    test('正常系: エラー状態の場合にdefaultValueを返す', () => {
      const defaultUsers: User[] = [];
      const result = extractData(errorResponse, defaultUsers);
      expect(result).toEqual(defaultUsers);
    });

    test('エッジケース: 空の配列が成功データの場合', () => {
      const emptySuccess: ApiResponse<User[]> = {
        status: 'success',
        data: [],
      };
      const result = extractData(emptySuccess, [
        { id: 999, name: 'Default', email: 'default@example.com' },
      ]);
      expect(result).toEqual([]); // 成功なので空配列が返る
    });

    test('正常系: ジェネリック型で動作する（string型）', () => {
      const stringSuccess: ApiResponse<string> = {
        status: 'success',
        data: 'Hello',
      };
      const stringLoading: ApiResponse<string> = { status: 'loading' };

      expect(extractData(stringSuccess, 'Default')).toBe('Hello');
      expect(extractData(stringLoading, 'Default')).toBe('Default');
    });

    test('正常系: ジェネリック型で動作する（number型）', () => {
      const numberSuccess: ApiResponse<number> = {
        status: 'success',
        data: 42,
      };
      const numberError: ApiResponse<number> = {
        status: 'error',
        error: 'Failed',
      };

      expect(extractData(numberSuccess, 0)).toBe(42);
      expect(extractData(numberError, 0)).toBe(0);
    });

    test('正常系: ジェネリック型で動作する（オブジェクト型）', () => {
      type Config = { theme: string; language: string };
      const configSuccess: ApiResponse<Config> = {
        status: 'success',
        data: { theme: 'dark', language: 'ja' },
      };
      const configError: ApiResponse<Config> = {
        status: 'error',
        error: 'Config not found',
      };
      const defaultConfig: Config = { theme: 'light', language: 'en' };

      expect(extractData(configSuccess, defaultConfig)).toEqual({
        theme: 'dark',
        language: 'ja',
      });
      expect(extractData(configError, defaultConfig)).toEqual(defaultConfig);
    });
  });

  describe('統合テスト: 型ガードの実践的な使用', () => {
    test('isSuccessとisErrorを組み合わせた処理', () => {
      const processResponse = (response: ApiResponse<User[]>): string => {
        if (isSuccess(response)) {
          return `Found ${response.data.length} users`;
        } else if (isError(response)) {
          return `Failed: ${response.error}`;
        } else {
          return 'Processing...';
        }
      };

      expect(processResponse(successResponse)).toBe('Found 3 users');
      expect(processResponse(errorResponse)).toBe('Failed: Network error');
      expect(processResponse(loadingResponse)).toBe('Processing...');
    });

    test('複数の型ガードを連続して使用', () => {
      const responses: ApiResponse<User[]>[] = [
        loadingResponse,
        successResponse,
        errorResponse,
      ];

      const successCount = responses.filter(isSuccess).length;
      const errorCount = responses.filter(isError).length;
      const loadingCount = responses.filter(isLoading).length;

      expect(successCount).toBe(1);
      expect(errorCount).toBe(1);
      expect(loadingCount).toBe(1);
    });
  });
});
