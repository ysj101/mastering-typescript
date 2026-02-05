/**
 * Day13: Mapped Typesのテスト
 */

import { MyPartial, MyReadonly } from '../../solutions/day13/mappedTypes';

// テスト用の型定義
type User = {
  id: number;
  name: string;
  email: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
};

describe('MyPartial', () => {
  test('すべてのプロパティがオプショナルになる', () => {
    type PartialUser = MyPartial<User>;

    // すべてのプロパティがオプショナルなので、空オブジェクトも許容される
    const user1: PartialUser = {};
    expect(user1).toEqual({});
  });

  test('一部のプロパティだけを指定できる', () => {
    type PartialUser = MyPartial<User>;

    const user2: PartialUser = { name: 'Alice' };
    expect(user2).toEqual({ name: 'Alice' });

    const user3: PartialUser = { id: 1, email: 'test@example.com' };
    expect(user3).toEqual({ id: 1, email: 'test@example.com' });
  });

  test('すべてのプロパティを指定することもできる', () => {
    type PartialUser = MyPartial<User>;

    const user4: PartialUser = { id: 1, name: 'Bob', email: 'bob@example.com' };
    expect(user4).toEqual({ id: 1, name: 'Bob', email: 'bob@example.com' });
  });

  test('複雑な型でも動作する', () => {
    type PartialProduct = MyPartial<Product>;

    const product1: PartialProduct = {};
    expect(product1).toEqual({});

    const product2: PartialProduct = { name: 'Book', price: 1000 };
    expect(product2).toEqual({ name: 'Book', price: 1000 });
  });
});

describe('MyReadonly', () => {
  test('オブジェクトを作成できる', () => {
    type ReadonlyUser = MyReadonly<User>;

    const user: ReadonlyUser = { id: 1, name: 'Alice', email: 'alice@example.com' };
    expect(user).toEqual({ id: 1, name: 'Alice', email: 'alice@example.com' });
  });

  test('型レベルでreadonly制約が適用されている（型チェックのみ）', () => {
    type ReadonlyUser = MyReadonly<User>;

    const user: ReadonlyUser = { id: 1, name: 'Alice', email: 'alice@example.com' };

    // 以下のコメントを外すと、TypeScriptのコンパイルエラーになることを確認できる
    // user.id = 2; // Error: Cannot assign to 'id' because it is a read-only property
    // user.name = 'Bob'; // Error: Cannot assign to 'name' because it is a read-only property

    // 実際には値は読み取れる
    expect(user.id).toBe(1);
    expect(user.name).toBe('Alice');
  });

  test('複雑な型でも動作する', () => {
    type ReadonlyProduct = MyReadonly<Product>;

    const product: ReadonlyProduct = { id: 1, name: 'Book', price: 1000, inStock: true };
    expect(product).toEqual({ id: 1, name: 'Book', price: 1000, inStock: true });

    // 以下のコメントを外すと、TypeScriptのコンパイルエラーになることを確認できる
    // product.price = 1200; // Error: Cannot assign to 'price' because it is a read-only property
  });
});

describe('MyPartialとMyReadonlyの組み合わせ', () => {
  test('両方を組み合わせて使える', () => {
    // MyPartial<MyReadonly<User>>やMyReadonly<MyPartial<User>>のような組み合わせも可能
    type PartialReadonlyUser = MyPartial<MyReadonly<User>>;

    const user: PartialReadonlyUser = { name: 'Alice' };
    expect(user).toEqual({ name: 'Alice' });

    // 以下のコメントを外すと、TypeScriptのコンパイルエラーになることを確認できる
    // user.name = 'Bob'; // Error: Cannot assign to 'name' because it is a read-only property
  });
});
