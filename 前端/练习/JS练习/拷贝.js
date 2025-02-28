const obj = {
    name: 1,
    key: 1,
    age: 2,
    value: NaN,
    array: [],
    obj: {}
}

// 浅拷贝

// Object.assign()
function shallowCopy(obj) {
    return Object.assign(obj)
}

// 展开运算符（...）
function copy(obj) {
    return obj instanceof Array ? [...obj] : {...obj}
}

// 只考虑对象类型
function shallowCopyOld(obj) {
    if (typeof obj !== 'object') return
    const newObj = obj instanceof Array ? [] : {}
    for (const key of obj.keys()) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key]
        }
    }

    return newObj
}

// 深拷贝

// 序列化与反序列化
// 不能处理函数、undefined、NaN、Infinity、Symbol、循环引用等特殊值
JSON.parse(JSON.stringify(obj));

// 使用库函数
// const _ = require('lodash');
// const copyData = _.cloneDeep(original);

// 递归
// 分别进行处理
function deepCopy(obj, hash = new WeakMap()) {
    // 处理 null、undefined 和非对象类型
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // 处理循环引用
    if (hash.has(obj)) {
        return hash.get(obj)
    }

    // 处理Date类型
    if (obj instanceof Date) {
        return new Date(obj);
    }

    // 处理Array类型
    if (Array.isArray(obj)) {
        const copy = [];
        hash.set(obj, copy);
        for (let i = 0; i < obj.length; i++) {
            copy[i] = deepCopy(obj[i], hash);
        }
        return copy;
    }

    // 处理普通对象
    const copy = {}
    hash.set(obj, copy)
    for (const key of obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepCopy(obj[key], hash);
        }
    }
  

    // 处理 Map 和 Set 类型
    // Map
    if (obj instanceof Map) {
        const mapCopy = new Map();
        hash.set(obj, mapCopy);
        obj.forEach((value, key) => {
            mapCopy.set(deepCopy(key, hash), deepCopy(value, hash));
        });
        return mapCopy;
    }

    // Set
    if (obj instanceof Set) {
        const setCopy = new Set();
        hash.set(obj, setCopy);
        obj.forEach((value, key) => {
            setCopy.add(deepCopy(key, hash), deepCopy(value, hash));
        });
        return cosetCopyy;
    }

    // 等方法

    return copy;
}
