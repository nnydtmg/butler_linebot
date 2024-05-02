function shoppingListInput(messageParameter,userName) {
  const sheetName = "買い物リスト";
  const baseSheet = getBaseSheet(_Config.InputShoppingBookUrl,sheetName);
  const lastRow = baseSheet.getLastRow();
  // var shoppingList = getShoppingList(File,baseSheet,lastRow);
  
  //セルへの書き込み
  baseSheet.getRange('A' + (lastRow + 1)).setValue(Utilities.formatDate(today(),"JST","M/d"));
  baseSheet.getRange('B' + (lastRow + 1)).setValue(userName);
  baseSheet.getRange('C' + (lastRow + 1)).setValue(messageParameter[1]);
  baseSheet.getRange('D' + (lastRow + 1)).setValue("未");

  return buildMessage(exitInputMessage());
}

function getShoppingList(File,baseSheet,lastRow){
  var shoppingList = baseSheet.getDataRange('B2:B'+ lastRow).getValues();
  return shoppingList;
}
