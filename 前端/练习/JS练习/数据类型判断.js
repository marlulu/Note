/**
 * 数据类型分为 Unddefined NUll Boolean Number String Symbol Object
 * 基本引用类型 Date RegExp Number String Boolean Global Math
 * 集合引用类型 Object Array Map WeakMap Set WeakSet
 * 
 * 基本类型只对值进行操作，按值访问。对其变量进行修改时，是对存储值的修改
 * 引用类型通过引用进行，按引用访问，对其变量进行修改时，是操作应用对象在内存中的值
 * 基本类型变量的复制，创建的是一个新的值，两个变量存储的是不同的值
 * 引用类型变量的复制，是复制存储在栈的引用，非对象本身，这就表明了两个变量都引用的是同一个对象，修改一个变量会影响另一个变量
 */
function typeOf(obj) {
    // 返回对象内部的[[Class]]属性的字符串表示
    let res =  Object.prototype.toString.call(obj)
    // 切片获取类型名称，如 [object Null]，切片为 Null
    return res.slice(8, -1)
}

