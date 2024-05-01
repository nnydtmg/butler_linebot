# リッチメニュー作成
```bash
curl -X POST https://api.line.me/v2/bot/richmenu \
    -H "Authorization: Bearer ${ACCESS_TOKEN}"\
    -H 'Content-Type: application/json' \
    -d \
    '{
        "size": {
            "width": 2500,
            "height": 1686
        },
        "selected": true,
        "name": "ProductionMenu",
        "chatBarText": "メニュー",
        "areas": [
            {
                "bounds": {
                    "x": 0,
                    "y": 0,
                    "width": 834,
                    "height": 843
                },
                "action": {
                    "type": "message",
                    "text": "家計簿登録"
                }
            },
            {
                "bounds": {
                    "x": 834,
                    "y": 0,
                    "width": 834,
                    "height": 843
                },
                "action": {
                    "type": "message",
                    "text": "今月の支出状況"
                }
            },
            {
                "bounds": {
                    "x": 1668,
                    "y": 0,
                    "width": 832,
                    "height": 843
                },
                "action": {
                    "type": "message",
                    "text": "科目結果"
                }
            },
            {
                "bounds": {
                    "x": 0,
                    "y": 843,
                    "width": 834,
                    "height": 843
                },
                "action": {
                    "type": "message",
                    "text": "入力"
                }
            },
            {
                "bounds": {
                    "x": 834,
                    "y": 843,
                    "width": 834,
                    "height": 843
                },
                "action": {
                    "type": "message",
                    "text": "固定費入力"
                }
            },
            {
                "bounds": {
                    "x": 1668,
                    "y": 843,
                    "width": 832,
                    "height": 843
                },
                "action": {
                    "type": "message",
                    "text": "ヘルプ"
                }
            }
        ]
    }'
```

# リッチメニュー用画像アップロード
```bash
curl -v -X POST https://api-data.line.me/v2/bot/richmenu/${RICH_MENU_ID}/content \
    -H "Authorization: Bearer ${ACCESS_TOKEN}" \
    -H 'Content-Type: image/png' \
    -T ~/Downloads/Linebot.png
```

# リッチメニュー紐付け
```bash
curl -v -X POST https://api.line.me/v2/bot/user/all/richmenu/${RICH_MENU_ID} \
    -H "Authorization: Bearer ${ACCESS_TOKEN}"
```