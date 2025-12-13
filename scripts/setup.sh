#!/bin/bash
# setup.sh - 初回セットアップ用スクリプト
# src/ から solutions/ に問題ファイルをコピーします

set -e

echo "📦 TypeScriptor セットアップを開始します..."
echo ""

# solutions/ ディレクトリが存在しない場合は作成
if [ ! -d "solutions" ]; then
  mkdir -p solutions
  echo "✅ solutions/ ディレクトリを作成しました"
fi

# src/ 内の各dayディレクトリをコピー
COPIED_COUNT=0
for day_dir in src/day*/; do
  if [ -d "$day_dir" ]; then
    day_name=$(basename "$day_dir")

    # solutions/ に対応するディレクトリを作成
    if [ ! -d "solutions/$day_name" ]; then
      mkdir -p "solutions/$day_name"
    fi

    # .ts ファイルのみをコピー（README.mdは除外）
    for src_file in "$day_dir"*.ts; do
      if [ -f "$src_file" ]; then
        filename=$(basename "$src_file")
        dest_file="solutions/$day_name/$filename"

        # 既に存在する場合はスキップ（ユーザーの実装を保護）
        if [ -f "$dest_file" ]; then
          echo "⏭️  スキップ: $dest_file (既に存在します)"
        else
          cp "$src_file" "$dest_file"
          echo "✅ コピー: $src_file → $dest_file"
          COPIED_COUNT=$((COPIED_COUNT + 1))
        fi
      fi
    done
  fi
done

echo ""
if [ $COPIED_COUNT -eq 0 ]; then
  echo "ℹ️  コピーする新しいファイルはありませんでした"
else
  echo "✨ セットアップ完了！ $COPIED_COUNT 個のファイルをコピーしました"
fi

echo ""
echo "次のステップ:"
echo "  1. npm install          # 依存関係をインストール"
echo "  2. npm test             # テストを実行（未実装なので失敗します）"
echo "  3. npm run typecheck    # 型チェックを実行"
echo ""
echo "問題を解くには:"
echo "  - solutions/dayXX/[ファイル名].ts を編集"
echo "  - src/dayXX/README.md で問題を確認"
echo ""
