export function isUrl(str) {
  var strRegex =
    "^((https|http|ftp|rtsp|mms)?://)" +
    "?(([0-9a-z_!~*'().&=+%-]+@)?" + //ftp的user@
    "(([0-9]{1,3}.){3}[0-9]{1,3}" + // IP形式的URL- 199.194.52.184
    "|" + // 允许IP和DOMAIN（域名）
    "([0-9a-z_!~*'()-]+.)*" + // 域名- www.
    "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]." + // 二级域名
    "[a-z]{2,6})" + // first level domain- .com or .museum
    "(:[0-9]{1,4})?" + // 端口- :80
    "((/?)|" + // a slash isn't required if there is no file name
    "(/[0-9a-z_!~*'().;?:@&=+,";
  var re = new RegExp(strRegex);
  //re.test()
  if (re.test(str)) {
    return true;
  } else {
    return false;
  }
}

export function isUrl2(str) {
  var RegUrl = new RegExp();
  RegUrl.compile("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&?/.=]+$"); //jihua.cnblogs.com
  if (!RegUrl.test(str)) {
    return false;
  }
  return true;
}

export function isUrl3(str) {
  if (str != "") {
    var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
    if (!reg.test(str)) {
      alert("不是正确的网址吧，请注意检查一下");
    }
  }
}

export function isUrl4(str) {
  return /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(
    str
  );
}

//ipv4地址
export function checkIp(str) {
  return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
    str
  );
}

//匹配手机号
export function isMobile(mobile) {
  return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(mobile);
  //    /^1[34578]\d{9}$/
}

/**
 *
 * 验证电话号码
 * 正确格式为："XXX-XXXXXXX"
 */
export function checkTel(str) {
  return /^(\(\d{3,4}-)|\d{3.4}-)?\d{7,8}$/.test(str);
}

/**
 * 用户名正则
 * 5到20位（字母，数字，下划线，减号）
 */
export function checkLoginAccount(str) {
  return /^[a-zA-Z0-9_-]{5,20}$/.test(str);
}

/**
 * 密码强度正则
 * 最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
 */
export function checkLoginPwd(str) {
  return /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(
    str
  );
}

//正整数
export function isPositiveInt(str) {
  return /^\d+$/.test(str);
}
//负整数
export function isNegtiveInt(str) {
  return /^-\d+$/.test(str);
}
//整数
export function isInt(str) {
  return /^-?\d+$/.test(str);
}
//正数
export function isPositivePattern(str) {
  return /^\d*\.?\d+$/.test(str);
}
//负数
export function isNegtivePattern(str) {
  return /^-\d*\.?\d+$/.test(str);
}
//数字
export function isNumber(str) {
  return /^-?\d*\.?\d+$/.test(str);
}

/**
 * email校验
 * ^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$
 *
 */
export function isEmail(str) {
  return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
    str
  );
}

//身份证校验15位或18位数字）
export function isIdCard(str) {
  return /^\d{15}|\d{18}$/.test(str);
}

//十六进制颜色正则
export function checkRgba(str) {
  return /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(str);
}

//QQ号码正则
export function isQqAccount(str) {
  return /^[1-9][0-9]{4,10}$/.test(str);
}

//微信号正则
export function isWxAccount(str) {
  return /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/.test(str);
}

//车牌号正则
export function isCarNumber(str) {
  return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/.test(
    str
  );
}

/**
 * 是否包含中文
 * 只能输入汉字:/^[\u4e00-\u9fa5]{0,}$/
 *
 */
export function hasChinese(str) {
  return /[\u4E00-\u9FA5]/.test(str);
}

/**
 * 匹配html标签
 * 
*/
export function isHtml(str){
    return /<(.*)>(.*)<\/(.*)>|<(.*)\/>/.test(str)
}

