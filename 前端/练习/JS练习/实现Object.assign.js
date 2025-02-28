{
    // 原型链上的属性和不可枚举的属性不能被复制
    // 目标对象和源对象有相同键名就覆盖
    Object.assign = function(target, ...sources) {
        if (target === null || target === undefined) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        target = Object(target)
        for (let source of sources) {
            if (source === null || source === undefined) {
                continue;
            }
            const keys = Reflect.ownKeys(source)
            for (const key of keys) {
                if (source.hasOwnProperty(key)) {
                    target[key] = source[key]
                }
            }

        }

        return target
    }

    const obj = { a: 1 };
    const copy = Object.assign({}, obj);
    console.log(copy); // { a: 1 }
}

