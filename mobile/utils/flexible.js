export function initHtmlFont() {
  var doc = document;
  var docEl = documentElement;
  var timer;
  function refresh() {
    var width = docEl.getBoundingClientRect().width;
    if (width > 750) {
      width = 750;
    }
    var rem = width / 7.5;
    docEl.style.fontSize = rem + "px";
  }
  refresh();
  window.addEventListener("resize", function () {
    timer && clearTimeout(timer);
    timer = setTimeout(refresh, 400);
  });
  window.addEventListener("pageshow", function () {
    timer && clearTimeout(timer);
    timer = setTimeout(refresh, 400);
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
    timer = setTimeout(refresh, 400);
  });
}
