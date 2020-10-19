var http = require("http");
var qs = require("querystring");
var mysql = require("mysql");

var server = {
  name: "10.41.13.82",
  port: "8332"
};

var utils = {};

//返回json数据
utils.json = function(res, ret) {
  if (typeof ret === "undefined") {
    res.status(200).json({
      code: "0",
      message: "系统繁忙！"
    });
  } else {
    res.status(200).json(ret);
  }
};

//与mysql建立连接
utils.createConnection = function() {
  var conn = mysql.createConnection({
    host: "10.41.13.136",
    user: "root",
    password: "123456",
    database: "71sino_web",
    port: 3306
  });
  return conn;
};

//校验是否登录
utils.checkLogin = function(req, res, callback) {
  if (req.session.user) {
    res.locals.user = req.session.user;
  }
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    callback();
  }
};

/*
 	formidable遍历所有上传来的图片
 	upload: function(req, res, next){
      	var imgLinks = [];
      	var form = new formidable.IncomingForm();
      	form.encoding = "utf-8";
      	form.uploadDir = "public/upload/";
      	//保留后缀
      	form.keepExtensions = true;
      	form.maxFieldsSize = 1024 * 1024 * 1024;
      	form.hash = false;
      	form.multiples = false;

      	form.parse(req, function(err, fields, files) {
          	if (err) {
              	util.json(res, {
                  	code: 1,
                  	message: '上传失败！'
              	});
              	return;
          	}
          	// 遍历所有上传来的图片
          	utils.objForEach(files, (name, file) => {
              	console.log(req.baseUrl);
              	var name =  new Date().getTime() + "_" + file.name;
              	fs.renameSync(file.path, (form.uploadDir + name));
              	imgLinks.push("/upload/" + name);
          	});
          	utils.json(res, {
              	errno: 0,
              	data: imgLinks
          	});
      	});
    }
 	
*/
utils.objForEach = function(obj, fn) {
  var key, result;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      result = fn.call(obj, key, obj[key]);
      if (result === false) {
        break;
      }
    }
  }
};

/*
	向其他服务器发起get请求
	param.data 发起get请求提交的数据
	param.url 路径
	param.success  回调
*/
utils.get = function(param) {
  var path = param.url;
  if (!!param.data) {
    var arr = [];
    for (var k in param.data) {
      arr.push(k + "=" + param.data[k]);
    }
    path = path + "?" + arr.join("&");
  }
  console.info("调用接口：" + path);
  var options = {
    hostname: server.name,
    port: server.port,
    path: path,
    method: "GET",
    timeout: 6000
  };

  var req = http.request(options, function(res) {
    console.info("STATUS: " + res.statusCode);
    console.info("HEADERS: " + JSON.stringify(res.headers));
    res.setEncoding("utf8");
    var data = "";
    res.on("data", function(chunk) {
      data += chunk;
    });
    res.on("end", function() {
      console.info("调用接口：" + path + "结束----" + new Date());
      if (res.statusCode == 200) {
        param.success && param.success(data);
      } else {
      }
    });
  });

  req.on("error", function(e) {
    console.log("problem with request: " + e.message);
  });

  req.end();
};

/*
	发起post请求
	param.data 发起post请求提交的数据
	param.url 路径
	param.success  回调
*/
utils.post = function(param) {
  var path = param.url;
  var data = param.data || {};

  var contents = qs.stringify(data);
  console.log("post请求参数：" + contents);
  var options = {
    hostname: server.name,
    port: server.port,
    path: path,
    method: "POST",
    timeout: 6000,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": contents.length
    }
  };

  var req = http.request(options, function(res) {
    res.setEncoding("utf8");
    var json = "";
    res.on("data", function(chunk) {
      json += chunk;
    });
    res.on("end", function() {
      if (res.statusCode == 200) {
        console.info("调用接口：" + path + "结束----" + new Date());
        param.success && param.success(json);
      } else {
      }
    });
  });

  req.on("error", function(e) {
    console.log("problem with request: " + e.message);
  });

  req.write(contents);
  req.end;
};

//获取IP地址
utils.getIp = function(req) {
  var ipAddress;
  var forwardIpStr = req.headers["x-forwarded-for"];
  if (forwardIpStr) {
    var forwardIp = forwardIpStr.split(",");
    ipAddress = forwardIp[0];
  }
  if (!ipAddress) {
    ipAddress = req.connection.remoteAdress;
  }
  if (!ipAddress) {
    ipAddress = req.socket.remoteAdress;
  }
  if (!ipAddress) {
    if (req.connection.socket) {
      ipAddress = req.connection.socket.remoteAdress;
    } else if (req.headers["remote_addr"]) {
      ipAddress = req.headers["remote_addr"];
    } else if (req.headers["client_ip"]) {
      ipAddress = req.headers["client_ip"];
    } else {
      ipAddress = req.ip;
    }
  }
  return ipAddress;
};

//时间格式化
utils.dateformat = function(date, format) {
  if (typeof date === "string") {
    var mts = date.match(/(\/Date\((\d+)\)\/)/);
    if (mts && mts.length >= 3) {
      date = parseInt(mts[2]);
    }
  }
  date = new Date(date);
  if (!date || date.toUTCString() == "Invalid Date") {
    return "";
  }

  var map = {
    M: date.getMonth() + 1, //月份
    d: date.getDate(), //日
    h: date.getHours(), //小时
    m: date.getMinutes(), //分
    s: date.getSeconds(), //秒
    q: Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  };

  format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
    var v = map[t];
    if (v !== undefined) {
      if (all.length > 1) {
        v = "0" + v;
        v = v.substr(v.length - 2);
      }
      return v;
    } else if (t === "y") {
      return (date.getFullYear() + "").substr(4 - all.length);
    }
    return all;
  });

  return format;
};

module.exports = utils;
