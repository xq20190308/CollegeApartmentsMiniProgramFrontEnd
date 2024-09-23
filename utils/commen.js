// common.js
function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

function throttle(func, wait) {
  let previous = 0;
  return function() {
    const now = Date.now();
    const context = this;
    const args = arguments;
    if (now - previous > wait) {
      previous = now;
      func.apply(context, args);
    }
  };
}

// 将防抖和节流函数绑定到uniapp的Vue原型上
export default {
  install(Vue) {
    Vue.prototype.$debounce = debounce;
    Vue.prototype.$throttle = throttle;
  }
}