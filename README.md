# tanstack-convex-clerk-notes

TanStack Start + Convex + Clerk を使用したシンプルなメモアプリです。

## 技術スタック

| カテゴリ | 技術 |
|---------|------|
| フレームワーク | TanStack Start |
| バックエンド | Convex |
| 認証 | Clerk |
| スタイリング | Tailwind CSS |
| デプロイ | Railway |

### 開発ツール

| ツール | 用途 |
|--------|------|
| oxlint | リンター |
| oxfmt | フォーマッター |
| tsgo | 型チェック |
| vitest | テスト |

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Clerk の設定

1. [Clerk Dashboard](https://dashboard.clerk.com/) でアプリケーションを作成
2. Publishable Key を取得

### 3. Convex の設定

1. [Convex Dashboard](https://dashboard.convex.dev/) でプロジェクトを作成
2. 以下のコマンドで Convex をセットアップ:

```bash
npx convex dev
```

### 4. 環境変数の設定

```bash
cp .env.example .env
```

`.env` に以下を設定:

```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxx
VITE_CONVEX_URL=https://xxx.convex.cloud
```

### 5. 開発サーバーの起動

```bash
# Convex 開発サーバー（別ターミナル）
npx convex dev

# アプリケーション開発サーバー
npm run dev
```

http://localhost:3000 でアクセス

## npm スクリプト

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | 本番ビルド |
| `npm run start` | 本番サーバー起動 |
| `npm run lint` | oxlint でリント |
| `npm run fmt` | oxfmt でフォーマット |
| `npm run fmt:check` | フォーマットチェック |
| `npm run typecheck` | tsgo で型チェック |
| `npm run test` | vitest でテスト |

## プロジェクト構成

```
├── convex/           # Convex バックエンド
│   ├── schema.ts     # データベーススキーマ
│   └── notes.ts      # メモの CRUD 操作
├── src/
│   ├── __tests__/    # テストファイル
│   ├── components/   # React コンポーネント
│   ├── routes/       # TanStack Router のルート
│   └── styles.css    # グローバルスタイル
├── railway.toml      # Railway デプロイ設定
└── .env.example      # 環境変数テンプレート
```

## デプロイ (Railway)

1. [Railway](https://railway.app/) でプロジェクトを作成
2. GitHub リポジトリを接続
3. 環境変数を設定:
   - `VITE_CLERK_PUBLISHABLE_KEY`
   - `VITE_CONVEX_URL`
4. 自動デプロイが実行されます
