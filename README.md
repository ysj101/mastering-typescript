# mastering-typescript

TypeScript学習用の問題集プロジェクト。60日間のロードマップに沿って、基礎から上級まで段階的にTypeScriptを習得できます。

## 特徴

- 📚 **60日間の体系的なロードマップ** - 基礎編20日、中級編20日、上級編20日
- 🎯 **実践的な問題** - 実務で使える型システムの知識を習得
- ✅ **自動テスト環境** - Jest + ts-jest で型チェックとテストを自動実行
- 🔒 **個別学習をサポート** - 回答はGit管理外で個人管理
- 🤖 **問題自動生成** - Claude Codeのスキル機能で新しい問題を簡単に追加
- 🚫 **AI補完無効化** - Copilot等のコード補完を無効化して自力で学習

## クイックスタート

### 1. セットアップ

```bash
# リポジトリをクローン
git clone <repository-url>
cd mastering-typescript

# オプション1: Makefileを使う（推奨）
make init        # 依存関係インストール + 初回セットアップ
make test        # テスト実行
make typecheck   # 型チェック

# オプション2: npmコマンドを使う
npm install      # 依存関係をインストール
npm run setup    # 初回セットアップ（src/ から solutions/ へコピー）
npm test         # テスト実行
npm run typecheck # 型チェック

# ※ 未実装なのでテストは失敗します（これが正常な状態です）
```

### 2. 問題を解く

```bash
# 実装する
code solutions/day01/parseUser.ts

# テストする
npm test

# 型チェック
npm run typecheck
```

## ディレクトリ構造

```text
mastering-typescript/
├── src/                          # 問題テンプレート（Git管理）
│   ├── day01/
│   │   ├── README.md            # 問題の説明、学習ガイド
│   │   └── parseUser.ts         # TODO付き問題テンプレート
│   ├── day02/
│   └── ...
├── solutions/                    # あなたの回答（Git管理外）
│   ├── README.md                # 使い方ガイド
│   ├── day01/
│   │   └── parseUser.ts         # あなたの実装
│   └── ...
├── tests/                        # テストファイル（Git管理）
│   ├── smoke.test.ts            # 環境確認テスト
│   ├── day01/
│   │   └── parseUser.test.ts    # Day01のテスト（solutions/からimport）
│   └── ...
├── typescript-roadmap.md         # 60日間の学習ロードマップ
├── tsconfig.json                 # TypeScript設定（strict: true）
└── jest.config.js                # Jest設定
```

## 学習ロードマップ

### 基礎編（Day01-20）

TypeScriptの基本的な型システムをじっくり固めます。

- **Day01-05**: 型の基本（型ガード、配列操作、オプショナル型）
- **Day06-10**: 配列操作の応用（集計、グルーピング、ソート、フラット化）
- **Day11-15**: Union型とユーティリティ型（Partial、Pick、Omit、Required）
- **Day16-20**: オブジェクト操作の応用（Record、ネスト、Intersection）

### 中級編（Day21-40）

ジェネリクス、非同期処理、クラスなど実践的な型システムを学びます。

- **Day21-25**: ジェネリクスの基礎
- **Day26-30**: 非同期処理（Promise、async/await）
- **Day31-35**: 高度な型操作（Mapped Types、高階関数）
- **Day36-40**: クラスとインターフェース

### 上級編（Day41-60）

型レベルプログラミングと高度な型システムの機能を学びます。

- **Day41-45**: 条件型と型推論（Conditional Types、infer）
- **Day46-50**: 実践的なパターン（Builder、State Machine、Branded Types）
- **Day51-55**: 型システムの深い理解（Variance、構造的型付け）
- **Day56-60**: 型レベルプログラミング（型レベル計算、文字列操作）

詳細は [typescript-roadmap.md](./typescript-roadmap.md) を参照してください。

## コマンド一覧

### Makeコマンド

```bash
make help        # ヘルプを表示
make init        # 初回セットアップ（install + setup）
make setup       # 問題ファイルをコピー（src/ → solutions/）
make install     # 依存関係をインストール
make test        # テストを実行
make typecheck   # 型チェックを実行
make watch       # テストをwatch modeで実行
make all         # 型チェック + テストを両方実行
make clean       # solutions/ をクリーン（注意: 実装が消えます）
```

### npmコマンド

```bash
npm run setup    # 初回セットアップ（src/ から solutions/ へコピー）
npm test         # テストを実行
npm run typecheck # 型チェックを実行
npm run test:watch # テストをwatch modeで実行
```

