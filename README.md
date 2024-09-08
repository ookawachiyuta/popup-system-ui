# 初Reactでポップアップ設定ツールのUIを作りました。

## 概要
このツールは、フォームから必要な項目を選択し、一覧画面のテーブルに表示するシンプルなUIです。<br>
（APIへのリクエストは記述していません。demoデータを使用しています。）
## デモ方法
```bash
git clone 
cd popup-system-ui
echo -e "VITE_APP_API_URL=http://localhost:8000\nVITE_APP_SKIP_CSRF=認証なし" > .env.development
echo -e "VITE_APP_API_URL=https://production.example.com\nVITE_APP_SKIP_CSRF=認証あり" > .env.production
npm install
npm run dev
```
## 使用技術
- フロントエンド: React.js<br>
- スタイリング：CSS、Ant Design 5.0<br>
- ビルドツール: Vite<br>

