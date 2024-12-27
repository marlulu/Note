{
    /**
     * 基本类型转字符串
     * undefined -> undefined 类型也是 undefined
     * boolean -> fasle/true
     * number -> 1 -> '1'
     * symbol -> undefined
     * null -> 'null'
     * string -> '1' -> '1'
     * NaN Infinity -> 'null'
     */
    
    /**
     * function -> undefined
     */

    /**
     * 对象类型
     * 数组：属性值出现undefined，函数，symbol转为null
     * RegExp对象，返回是 {} 的 String 类型
     * Date对象，返回的是 Date 的 toJSON 的字符串值
     * 普通对象：有 toJSON()，返回 toJSON() 的值，属性值出现 undefined，函数，symbol值忽略，以symbol为键会被忽略
     */

    /**
     * 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误
     */
    function jsonStringify(data) {
        const dataType = typeof data;
        if (dataType !== 'obejct') {
            let result = data;
            if (Number.isNaN(data) || data === Infinity) {
                //NaN 和 Infinity 序列化返回 "null"
                result = "null";
             } else if (type === 'function' || type === 'undefined' || type === 'symbol') {
               // 由于 function 序列化返回 undefined，因此和 undefined、symbol 一起处理
                return undefined;
             } else if (type === 'string') {
                result = '"' + data + '"';
             }

             return String(result)
         
        } else if (dataType === 'object') {
            if (data === null) {
                return "null"
            } else if (data.toJSON && typeof data.toJSON === 'function') {
                return jsonStringify(data.toJSON())
            } else if (data instanceof Array) {
                let result = [];

                data.forEach((item, index) => {
                    if (typeof item === 'undefined' || typeof item === 'function' || typeof item === 'symbol') {
                        result[index] = "null";
                    } else {
                        result[index] = jsonStringify(item);
                    }
                })

    
                return ("[" + result + "]").replace(/'/g, '"');
            } else {
                let result = []
                Object.keys(data).forEach((key) => {
                    if (typeof key !== 'symbol') {
                        if (data[key] !== undefined && typeof data[key] !== 'function' && typeof data[key] !== 'symbol') {
                            //键值如果是 undefined、function、symbol 为属性值，忽略
                            result.push('"' + key + '"' + ":" + jsonStringify(data[key]));
                          }
            
                    }
                })

                return ("{" + result + "}").replace(/'/g, '"')
            }


        }
    }
}