## ワークフロー

### 1. 問題を解く基本フロー

```bash
# ステップ1: 問題ファイルを開く
code solutions/day01/parseUser.ts

# ステップ2: 問題を理解する
# src/day01/README.md を読んで、学習目標と背景知識を確認

# ステップ3: 実装する
# solutions/day01/parseUser.ts にコードを書く

# ステップ4: テストする
npm test
# または特定のDayのみ
npm test -- day01

# ステップ5: 型チェック
npm run typecheck
```

### 2. Git管理

```bash
# 問題テンプレートを追加（例: Day02を作成した場合）
git add src/day02/ tests/day02/
git commit -m "Add Day02 problem: 配列のフィルタリング"

# solutions/ は自動的に無視される（.gitignoreで設定済み）
git status
# On branch main
# nothing to commit, working tree clean
```

### 3. やり直したい場合

```bash
# src/ から solutions/ にコピーし直す
cp src/day01/parseUser.ts solutions/day01/parseUser.ts
```

## 設定詳細

### TypeScript設定

- **strict mode**: 有効（`strict: true`）
- **厳格なチェック**:
  - `noUncheckedIndexedAccess: true` - 配列アクセスの安全性
  - `exactOptionalPropertyTypes: true` - オプショナルプロパティの厳密性
- **`any`型**: 使用禁止（問題、実装、テストすべて）

### テスト環境

- **フレームワーク**: Jest + ts-jest
- **環境**: Node.js
- **対象**: `tests/**/*.test.ts`
- **自動モック**: 有効（`clearMocks: true`）

## 問題作成（開発者向け）

Claude Codeのスキル機能を使って新しい問題を作成できます：

```bash
# Claude Codeで以下を実行
"今日の問題を作って"
# または
"配列操作の問題を作って"
```

スキルが自動的に：

1. Day番号を検出（最新のDay + 1）
2. ロードマップからテーマを提案
3. README、問題ファイル（src/ と solutions/ 両方）、テストファイルを生成
4. 型チェックとテストで動作確認

詳細は [.claude/skills/ts-problem-creator.md](./.claude/skills/ts-problem-creator.md) を参照してください。

## トラブルシューティング

### GitHub Copilotが無効化されない場合

このプロジェクトでは自力で学習するため、Copilotを無効化することを推奨しています。

**手動でCopilotを無効化する手順**:

1. ⌘ + Shift + P でコマンドパレットを開く
2. "GitHub Copilot: Disable" と入力
3. "Disable Completions for This Workspace" を選択

または、拡張機能から無効化:

1. ⌘ + Shift + X で拡張機能を開く
2. "GitHub Copilot" を検索
3. "Disable (Workspace)" をクリック

### 問題が難しすぎる場合

1. `src/dayXX/README.md`の「背景知識」セクションを熟読
2. 「ヒント」セクションを参照
3. 前のDayに戻って復習
4. TypeScript公式ドキュメントで補完学習

### 問題が簡単すぎる場合

1. より複雑なケースを自分で追加
2. エッジケースのテストを追加
3. 次のフェーズに進む
4. ロードマップをカスタマイズ（`typescript-roadmap.md`を編集）

### テストが失敗する

```bash
# エラーメッセージを確認
npm test

# 型エラーの詳細を確認
npm run typecheck

# 特定のDayのみテスト
npm test -- day01
```

## 推奨学習ペース

- **初心者**: 毎日1問 → 60日で完走
- **無理のないペース**: 週3-4問 → 4-5ヶ月で完走
- **集中学習**: 週5問 → 3ヶ月で完走

### マイルストーン

- **Day20完了**: 基礎編修了 → 簡単なCLIツールを作成
- **Day40完了**: 中級編修了 → REST APIクライアントを実装
- **Day60完了**: 上級編修了 → 独自の型ライブラリを作成

## 参考リソース

### 公式ドキュメント

- [TypeScript公式ドキュメント](https://www.typescriptlang.org/docs/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

### おすすめ書籍

- 「プログラミングTypeScript」（Boris Cherny著）
- 「実践TypeScript」（吉井健文著）

### オンラインリソース

- [Type Challenges](https://github.com/type-challenges/type-challenges) - 型の問題集
- [TypeScript Playground](https://www.typescriptlang.org/play) - オンラインで試す

## ライセンス

ISC

## コントリビューション

問題の改善提案やバグ報告は Issue でお知らせください。
新しい問題の追加は Pull Request でお願いします。

---

Happy TypeScript Learning! 🚀
