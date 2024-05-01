function moneyInput(userMessage) {
  //LINEメッセージを改行で分割
  const messageParameter = userMessage.split(/\r\n|\n/);
  // GoogleスプレッドシートをID取得
  const File = SpreadsheetApp.openById(_Config.InputCostBookUrl);
  //シートをシート名で取得
  const baseSheet = File.getSheetByName(messageParameter[0].substring(0,4) + messageParameter[0].substring(5,7));
  //行の最後を取得
  const lastRow = baseSheet.getLastRow();
  
  //セルへの書き込み
  baseSheet.getRange('A' + (lastRow + 1)).setValue(buildDateString(Utilities.parseDate(messageParameter[0],"JST","yyyy-MM-dd")));
  baseSheet.getRange('B' + (lastRow + 1)).setValue(messageParameter[1]);
  baseSheet.getRange('C' + (lastRow + 1)).setValue(messageParameter[2]);
  baseSheet.getRange('D' + (lastRow + 1)).setValue(messageParameter[3]);
  baseSheet.getRange('E' + (lastRow + 1)).setValue(messageParameter[4]);

   //リクエストヘッダ
    const headers = {
      "Content-Type" : "application/json; charset=UTF-8",
      'Authorization' : 'Bearer ' + _Config.LineAccessToken //'Bearer 'スペース忘れずに
    };

    //POSTオプション作成
    const options = {
      'method'  : 'POST',
      'headers' : headers,
      'payload' : JSON.stringify(postData)
    };

    return UrlFetchApp.fetch(_Config.LineReplyUrl, options);
}
