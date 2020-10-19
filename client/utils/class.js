export function hasClass(el, cName) {
  return !!el.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
}

export function addClass(el, cName) {
  if (!hasClass(el, cName)) {
    el.className += " " + cName;
  }
}

export function removeClass(el, cName) {
  if (hasClass(el, cName)) {
    el.className = el.className.replace(
      new RegExp("(\\s|^)" + cName + "(\\s|$)"),
      " "
    );
  }
}
