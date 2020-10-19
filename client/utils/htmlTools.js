/* eslint-disable prettier/prettier */
//返回顶部
export function goTop() {
  /*(function smoothscroll(){  
			var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;  
			if(currentScroll > 0){  
				window.requestAnimationFrame(smoothscroll);  
				window.scrollTo (0, currentScroll - (currentScroll/5));  
			}  
		})();  */
  window
    .$("html, body")
    .stop()
    .animate(
      {
        scrollTop: 0
      },
      300
    );
}

/** 
 * 得到一个元素的left坐标值. 
 * @param {dom对象} obj 
 * @return {位置值} 
 */  
function getLeft(obj){   
    var offset=e.offsetLeft;   
    if(e.offsetParent!=null) offset+=getLeft(e.offsetParent);   
    return offset;   
}   
  
/** 
* 得到一个元素的绝对位置的top坐标值. 
* @param {dom对象} obj 
* @return {位置值} 
*/  
function getTop(obj){   
    var offset=e.offsetTop;   
    if(e.offsetParent!=null) offset+=getTop(e.offsetParent);   
    return offset;   
} 
