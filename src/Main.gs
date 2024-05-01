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
  if (userMessage === "家計簿登録") {
    var postMessage = costInputLiff();
  } else if (userMessage === "いいえ") {
    var postMessage = buildMessages("終了しました");
  } else {
    // spreadsheetに追記
    var postMessage = moneyInput(userMessage);
  }
  // LineにPostする
  UrlFetchApp.fetch(_Config.LineReplyUrl, createReplyRequest(replyToken, postMessage));

  // 成功のステータスを返す
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}

function convertUserMessageToLineMessage(userMessage) {
  if (userMessage === '家計簿登録') {
    var quickReplyItems = buildQuickReplyItemsForArray(_PersonArray);
    return buildQuickReplyMessages('支払者を選んでね😍', quickReplyItems);
  } else if (_PersonArray.includes(userMessage)) {
    tempInput(userMessage);
    var quickReplyItems = buildQuickReplyItemsForArray(_SubjectArray);
    return buildQuickReplyMessages('分類を選んでね😍', quickReplyItems);
  } else if (_SubjectArray.includes(userMessage)) {
    tempInput(userMessage);
    return buildMessage('金額を入力してね😍', quickReplyItems);
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
