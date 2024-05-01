/**
 * LineにPostするメッセージ情報
 * @param {String} [message] - メッセージ
 * @return {Array} メッセージの情報
 */
function buildMessage(message) {
  return [{
      'type': 'text',
      'text': message
      }];
}

/**
 * LineにPostするメッセージ情報(複数バージョン)
 * @param {Array} [messages] - メッセージ
 * @return {Array} メッセージの情報
 */
function buildMessages(messages) {
  return messages.map(function(message){
    return {
      'type': 'text',
      'text': message
    }
  });
}

/**
 * LineにPostするクイックリプライメッセージ情報
 * @param {String} [message] - メッセージ
 * @param {Array} [quickReply] - クイックリプライ用のメッセージ
 * @return {Array} クイックリプライメッセージの情報
 */
function buildQuickReplyMessages(message, quickReply) {
  return [{
      'type': 'text',
      'text': message,
      'quickReply': {
        'items': quickReply
      }
  }]
}

/**
 * クイックリプライメッセージのitemオブジェクト作成（配列用）
 * @param {Array} [values] - 配列の値
 * @return {Array} クイックリプライメッセージのitem
 */
function buildQuickReplyItemsForArray(values) {
  return values.map(function(value){
    return {
      'type': 'action',
      'action': {
        'type': 'message',
        'label': value,
        'text': value
      }
    };
  });
}

/**
 * クイックリプライメッセージのitemオブジェクト作成（入力テンプレート用）
 * @param {Array} [keys] - テンプレートのキーリスト
 * @param {Array} [templateValues] - テンプレートの値
 * @return {Array} クイックリプライメッセージのitem
 */
function buildQuickReplyItemsForTemplates(keys, templateValues) {
  return keys.map(function(key){
    return {
      'type': 'action',
      'action': {
        'type': 'message',
        'label': key,
        'text': buildInputFormTemplateUrl(getTemplate(key, templateValues))
      }
    };
  });
}

/**
 * 入力された内容に回答出来ない時のメッセージ
 * @return {String} 入力された内容に回答出来ない時のメッセージ
 */
function notExistsMessage() {
  return 'そのメッセージに回答する答えが存在しないよ😭';
}

