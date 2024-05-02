/**
 * ２桁の数値文字列を返す
 * 1〜9の数値には前に0を付加する
 * @param {Number} [number] - 数値
 * @return {String} 2桁の数値を返す
 */
function padZero(number) {
  if (number < 10) return "0" + number;
  return '' + number;
}

/**
 * 日付を作成し返す
 * @return {Date} [date] - date形式の日付
 */
function today(){
  var today = new Date();
  return today;
}

/**
 * 日付け文字列を作成し返す
 * @param {Date} [date] - 日付けオブジェクト
 * @param {String} [delimiter] - 日付けの間の区切り文字
 * @return {String} (YYYY区切り文字MM区切り文字DD)形式の日付文字列
 */
function buildDateString(date, delimiter) {
  var delimiterString = (delimiter == undefined) ? '-' : delimiter;
  return "" + date.getFullYear() + delimiterString + padZero(date.getMonth() + 1) + delimiterString + padZero(date.getDate());
}

/**
 * 今日日付けの文字列を(YYYY区切り文字MM区切り文字DD)の形式で返す
 * @param {String} [delimiter] - 区切り文字
 * @return {String} (YYYY区切り文字MM区切り文字DD)の形式の日付け文字列
 */
function nowDateString(delimiter) {
  const now = new Date();

  return buildDateString(now, delimiter);
}

/**
 * 指定日付けの文字列を(YYYY区切り文字MM区切り文字DD)の形式で返す
 * @param {String} [delimiter] - 日付けの間の区切り文字
 * @return {String} (YYYY区切り文字MM区切り文字DD)形式の日付文字列
 */
function specifiedDate(date, delimiter) {
  const now = new Date(date);

  return buildDateString(now, delimiter);
}

/**
 * 今月の指定日付けの文字列を(YYYY区切り文字MM区切り文字DD)の形式で返す
 * @param {Number} [number] - 数値
 * @return {String} (YYYY区切り文字MM区切り文字DD)の形式の日付け文字列
 */
function nowDateForSpecifiedDay(number, delimiter) {
  const now = new Date();
  now.setDate(number);

  return buildDateString(now, delimiter);
}

/**
 * 月初の日付文字列を(YYYY区切り文字MM区切り文字DD)の形式で返す
 * @return {String} (YYYY区切り文字MM区切り文字DD)の形式の日付け文字列
 */
function beginningOfMonthDate(delimiter) {
  const date = new Date();
  date.setDate(1);
  
  return buildDateString(date, delimiter);
}

/**
 * 月末の日付文字列を(YYYY区切り文字MM区切り文字DD)の形式で返す
 * @return {String} (YYYY区切り文字MM区切り文字DD)の形式の日付け文字列
 */
function endOfMonthDate(delimiter) {
  const date = new Date();
  date.setDate(1);
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  
  return buildDateString(date, delimiter);
}

/**
 * 月末か？
 * @return {Boolean} 
 */
function isEndOfMonth() {
  var date = new Date();
  date.setDate(date.getDate() +1);

  // 現在日付＋１の日付が１日の場合は月末と判断する
  return date.getDate() === 1;
}

/**
 * 日付け文字列を作成し返す
 * @param {Date} [date] - 日付けオブジェクト
 * @param {String} [delimiter] - 日付けの間の区切り文字
 * @return {String} (YYYY区切り文字MM区切り文字DD)形式の日付文字列
 */
function buildMonDateString(date, delimiter) {
  var delimiterString = (delimiter == undefined) ? '/' : delimiter;
  return (date.getMonth() + 1) + delimiterString + date.getDate();
}
