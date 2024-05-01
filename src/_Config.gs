// LineAccessToken                 ：LINE developersのメッセージ送受信設定に記載のアクセストークン
// LineReplyUrl                    ：LINE Messaging APIのURL（LINEからの応答用）
// LinePushUrl                     ：LINE Messaging APIのURL（LINEに対してPOSTする用）
// LinePushNotificationDestination : LineのUserID
// HouseholdAccountBookUrl         ：家計簿のURL
var _Config = {
  LineAccessToken                 : '*********',
  LineReplyUrl                    : 'https://api.line.me/v2/bot/message/reply',
  LinePushUrl                     : 'https://api.line.me/v2/bot/message/push',
  LinePushNotificationDestination : '*********',
  InputCostBookUrl                : '*********',
  LiffFormUrl                     : '*********'
};

var _PersonArray = ['*********','*********'];

var _SubjectArray = ['食費','外食','日用品','衣類','光熱費','娯楽','その他'];
