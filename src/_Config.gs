// LineAccessToken                 ：LINE developersのメッセージ送受信設定に記載のアクセストークン
// LineReplyUrl                    ：LINE Messaging APIのURL（LINEからの応答用）
// LinePushUrl                     ：LINE Messaging APIのURL（LINEに対してPOSTする用）
// LinePushNotificationDestination : LineのUserID
// InputCostBookUrl                ：家計簿のスプレッドシートID
// InputShoppingBookUrl            ：買い物リストのスプレッドシートID
// CostInputLiffFormUrl            :家計簿登録用LIFFのURL
var _Config = {
  LineAccessToken                 : '*********',
  LineReplyUrl                    : 'https://api.line.me/v2/bot/message/reply',
  LinePushUrl                     : 'https://api.line.me/v2/bot/message/push',
  LinePushNotificationDestination : '*********',
  InputCostBookUrl                : '*********',
  InputShoppingBookUrl            : '*********',
  CostInputLiffFormUrl            : '*********'
};

var _ShoppingListArray = ['リスト参照','リスト一括削除','買い物リスト追加','買い物リスト削除'];

var _HouseHoldListArray = ['直近5件','今月合計','先月合計'];