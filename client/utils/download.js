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
