.PHONY: help setup install test typecheck watch clean

# デフォルトターゲット
.DEFAULT_GOAL := help

help: ## このヘルプメッセージを表示
	@echo "TypeScriptor - TypeScript学習プロジェクト"
	@echo ""
	@echo "使用可能なコマンド:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36mmake %-15s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "または npm コマンド:"
	@echo "  npm install      依存関係をインストール"
	@echo "  npm run setup    初回セットアップ"
	@echo "  npm test         テスト実行"
	@echo "  npm run typecheck 型チェック"

setup: ## 初回セットアップ（src/ から solutions/ へコピー）
	@bash scripts/setup.sh

install: ## 依存関係をインストール
	@echo "📦 依存関係をインストール中..."
	@npm install
	@echo "✅ インストール完了"

test: ## テストを実行
	@npm test

typecheck: ## 型チェックを実行
	@npm run typecheck

watch: ## テストをwatch modeで実行
	@npm run test:watch

clean: ## solutions/ ディレクトリをクリーン（注意: 実装が消えます）
	@echo "⚠️  solutions/ ディレクトリを削除します..."
	@read -p "本当に削除しますか？ [y/N]: " confirm && [ "$$confirm" = "y" ] || exit 1
	@rm -rf solutions/day*
	@echo "✅ solutions/ をクリーンしました"
	@echo "💡 npm run setup で再度セットアップしてください"

init: install setup ## 初回セットアップ（install + setup）
	@echo ""
	@echo "✨ 初回セットアップ完了！"
	@echo ""
	@echo "次のステップ:"
	@echo "  1. make test         # テストを実行（未実装なので失敗します）"
	@echo "  2. make typecheck    # 型チェックを実行"
	@echo ""
	@echo "問題を解くには:"
	@echo "  - solutions/dayXX/[ファイル名].ts を編集"
	@echo "  - src/dayXX/README.md で問題を確認"
	@echo "  - make test でテスト実行"

all: typecheck test ## 型チェックとテストを両方実行
