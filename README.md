# 家計簿用Linebotのリポジトリ

## セキュリティに関する注意

Google Apps Script の Web アプリはリクエストヘッダーを取得できないため、LINE の署名（`X-Line-Signature`）を検証できません。代わりに、次の手順で Webhook URL に秘密のトークンを付けてください。

1. 推測されにくいランダムな文字列を用意する。
2. Apps Script の「プロジェクトの設定」→「スクリプト プロパティ」に `WEBHOOK_TOKEN` として登録する。
3. LINE Developers の Webhook URL を `https://script.google.com/macros/s/<デプロイID>/exec?token=<トークン>` に変更する。

`WEBHOOK_TOKEN` が未設定の場合は認証なしで動作します（警告ログのみ）。Webhook URL を知っている第三者がリクエストを送れる状態になるため、必ず設定してください。

`src/_Config.gs` のアクセストークンなどの実際の値は、リポジトリにコミットしないでください。
