/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
//验证是否是url
export function isUrl(str) {
  return /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(
    str
  );
}

//是否是微信客户端
export function isWx() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
}

//是否存在指定函数
export function isExitsFunction(funcName) {
  try {
    if (typeof eval(funcName) == "function") {
      return true;
    }
  } catch (e) {}
  return false;
}
//是否存在指定变量
export function isExitsVariable(variableName) {
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
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}
/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}
