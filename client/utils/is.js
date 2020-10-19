//是否存在指定函数
function isExitsFunction(funcName) {
  try {
    if (typeof eval(funcName) == "function") {
      return true;
    }
  } catch (e) {}
  return false;
}
//是否存在指定变量
function isExitsVariable(variableName) {
  try {
    if (typeof variableName == "undefined") {
      //alert("value is undefined");
      return false;
    } else {
      //alert("value is true");
      return true;
    }
  } catch (e) {}
  return false;
}

/**
 * 验证是不是邮件.
 * @param {要验证的字符串} strEmail
 * @return {Boolean}
 */

function _isEmail(strEmail) {
  //接下来的验证是否有两个以上的‘.’号，有的话就是错的！
  var first = strEmail.indexOf(".");
  if (strEmail.indexOf("@") == -1) {
    return false;
  }
  var tempStr = strEmail.substring(first + 1);
  if (tempStr.indexOf(".") != -1) {
    return false;
  }
  if (
    strEmail.search(
      /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
    ) != -1
  ) {
    return true;
  } else return false;
}

/**
 * 判断某个文本框是否数字.
 * @param {文本框id} textId
 * @param {文本框描述内容} msg
 * @return {Boolean}
 */

function checkIsNum(textId, msg) {
  obj = $(textId);
  if (isNaN(obj.value)) {
    alert("[" + msg + "]必须为数字。");
    obj.focus();
    return false;
  } else return true;
}

/**
 * 判断某个文本框是否含有非法字符.
 * @param {文本框的id} textId
 * @param {文本框描述内容} msg
 * @return {有错就返回false否则返回true}
 */

function checkIsValid(textId, msg) {
  obj = $(textId);
  if (!_isValidString(obj.value, "[" + msg + "]不得含有非法字符。")) {
    obj.focus();
    return false;
  }
  return true;
}

/**
 * 判断是不是合法字符串.
 * @param {要进行判断的字符串} szStr
 * @param {文本描述} errMsg
 * @return {合法则返回true否则返回false}
 */

function _isValidString(szStr, errMsg) {
  var voidChar = "'\"><`~!@#$%^&()（）！￥……？?“”‘’*";
  for (var i = 0; i < voidChar.length; i++) {
    var aChar = voidChar.substring(i, i + 1);
    if (szStr.indexOf(aChar) > -1) {
      alert(errMsg);
      return false;
    }
  }
  return true;
}
