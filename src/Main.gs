/** 
 * ユーザーからのアクションに返信する
 */
function doPost(e) {
  // GAS の Web アプリはリクエストヘッダーを取得できず、LINE の署名 (X-Line-Signature) を検証できない。
  // 代わりに、スクリプトプロパティ WEBHOOK_TOKEN と同じ値を Webhook URL の ?token= に付けて照合する。
  // トークンが一致しないリクエストは処理しない。
  if (!isAuthorizedWebhook(e)) {
    return ContentService.createTextOutput(JSON.stringify({'content': 'forbidden'})).setMimeType(ContentService.MimeType.JSON);
  }

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
  } else if (userMessage === '家計簿参照') {
    var quickReplyItems = buildQuickReplyItemsForArray(_HouseHoldListArray);
    return buildQuickReplyMessages('何する？😍',quickReplyItems);
  } else if (userMessage === '直近5件') {
    return houseHoldCheck();
  } else if (userMessage === '今月合計') {
    return houseHoldSummaryCheck(Utilities.formatDate(today(),"JST","yyyyMM"),"今月合計");
  } else if (userMessage === '先月合計') {
    return houseHoldSummaryCheck(Utilities.formatDate(preMonth(1),"JST","yyyyMM"),"先月合計");
  } else if (userMessage === '買い物リスト') {
    var quickReplyItems = buildQuickReplyItemsForArray(_ShoppingListArray);
    return buildQuickReplyMessages('何する？😍',quickReplyItems);
  } else if (userMessage === 'リスト参照') {
    return shoppingListOutput();
  } else if (userMessage === 'リスト一括削除') {
    return shoppingListAllDelete();
  } else if (userMessage === "買い物リスト追加") {
    return buildMessage('以下の形式で入力してね！\nリスト追加\n買うもの1\n買うもの2');
  } else if (userMessage === "買い物リスト削除") {
    return buildMessage('以下の形式で入力してね！\nリスト削除\n買うもの1\n買うもの2');
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


/**
 * Webhook URL のクエリパラメータ token を、スクリプトプロパティ WEBHOOK_TOKEN と照合する。
 * WEBHOOK_TOKEN が未設定の場合は従来どおり処理する（警告ログのみ）。設定を強く推奨。
 */
function isAuthorizedWebhook(e) {
  const expected = PropertiesService.getScriptProperties().getProperty('WEBHOOK_TOKEN');
  if (!expected) {
    console.warn('WEBHOOK_TOKEN is not set. Webhook requests are not authenticated.');
    return true;
  }
  const actual = (e && e.parameter && e.parameter.token) || '';
  if (actual.length !== expected.length) {
    return false;
  }
  // 文字列比較の時間差を減らすため、全文字を比較する
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ actual.charCodeAt(i);
  }
  return diff === 0;
}
