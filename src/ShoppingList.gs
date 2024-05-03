function shoppingListInput(messageParameter,userName) {
  const sheetName = "買い物リスト";
  const baseSheet = getBaseSheet(_Config.InputShoppingBookUrl,sheetName);
  let lastRow = baseSheet.getLastRow();
  let shoppingList = [];
  
  let returnMessage = '結果発表〜！';
  
  //セルへの書き込み
  for (let i = 1; i < messageParameter.length; i++) {
    if (lastRow > 1){
      shoppingList = getShoppingList(baseSheet,lastRow);
    };
    if (shoppingList.length > 0){
      if (shoppingList.includes(messageParameter[i])){
        returnMessage += '\n' + messageParameter[i] + ' はすでに入ってるよ〜';
      } else {
        baseSheet.getRange('A' + (lastRow + 1)).setValue(Utilities.formatDate(today(),"JST","M/d"));
        baseSheet.getRange('B' + (lastRow + 1)).setValue(userName);
        baseSheet.getRange('C' + (lastRow + 1)).setValue(messageParameter[i]);
        baseSheet.getRange('D' + (lastRow + 1)).setValue("未");
        returnMessage += '\n' + messageParameter[i] + ' を追加したよ〜';
        lastRow += 1;
      };
    } else {
      baseSheet.getRange('A' + (lastRow + 1)).setValue(Utilities.formatDate(today(),"JST","M/d"));
      baseSheet.getRange('B' + (lastRow + 1)).setValue(userName);
      baseSheet.getRange('C' + (lastRow + 1)).setValue(messageParameter[1]);
      baseSheet.getRange('D' + (lastRow + 1)).setValue("未");
      returnMessage += '\n' + messageParameter[1] + ' を追加したよ〜';
      lastRow += 1;
    };
  }

  return buildMessage(returnMessage);
}

function shoppingListOutput(){
  const sheetName = "買い物リスト";
  const baseSheet = getBaseSheet(_Config.InputShoppingBookUrl,sheetName);
  const lastRow = baseSheet.getLastRow();
  let returnMessage = '結果発表〜！';

  if (lastRow > 1){
    let shoppingList = getShoppingList(baseSheet,lastRow);
    for (let i = 0; i < shoppingList.length; i++){
      returnMessage += '\n' + shoppingList[i];
    }
  } else {
    returnMessage += '\n' + '何もないよ〜';
  };
  
  return buildMessage(returnMessage);
}

function shoppingListDelete(messageParameter) {
  const sheetName = "買い物リスト";
  const baseSheet = getBaseSheet(_Config.InputShoppingBookUrl,sheetName);
  let lastRow = baseSheet.getLastRow();
  let shoppingList = [];
  
  let returnMessage = '結果発表〜！';
  
  //セルへの書き込み
  for (let i = 1; i < messageParameter.length; i++) {
    if (lastRow > 1){
      shoppingList = getShoppingList(baseSheet,lastRow);
    };
    if (shoppingList.length > 0){
      if (shoppingList.indexOf(messageParameter[i]) > -1){
        baseSheet.deleteRow(shoppingList.indexOf(messageParameter[i]) + 2);
        returnMessage += '\n' + messageParameter[i] + ' を削除したよ〜';
        lastRow -= 1;
      } else {
        returnMessage += '\n' + messageParameter[i] + ' はリストにないよ〜';
      };
    } else {
      returnMessage += '\n' + ' リストに何もないよ〜';
    };
  }

  return buildMessage(returnMessage);
}

function getShoppingList(baseSheet,lastRow){
  var shoppingList = baseSheet.getRange('C2:C' + lastRow).getValues().flat().filter(String).map(String);
  return shoppingList;
}
