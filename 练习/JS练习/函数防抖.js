// 触发高频事件 N 秒后只会执行一次，如果 N 秒内事件再次触发，则会重新计时

// 简易版
function debounce(func, ms) {
    let timeout
    return function() {
        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
            func.apply(this, arguments)
        }, ms)
    }
}