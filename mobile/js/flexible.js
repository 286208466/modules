export function initHtmlFont() {
  var doc = document;
  var docEl = document.documentElement;
  var timer;
  var refreshFun = function () {
    var width = docEl.getBoundingClientRect().width;
    if (width > 750) {
      width = 750;
    }
    var rem = width / 7.5;
    docEl.style.fontSize = rem + "px";
  };
  refreshFun();
  window.addEventListener("resize", function () {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      refreshFun();
    }, 400);
  });
  window.addEventListener("pageshow", function () {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      refreshFun();
    }, 400);
  });
}

export function flexible() {
  var timer;
  const viewportWidth = 750;
  const baseSize = 32;
  function setRem() {
    const scale = document.documentElement.clientWidth / viewportWidth;
    document.documentElement.style.fontSize =
      baseSize * Math.min(scale, 2) + "px";
  }
  setRem();
  window.addEventListener("resize", function () {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      setRem();
    }, 400);
  });
}

/**
 * 移动端rem单位设置
 * 适用设计稿宽度为750
 * 计算方式：1rem = 100px;
 */
export function simple_flexible() {
  var clientWidth = document.getElementsByTagName("body")[0].clientWidth;
  var designWidth = 750;
  document.getElementsByTagName("html")[0].style.fontSize =
    (clientWidth / designWidth) * 100 + "px";
}
