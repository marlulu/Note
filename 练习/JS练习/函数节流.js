// 触发高频事件，且 N 秒内只执行一次。

// 简易版
function throttle(func, ms) {
    let previous = 0
    return function() {
        let now = Date.now()
        let context = this;
        let args = arguments;
        if (now - previous > ms) {
            func.apply(args, context)
            previous = now
        }
    }
}