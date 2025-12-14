---
name: ts-problem-creator
description: Create TypeScript learning problems with README, starter code, and tests. Use when user requests "create problem", "today's problem", "add exercise", or mentions TypeScript topics (generics, arrays, unions, etc). Auto-detects next day number and suggests topics from roadmap.
---

# TypeScript Problem Creator

TypeScript学習用の問題を自動作成するスキルです。

## 使い方

このスキルは以下のようなリクエストで自動起動します：

- "今日の問題を作って"
- "配列操作の問題を追加して"
- "次の問題を作成して"
- "ジェネリクスについての問題が欲しい"

## 問題作成ワークフロー

### ステップ1: Day番号とテーマの決定

**Day番号の自動決定:**

```bash
# 既存のdayフォルダを確認
ls src/ | grep "^day" | sort -V | tail -1
# 例: day01 が存在 → 次は day02
```

**テーマの決定:**

**ユーザーがテーマを指定した場合:**

- ユーザーの指定を優先
- ロードマップは参考程度

**ユーザーがテーマを指定しなかった場合（「今日の問題を作って」など）:**

1. `typescript-roadmap.md`を読み込む
2. Day番号に対応する行を検索（例: `| 02 |`で始まる行）
3. テーマ、関数名例、学習内容を抽出
4. 以下のように提案する:

```text
次はDay02です。学習ロードマップによると、以下のテーマを推奨しています：

📘 **Day02: 配列のフィルタリング**
- 学習内容: 配列操作、型ガード、filter関数
- 推奨関数名: `filterValid`
- 難易度: 初級

このテーマで問題を作成しますか？
それとも別のテーマがご希望ですか？
```

5. ユーザーの確認を待つ（「はい」「OK」など → 自動作成、具体的なテーマ指定 → そのテーマで作成）

### ステップ2: ファイル作成

以下のファイルを作成します：

#### A. `src/dayXX/README.md`

```markdown
# DayXX: [テーマ名]

## 学習目標
- [目標1]
- [目標2]
- [目標3]

## 背景知識

### [概念1のタイトル]
[概念の説明]

\`\`\`typescript
// サンプルコード
\`\`\`

### [概念2のタイトル]
[概念の説明]

\`\`\`typescript
// サンプルコード
\`\`\`

## 問題: [関数名]の実装

### 要件

[関数の説明]

- 入力: [型と説明]
- 出力: [型と説明]

### 成功条件

入力が以下の条件を満たす場合：

1. [条件1]
2. [条件2]
3. [条件3]

### 実装ステップ

\`\`\`typescript
export function functionName(param: Type): ReturnType {
  // Step 1: [ステップ1の説明]

  // Step 2: [ステップ2の説明]

  // Step 3: [ステップ3の説明]
}
\`\`\`

### テスト例

\`\`\`typescript
// 成功ケース
functionName(input1)
// => expected1

// 失敗ケース
functionName(input2)
// => expected2
\`\`\`

## ヒント

### [ヒント1のタイトル]

\`\`\`typescript
// ヒントのコード例
\`\`\`

### [ヒント2のタイトル]

\`\`\`typescript
// ヒントのコード例
\`\`\`

## 学習のポイント

1. [ポイント1]
2. [ポイント2]
3. [ポイント3]

## 次のステップ

この問題ができたら：

- テストを書いて動作確認する
- `npm test`を実行して確認
- [次の発展的な課題]
```

#### B. 問題テンプレートファイル

**`src/dayXX/[問題ファイル名].ts` と `solutions/dayXX/[問題ファイル名].ts`を両方作成（同じ内容）:**

```typescript
/**
 * DayXX: [テーマ名]
 * TODO: この関数を実装してください
 */

// 必要な型定義
export type SomeType = {
  // ...
};

// メイン関数（TODO実装）
export function functionName(param: ParamType): ReturnType {
  // ===== ステップ1: [ステップ1の説明] =====
  // [条件の説明]
  // [期待される処理]

  // TODO: ここにステップ1のコードを書く


  // ===== ステップ2: [ステップ2の説明] =====
  // [条件の説明]
  // [期待される処理]

  // TODO: ここにステップ2のコードを書く


  // ===== ステップ3: [ステップ3の説明] =====
  // [最終的な処理]
  // [返り値の説明]

  // TODO: ここにステップ3のコードを書く

  throw new Error('Not implemented');
}

// 補助関数が必要な場合
// export function helperFunction(...) { ... }
```

