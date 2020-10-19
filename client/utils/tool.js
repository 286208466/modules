//过滤表情
export function filteremoji(content) {
  var ranges = [
    "\ud83c[\udf00-\udfff]",
    "\ud83d[\udc00-\ude4f]",
    "\ud83d[\ude80-\udeff]",
  ];
  var emojireg = content.replace(new RegExp(ranges.join("|"), "g"), "");
  return emojireg;
}

//计算字节
export function countByte(s) {
  var len = 0;
  for (var i = 0; i < s.length; i++) {
    var c = s.charCodeAt(i);
    //单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      len++;
    } else {
      len += 2;
    }
  }
  return len;
}

//加载js
export function loadScript(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  if (script.readyState) {
    script.onreadystatechange = function() {
      if (script.readyState == "loaded" || script.readyState == "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = function() {
      callback();
    };
  }
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

//过滤XSS攻击
export function escape(str) {
  return String(str)
    .replace(/&(?!\w+;)/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

//去掉2边空格
export function trim(str) {
  str = typeof str === "string" ? str : "";
  return str.trim ? str.trim() : str.replace(/^\s|\s$/g, "");
}

//获取IE版本
export function getIEVersion() {
  var ua = navigator.userAgent,
    matches,
    tridentMap = { "4": 8, "5": 9, "6": 10, "7": 11 };
  matches = ua.match(/MSIE (\d+)/i);
  if (matches && matches[1]) {
    return +matches[1];
  }
  matches = ua.match(/Trident\/(\d+)/i);
  if (matches && matches[1]) {
    return tridentMap[matches[1]] || null;
  }
  return null;
}

//检测浏览器，如果是ie7、ie6 显示提示升级浏览器信息
export function updateIE() {
  var browser = navigator.appName;
  if (browser == "Microsoft Internet Explorer") {
    var b_version = navigator.appVersion;
    var version = b_version.split(";");
    var trim_Version = version[1].replace(/[ ]/g, "");
    if (trim_Version == "MSIE7.0" || trim_Version == "MSIE6.0") {
      window.location.href = "../../system/ie.html";
    }
  }
}

//是否是PC端
export function isPc() {
  var userAgentInfo = navigator.userAgent;
  var Agents = new Array(
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod"
  );
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

export function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  //if (r != null) return unescape(r[2]);
  return null;
}

//iframe下载文件
export function download(filepath) {
  var iframe = document.getElementById("downloadframe");
  if (iframe) {
    iframe.src = filepath;
  } else {
    iframe = document.createElement("iframe");
    iframe.src = filepath;
    iframe.style.display = "none";
    iframe.id = "downloadframe";
    document.body.appendChild(iframe);
  }
}

/*
-------------------------------------------------------
base64加密解密
-------------------------------------------------------
var _base64 = function(){

    var self = this;

    // private property
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = self._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }

    // public method for decoding
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = self._utf8_decode(output);
        return output;
    }

    // private method for UTF-8 encoding
    this._utf8_encode = function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // private method for UTF-8 decoding
    this._utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = 0;
        var c1 = 0;
        var c2 = 0;
        var c3 = 0;
        while ( i < utftext.length ) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
};
//base64加密
function encrypt(str){
	var base64 = new _base64();
    var encrypt = base64.encode(str);
    return encrypt;
}
//base64解密
function decrypt(str){
	var base64 = new _base64();
    var decrypt = base64.decode(str);
    decrypt = escape(decrypt);
    decrypt = decrypt.replace(/%00/g, '');
    decrypt = unescape(decrypt);
    return decrypt;
}
*/

/*
-------------------------------------------------------
解决不支持Object.create
-------------------------------------------------------
if (!Object.create) {
    Object.create = function(o, properties) {
        if (typeof o !== 'object' && typeof o !== 'function') throw new TypeError('Object prototype may only be an Object: ' + o);
    else if (o === null) throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");

    if (typeof properties != 'undefined') throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");

        function F() {}

        F.prototype = o;

        return new F();
    };
}

(function() {
	var testObject = {};
	if (!(Object.setPrototypeOf || testObject.__proto__)) {
		var nativeGetPrototypeOf = Object.getPrototypeOf;

		Object.getPrototypeOf = function(object) {
			if (object.__proto__) {
				return object.__proto__;
			} else {
				return nativeGetPrototypeOf.call(Object, object);
			}
		}
	}
})();
*/
