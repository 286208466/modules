/**
 * 判断dom对象是否包含某个class
 * 
*/
export function hasClass(el, cName) {
  return !!el.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
}

/**
 * 给dom对象添加某个class
 * 
*/
export function addClass(el, cName) {
  if (!hasClass(el, cName)) {
    el.className += " " + cName;
  }
}

/**
 * 删除dom对象的某个class
 * 
*/
export function removeClass(el, cName) {
  if (hasClass(el, cName)) {
    el.className = el.className.replace(
      new RegExp("(\\s|^)" + cName + "(\\s|$)"),
      " "
    );
  }
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return;
  }
  let classString = element.className;
  const nameIndex = classString.indexOf(className);
  if (nameIndex === -1) {
    classString += "" + className;
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length);
  }
  element.className = classString;
}