#### C. テストファイル

**`tests/dayXX/[問題ファイル名].test.ts`:**

```typescript
/**
 * DayXX: [関数名]のテスト
 */

import { functionName } from '../../solutions/dayXX/[ファイル名]';

describe('functionName', () => {
  test('正常系: [テストケース1の説明]', () => {
    const result = functionName([入力]);
    expect(result).toEqual([期待される出力]);
  });

  test('正常系: [テストケース2の説明]', () => {
    const result = functionName([入力]);
    expect(result).toEqual([期待される出力]);
  });

  test('異常系: [エラーケース1の説明]', () => {
    const result = functionName([不正な入力]);
    expect(result).toEqual([期待されるエラー]);
  });

  test('異常系: [エラーケース2の説明]', () => {
    const result = functionName([不正な入力]);
    expect(result).toEqual([期待されるエラー]);
  });

  test('エッジケース: [特殊ケースの説明]', () => {
    const result = functionName([エッジケース入力]);
    expect(result).toEqual([期待される出力]);
  });
});
```

**テスト作成のポイント:**

- 必ず具体的な入力値と期待値を書く
- 未実装の状態でテストを実行すると失敗する（これが正しい状態）
- 最低3つのテストケース（正常系1つ、異常系1つ、エッジケース1つ）を含める

### ステップ3: 動作確認

```bash
# 型エラーがないか確認
npm run typecheck

# テストが認識されているか確認
npm test
```

### ステップ4: ユーザーへの案内

問題作成後、以下を提示：

```markdown
## 作成完了！

📁 作成されたファイル:
- src/dayXX/README.md
- src/dayXX/[ファイル名].ts
- solutions/dayXX/[ファイル名].ts
- tests/dayXX/[ファイル名].test.ts

📝 問題を解く手順:

### 1. 問題テンプレートをコミット

\`\`\`bash
git add src/dayXX/ tests/dayXX/
git commit -m "Add DayXX problem: [テーマ名]"
\`\`\`

### 2. 実装する

- `solutions/dayXX/[ファイル名].ts`を開く
- `src/dayXX/README.md`を参照して問題を理解
- ヒントを見ながら段階的に実装

### 3. テストする

\`\`\`bash
npm test
# または特定のDayのみ
npm test -- dayXX

# 型チェック
npm run typecheck
\`\`\`

### 使い方のポイント

- `src/` = 問題テンプレート（触らない、Git管理）
- `solutions/` = あなたの実装（触る、Git管理外）
- テストは `solutions/` のファイルを自動的に読み込みます
- やり直したい場合: `src/` から `solutions/` にコピーし直す
```

## 品質基準

作成する問題は以下の基準を満たす必要があります：

### 必須要件

- ✅ `any`型を一切使用しない
- ✅ `strict: true`でコンパイルが通る
- ✅ README.mdに十分な説明がある
- ✅ 実装ステップが明確
- ✅ 最低3つのテストケースがある

### 推奨要件

- ✅ 背景知識が初心者にわかりやすい
- ✅ ヒントが段階的（答えを直接書かない）
- ✅ テスト例が具体的
- ✅ 次のステップへの導線がある

### 避けるべきこと

- ❌ いきなり難しい概念を使う
- ❌ 説明なしに専門用語を使う
- ❌ ヒントが不十分
- ❌ テストケースが曖昧

## ファイル命名規則

- ディレクトリ: `dayXX`（数字は2桁、例: day01, day02, day15）
- ソースファイル: キャメルケース（例: `parseUser.ts`, `filterArray.ts`）
- テストファイル: ソースと同名 + `.test.ts`（例: `parseUser.test.ts`）
- README: 常に `README.md`

## 重要な注意事項

1. **Day番号**: ユーザーに質問せず、自動でインクリメント
2. **ファイル配置**: `src/` と `solutions/` の両方に同じ問題テンプレートを作成
3. **テストのインポート**: 必ず `solutions/` からインポートする
4. **ロードマップ参照**: ユーザーがテーマを指定しない場合のみ
