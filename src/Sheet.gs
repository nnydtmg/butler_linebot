function getBaseSheet(sheetURL,sheetName) {
  // GoogleスプレッドシートをID取得
  const baseSheet = SpreadsheetApp.openById(sheetURL).getSheetByName(sheetName);
  return baseSheet;
}
