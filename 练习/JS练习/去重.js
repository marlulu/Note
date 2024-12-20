const array = [{id: 1, text: "1"}, {id: 1, text: "1"}, {}, {}, NaN,  undefined, NaN, undefined, null, null, 22, 22, 22, 22, 3, 3, 0, 0, 1, 1, '1', '1', 'true', 'true', true, true, false]

const array2 = [{id: 1, text: "1"}, {id: 1, text: "1"}, {id: 2, text: "1"}, {id: 2, text: "1"}]
/**
 * 数组去重
 */

/**
 * 先谈谈 == 和 === 的区别
 * == 首先会检测两个操作数的数据类型，
 * 若类型相同，直接比较值，类型不同，会进行类型转换，转换为相同类型，再比较值
 * === 直接比较值
 * 
 * == 转换表
 * String - 数字 => String转为数字然后比较
 * boolean - 任何类型 => boolean转为数字 true 1，false 0，然后比较
 * 对象 - 任何数据类型 => 对象会转为原始值
 * null = undefined => 相等
 * 任何类型 - null/undefined => false
 * 
 * 例子：[] == "" => true， {} == "[object Object]"
 * 
 * 其他：JS中除了 false，0，""，null，undefined，NaN之外的视为true
 */

/**
 * null 和 undefined 的区别
 * 
 * null 表示期望这个变量没有任何值
 * undefined 表示变量未被赋值，是一个意外的结果。
 * 
 * typeof undefined 会返回 undefined
 * typeof null 会返回 object
 * 
 * undefined 转化为数字会转为 NaN，Number(undefined)
 * null 转化为数字会转为 0，Number(0)
 * 
 */


// for循环
// 缺陷：不能去重 NaN 和 对象
function function_for(array) {
    const res = []
    for(const item of array) {
        let isSame = false;
        for (const value of res) {
            if (item === value) {
                isSame = true;
                break;
            }
        }
        if (!isSame) {
            res.push(item)
        }
        
    }
    return res;
}

// 利用 splice() + for 循环嵌套
// 缺陷：不能去重 NaN 和 对象
function function_Splice_for(array) {
    for(let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] === array[j]) {
                array.splice(j, 1)
                j--
            }
        }
    }

    return array;
}  

// 利用indexOf() + for循环去重
// 缺陷：不能去重 NaN 和 对象
function function_indexOf_for(array) {
    const res = []
    for(const item of array) {
        if (res.indexOf(item) !== -1) {
            continue
        }
        res.push(item)
    }

    return res;
}  

// 利用sort() + for循环去重（快慢指针）
// 缺陷：不能去重 NaN 和 对象
function function_sort_for(array) {
    array.sort()
    let i = 0;
    for(let j = 1; j < array.length; j++) {
        if (array[j] !== array[i]) {
            i++;
            array[i] = array[j]
        }
    }
    array.length = i + 1

    return array;
}  

// 利用includes() + for循环去重
// 缺陷：不能去重 对象
function function_includes_for(array) {
    const res = []
    for(const item of array) {
        if (!res.includes(item)) {
            res.push(item)
        }
    }

    return res;
}  

// 利用 filter + indexOf 去重
// 缺陷：不能去重 对象，且 NaN 会被去掉，因为 indexOf(NaN) = -1
function function_fliter_indexOf(array) {
    return array.filter((item, index) => array.indexOf(item) === index);
}  

// 利用 Set 数据结构去重
// 缺陷：不能去重 对象
function function_Set(array) {
    return [...new Set(array)];
}  

// 利用 Set 数据结构去重
// 缺陷：不能去重 对象
function function_Map(array) {
    const map = new Map()
    for(const item of array) {
        if (!map.has(item)) {
            map.set(item);
        }
    }
    return Array.from(map.keys())
}  


// 利用 reduce() + includes() 去重
// 缺陷：不能去重 对象
function function_reduce_includes(array) {
    return array.reduce((prev, cur) => {
        return prev.includes(cur) ? prev : [...prev, cur]
    }, [])
}  
     

// 利用findIndex() + Object.is()去重
// 缺陷：不能去重 对象
function function_findIndex_Object_is(array) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        const index = result.findIndex(item => Object.is(array[i], item))
        if(index === -1) {
            result.push(array[i]);
        }
    }

    return result
} 


/**
 * 对象数组去重
 * 
 * 基本类型比较的是值，引用类型比较的是地址
 */

// 思路1：将对象转为字符串进行基本类型的去重
function function_JSON_String(array) {
    const strings = array.map(element => {
        return JSON.stringify(element)
    });

    return Array.from(new Set(strings)).map((item) => JSON.parse(item))
}

// 思路2：以对象中不能重复的键作为区分值
// 以 id 为例子
function function_only(array) {
    const map = new Map()
    return array.filter((array) => !map.has(array.id) && map.set(array.id))
}
