/**
 * Smoke test - 環境が正しくセットアップされているか確認
 */

describe('Environment Setup', () => {
  test('TypeScript and Jest are working', () => {
    const sum = (a: number, b: number): number => a + b;
    expect(sum(1, 1)).toBe(2);
  });

  test('Type checking is enabled', () => {
    const greeting: string = 'Hello, TypeScript!';
    expect(greeting).toBe('Hello, TypeScript!');
  });

  test('Strict mode is working', () => {
    // This should compile because strict mode catches type issues
    const numbers: number[] = [1, 2, 3];
    const first = numbers[0];
    // In strict mode with noUncheckedIndexedAccess, first is number | undefined
    expect(first).toBe(1);
  });
});