// 整数或者小数：^[0-9]+\.{0,1}[0-9]{0,2}$
// 只能输入数字："^[0-9]*$"。
// 只能输入n位的数字："^\d{n}$"。
// 只能输入至少n位的数字："^\d{n,}$"。
// 只能输入m~n位的数字：。"^\d{m,n}$"
// 只能输入零和非零开头的数字："^(0|[1-9][0-9]*)$"。
// 只能输入有两位小数的正实数："^[0-9]+(.[0-9]{2})?$"。
// 只能输入有1~3位小数的正实数："^[0-9]+(.[0-9]{1,3})?$"。
// 只能输入非零的正整数："^\+?[1-9][0-9]*$"。
// 只能输入非零的负整数："^\-[1-9][]0-9"*$。
// 只能输入长度为3的字符："^.{3}$"。
// 只能输入由26个英文字母组成的字符串："^[A-Za-z]+$"。
// 只能输入由26个大写英文字母组成的字符串："^[A-Z]+$"。
// 只能输入由26个小写英文字母组成的字符串："^[a-z]+$"。
// 只能输入由数字和26个英文字母组成的字符串："^[A-Za-z0-9]+$"。
// 只能输入由数字、26个英文字母或者下划线组成的字符串："^\w+$"。
// 验证用户密码："^[a-zA-Z]\w{5,17}$"正确格式为：以字母开头，长度在6~18之间，只能包含字符、数字和下划线。
// 验证是否含有^%&'',;=?$\"等字符："[^%&'',;=?$\x22]+"。
// 只能输入汉字："^[\u4e00-\u9fa5]{0,}$"
// 验证Email地址："^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$"。
// 验证InternetURL："^http://([\w-]+\.)+[\w-]+(/[\w-./?%&=]*)?$"。
// 验证电话号码："^(\(\d{3,4}-)|\d{3.4}-)?\d{7,8}$"正确格式为："XXX-XXXXXXX"、"XXXX- XXXXXXXX"、"XXX-XXXXXXX"、"XXX-XXXXXXXX"、"XXXXXXX"和"XXXXXXXX"。
// 验证身份证号（15位或18位数字）："^\d{15}|\d{18}$"。
// 验证一年的12个月："^(0?[1-9]|1[0-2])$"正确格式为："01"～"09"和"1"～"12"。
// 验证一个月的31天："^((0?[1-9])|((1|2)[0-9])|30|31)$"正确格式为；"01"～"09"和"1"～"31"。整数或者小数：^[0-9]+\.{0,1}[0-9]{0,2}$
// 只能输入数字："^[0-9]*$"。
// 只能输入n位的数字："^\d{n}$"。
// 只能输入至少n位的数字："^\d{n,}$"。
// 只能输入m~n位的数字：。"^\d{m,n}$"
// 只能输入零和非零开头的数字："^(0|[1-9][0-9]*)$"。
// 只能输入有两位小数的正实数："^[0-9]+(.[0-9]{2})?$"。
// 只能输入有1~3位小数的正实数："^[0-9]+(.[0-9]{1,3})?$"。
// 只能输入非零的正整数："^\+?[1-9][0-9]*$"。
// 只能输入非零的负整数："^\-[1-9][]0-9"*$。
// 只能输入长度为3的字符："^.{3}$"。
// 只能输入由26个英文字母组成的字符串："^[A-Za-z]+$"。
// 只能输入由26个大写英文字母组成的字符串："^[A-Z]+$"。
// 只能输入由26个小写英文字母组成的字符串："^[a-z]+$"。
// 只能输入由数字和26个英文字母组成的字符串："^[A-Za-z0-9]+$"。
// 只能输入由数字、26个英文字母或者下划线组成的字符串："^\w+$"。
// 验证用户密码："^[a-zA-Z]\w{5,17}$"正确格式为：以字母开头，长度在6~18之间，只能包含字符、数字和下划线。
// 验证是否含有^%&'',;=?$\"等字符："[^%&'',;=?$\x22]+"。
// 验证一年的12个月："^(0?[1-9]|1[0-2])$"正确格式为："01"～"09"和"1"～"12"。
// 验证一个月的31天："^((0?[1-9])|((1|2)[0-9])|30|31)$"正确格式为；"01"～"09"和"1"～"31"。 匹配中文字符的正则表达式： [\u4e00-\u9fa5]


/**
 * 用正则表达式限制只能输入中文：
 * onkeyup="value=value.replace(/[^\u4E00-\u9FA5]/g,'')" 
 * onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\u4E00-\u9FA5]/g,''))"
 * 
 * */ 

/**
 * 用正则表达式限制只能输入全角字符：
 * onkeyup="value=value.replace(/[^\uFF00-\uFFFF]/g,'')"
 * onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\uFF00-\uFFFF]/g,''))"
 * 
 * */   

/**
 * 用正则表达式限制只能输入数字：
 * onkeyup="value=value.replace(/[^\d]/g,'')"
 * onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"
 * 
 * */  

/**
 * 用正则表达式限制只能输入数字和英文：
 * onkeyup="value=value.replace(/[\W]/g,'')"
 * onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"
 * 
 * */  














