/** 
 * ユーザーからのアクションに返信する
 */
function doPost(e) {
  const json = JSON.parse(e.postData.contents);

  //返信するためのトークン取得
  const replyToken = json.events[0].replyToken;
  if(typeof replyToken == 'undefined') {
    return;
  }

  //送られたメッセージを取得
  const userMessage = json.events[0].message.text;
  //LINEメッセージを改行で分割
  const messageParameter = userMessage.split(/\r\n|\n/);
  //送信者名を取得
  const userName = getUserName(json.events[0].source.userId);

  if (messageParameter[0] === "家計簿に追加します。") {
    var postMessage = moneyInput(messageParameter);
  } else if (messageParameter[0] === "リスト追加") {
    var postMessage = shoppingListInput(messageParameter,userName);
  } else if (messageParameter[0] === "リスト削除") {
    var postMessage = shoppingListDelete(messageParameter);
  } else {
    var postMessage = convertUserMessageToLineMessage(userMessage);
  }
  // LineにPostする
  UrlFetchApp.fetch(_Config.LineReplyUrl, createReplyRequest(replyToken, postMessage));

  // 成功のステータスを返す
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}

function convertUserMessageToLineMessage(userMessage) {
  if (userMessage === '家計簿登録') {
    return costInputLiff();
  } else if (userMessage === 'リスト参照') {
    return shoppingListOutput();
  } else if (userMessage === "買い物リスト追加") {
    return buildMessage('以下の形式で入力してね！\nリスト追加\n買うもの１\n買うもの２');
  } else if (userMessage === "買い物リスト削除") {
    return buildMessage('以下の形式で入力してね！\nリスト削除\n買うもの１\n買うもの２');
  // } else if (userMessage === '入力') {
  //   var quickReplyItems = buildQuickReplyItemsForTemplates(InputTemplateKeys.VariableCost, InputTemplates.VariableCost);
  //   return buildQuickReplyMessages('入力テンプレートを選んでね😍', quickReplyItems);
  // } else if (userMessage === '固定費入力') {
  //   var quickReplyItems = buildQuickReplyItemsForTemplates(InputTemplateKeys.FixedCost, InputTemplates.FixedCost);
  //   return buildQuickReplyMessages('入力テンプレートを選んでね😍', quickReplyItems);
  // } else if (isExistsSubject(userMessage)) {
  //   return buildMessages(paymentInfo(userMessage));
  // } else if (userMessage === 'ヘルプ') {
  //   return buildMessage(helpMessage());
  // } else if (userMessage === '最終結果') {
  //   return buildMessages(incomeAndExpenditureForThisMonthMessage());
  // } 
  } else if (userMessage === 'いいえ') {
    return buildMessage(exitMessage());
  } else {
    return buildMessage(notExistsMessage());
  }
}

/**
 * リクエストのヘッダーを作成
 * @return {Object} リクエスト情報のヘッダー
 */
function header() {
  return {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + _Config.LineAccessToken,
      }
}

/**
 * 応答用のリクエスト情報（JSON）を作成する
 * @param {String} [replyToken] - WebHookで受信した応答用Token（LINE BOTより）
 * @param {Array} [Array] - message情報
 * @return {Object} リクエスト情報（JSON）
 */
function createReplyRequest(replyToken, message) {
  return {
    'headers': header(),
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': message,
    }),
  }
}
