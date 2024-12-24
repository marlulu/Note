// forEach
Array.prototype.forEach = function(callbackFn, thisArg) {
    if (this === null) {
        throw new TypeError('this is null or not defined')
    }
    if (typeof callbackFn !== 'function') {
        return new TypeError(callback + ' is not a function')
    } 
    const array = Object(this)
    // 确保转换后的值为正整数，且在无意义的情况默认值为 0 
    // 底层：非 number -> number -> Uint 32
    const len = array.length >>> 0 
    let k = 0
    while (k < len) {
        if (k in array) {
            callbackFn.call(thisArg, array[k], k, array);
        }
        k++
    }
}

// map
Array.prototype.map = function(callbackFn, thisArg) {
    if (this === null) {
        throw new TypeError('this is null or not defined')
    }
    if (typeof callbackFn !== 'function') {
        return new TypeError(callback + ' is not a function')
    } 
    const array = Object(this)
    // 确保转换后的值为正整数，且在无意义的情况默认值为 0 
    // 底层：非 number -> number -> Uint 32
    const len = array.length >>> 0 
    let k = 0, res = []
    while (k < len) {
        if (k in array) {
            res[k] = callbackFn.call(thisArg, array[k], k, array);
        }
        k++
    }
    return res
}

// filter
Array.prototype.filter = function(callbackFn, thisArg) {
    if (this === null) {
        throw new TypeError('this is null or not defined')
    }
    if (typeof callbackFn !== 'function') {
        return new TypeError(callback + ' is not a function')
    } 
    const array = Object(this)
    // 确保转换后的值为正整数，且在无意义的情况默认值为 0 
    // 底层：非 number -> number -> Uint 32
    const len = array.length >>> 0 
    let k = 0, res = []
    while (k < len) {
        if (k in array) {
            if (callbackFn.call(thisArg, array[k], k, array)) {
                res.push(array[k])
            }
        }
        k++
    }
    return res
}

// some
// 通过 callbackFn 寻找真值，找到直接返回 true，找不到就下一个元素
// 当所有元素都返回假值，就会返回 false
Array.prototype.some = function(callbackFn, thisArg) {
    if (this === null) {
        throw new TypeError('this is null or not defined')
    }
    if (typeof callbackFn !== 'function') {
        return new TypeError(callback + ' is not a function')
    } 
    const array = Object(this)
    // 确保转换后的值为正整数，且在无意义的情况默认值为 0 
    // 底层：非 number -> number -> Uint 32
    const len = array.length >>> 0 
    let k = 0
    while (k < len) {
        if (k in array) {
            if (callbackFn.call(thisArg, array[k], k, array)) {
                return true
            }
        }
        k++
    }
    return false
}

// reduce
Array.prototype.reduce  = function(callbackFn, initialValue) {
    console.log(callbackFn)
    if (this === null) {
        throw new TypeError('this is null or not defined')
    }
    if (typeof callbackFn !== 'function') {
        return new TypeError(callback + ' is not a function')
    } 
    const array = Object(this)
    console.log(array)
    // 确保转换后的值为正整数，且在无意义的情况默认值为 0 
    // 底层：非 number -> number -> Uint 32
    const len = array.length >>> 0 
    let k = 0, access
    if (arguments.length > 1) {
        access = initialValue
    } else {
        if (len === 0) {
            throw new TypeError( 'Reduce of empty array with no initial value' );
        }
        access = array[k++]
    }
    while (k < len) {
        if (k in array) {
            access = callbackFn(access, array[k], k, array)
        }
        k++
    }

    return access
}