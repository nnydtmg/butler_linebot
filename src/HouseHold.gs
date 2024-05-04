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

function houseHoldCheck(){
  let sheetName = Utilities.formatDate(today(),"JST","yyyyMM");
  let baseSheet = getBaseSheet(_Config.InputCostBookUrl,sheetName);
  let lastRow = baseSheet.getLastRow();
  let houseHoldList = getHouseHoldList(baseSheet);;

  let returnMessage = "直近5件の登録状況だよ！！";
  let returnMessageThisMonth = "";
  let returnMessagePreMonth = "";
  let cnt = 0;

  if(lastRow > 5){
    for(let i = 5; i > 0; i--){
      returnMessage += '\n' + houseHoldList[lastRow - i];
    };
  } else if(lastRow == 1){
    sheetName = Utilities.formatDate(preMonth(1),"JST","yyyyMM");
    baseSheet = getBaseSheet(_Config.InputCostBookUrl,sheetName);
    lastRow = baseSheet.getLastRow();
    houseHoldList = getHouseHoldList(baseSheet);
    for(let i = 5; i > 0; i--){
      returnMessage += '\n' + houseHoldList[lastRow - i];
    };
  } else {
    houseHoldList = getHouseHoldList(baseSheet);
    for(let i = lastRow - 1; i > 0; i--){
      returnMessageThisMonth += '\n' + houseHoldList[lastRow - i];
      cnt += 1;
    };
    sheetName = Utilities.formatDate(preMonth(1),"JST","yyyyMM");
    baseSheet = getBaseSheet(_Config.InputCostBookUrl,sheetName);
    lastRow = baseSheet.getLastRow();
    houseHoldList = getHouseHoldList(baseSheet);
    for(let i = 5 - cnt; i > 0; i--){
      returnMessagePreMonth += '\n' + houseHoldList[lastRow - i];
    };
    returnMessage += returnMessagePreMonth + returnMessageThisMonth;
  }

  return buildMessage(returnMessage);
}


function getHouseHoldList(baseSheet){
  var houseHoldList = baseSheet.getDataRange().getDisplayValues();
  return houseHoldList;
}