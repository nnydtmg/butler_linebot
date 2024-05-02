function costInputLiff() {
  return [
    {
      "type": "template",
      "altText": "家計簿登録フォーム",
      "template": {
        "type": "confirm",
        "text": "家計簿に入力する",
        "actions": [
          {
            "type": "uri",
            "label": "はい",
            "uri": _Config.CostInputLiffFormUrl
          },
          {
            "type": "message",
            "label": "いいえ",
            "text": "いいえ"
          }
        ]
      }
    }]
}
