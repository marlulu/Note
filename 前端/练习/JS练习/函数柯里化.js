// 将多个参数的函数转换成使用一个参数的函数的技术
function curry(func) {
    function curried(...args) {
        // 如果收集到的参数个数小于原始函数的参数个数
        if (args.length >= func.length) {
            // 直接调用原始函数并返回结果
            return func(...args);
        } else {
            // 否则，返回一个新的函数，该函数会继续收集剩余的参数
            return function (...moreArgs) {
                // 递归调用curried函数，并传入所有已收集的参数和新收集的参数
                return curried(...args, ...moreArgs);
            };
        }
    }

    return curried
}