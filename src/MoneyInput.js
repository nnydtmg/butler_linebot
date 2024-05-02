function moneyInput(messageParameter) {
  const sheetName = messageParameter[1].substring(0,4) + messageParameter[1].substring(5,7);
  const baseSheet = getBaseSheet(_Config.InputCostBookUrl,sheetName);
  const lastRow = baseSheet.getLastRow();
  
  //セルへの書き込み
  baseSheet.getRange('A' + (lastRow + 1)).setValue(buildMonDateString(Utilities.parseDate(messageParameter[1],"JST","yyyy-MM-dd")));
  baseSheet.getRange('B' + (lastRow + 1)).setValue(messageParameter[2]);
  baseSheet.getRange('C' + (lastRow + 1)).setValue(messageParameter[3]);
  baseSheet.getRange('D' + (lastRow + 1)).setValue(messageParameter[4]);
  baseSheet.getRange('E' + (lastRow + 1)).setValue(messageParameter[5]);

  return buildMessage(exitInputMessage());
}
