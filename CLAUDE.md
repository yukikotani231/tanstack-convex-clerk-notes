# CLAUDE.md

このファイルは Claude Code がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

TanStack Start + Convex + Clerk を使用したメモアプリ。

## 開発コマンド

```bash
npm run dev        # 開発サーバー (localhost:3000)
npm run build      # 本番ビルド
npm run lint       # oxlint でリント
npm run fmt        # oxfmt でフォーマット
npm run fmt:check  # フォーマットチェック
npm run typecheck  # tsgo で型チェック
npm run test       # vitest でテスト
```

Convex 開発時は別ターミナルで `npx convex dev` を実行。

## アーキテクチャ

- `src/routes/` - TanStack Router のファイルベースルーティング
- `src/components/` - React コンポーネント
- `convex/` - Convex バックエンド（スキーマ、クエリ、ミューテーション）
- `convex/_generated/` - Convex 自動生成ファイル（編集不可）

## コーディング規約

- フォーマット: oxfmt (ダブルクォート、セミコロンあり)
- リント: oxlint
- 型チェック: tsgo (TypeScript 7 native preview)
- テスト: vitest

## 注意事項

- `convex/_generated/` は `npx convex dev` で自動生成される
- tsconfig.json の `baseUrl` は tsgo で非サポートのため使用不可
- 環境変数は `VITE_` プレフィックスが必要（Vite の仕様）
