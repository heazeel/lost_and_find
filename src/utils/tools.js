/*
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-02-06 16:29:23
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-02-07 12:45:38
 */

/*
 * @Description: 节流函数
 * @param: {Function} fn
 * @param: {Number} delay
 * @return: {Function}
 */
export const throttle = (fn, delay) => {
  var lastTime = 0;
  return function () {
    const nowTime = Date.now();
    if (nowTime - lastTime > delay) {
      fn.apply(this);
      lastTime = nowTime;
    }
  };
};

/*
 * @Description: 防抖函数
 * @param: {Function} fn
 * @param: {Number} delay
 * @return: {Function}
 */
export const debounce = (fn, delay) => {
  var timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(this);
    }, delay);
  };
};
