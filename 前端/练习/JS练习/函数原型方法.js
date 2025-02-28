/**
 * 实现思路
 * 判断调用对象是否为函数
 * 判断传入上下文对象是否存在，如果不存在，则设置为window
 * 处理传入的参数，截取第一个参数后的所有参数
 * 将函数作为上下文对象的一个属性
 * 使用上下文对象来调用这个方法，并保存返回结果
 * 删除刚才新增的属性
 * 返回结果
 * 
 * */ 


// call
Function.prototype.call = function(context) {
    if (typeof this !== 'function') {
        return new TypeError('TypeError: Cannot read the property of')
    }

    let args = [...arguments].slice(1), result = null
    context = context || window
    context.fn = this
    result = context.fn(...args)

    delete context.fn
    return result
}

// apply
Function.prototype.apply = function(context) {
    if (typeof this !== 'function') {
        return new TypeError('TypeError: Cannot read the property of')
    }

    let result = null
    context = context || window
    context.fn = this

    if (arguments[1]) {
        result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }
    
    delete context.fn
    return result

}

// bind
// 分为构造函数和普通函数
// 绑定函数没有 prototype 属性
// 一个绑定函数也能使用new操作符创建对象造器。提供的：这种行为就像把原函数当成构 this 值被忽略
Function.prototype.bind = function (context) {
    if (typeof this !== 'function') {
        return new TypeError('TypeError: Cannot read the property of')
    }
    let _this = this
    // 获取参数
    let args = Array.prototype.slice.call(arguments, 1);

    if (this.prototype) {
        // 让fBind的原型指向绑定函数的原型
        fNOP.prototype = this.prototype
    }
    fBInd.prototype = new fNOP()

    function fNOP() {}
    function fBInd () {
        let bindArgs = args.concat(Array.prototype.slice.call(arguments))
        return _this.apply(this instanceof fBInd ? this : context, bindArgs)
    }
    return fBInd
}