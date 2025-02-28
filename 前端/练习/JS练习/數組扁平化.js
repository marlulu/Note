// 将多维的数组转为一维数组

const nestedArray = [1, [2, [3, [4]], 5]];

const arr = [1, [2, [3, [4]], 5]];

const values = [1, [2, [3, [4]], 5]];

// 递归
function flattenArray(array) {
    let result = []
    array.forEach(element => {
        if (Array.isArray(element)) {
            result = result.concat(flattenArray(element))
        }else {
            result.push(element)
        }
    });
    return result
}

// 使用 Array.prototype.flat()
// 默认扁平化一层
// Infinity 表示无限层
const flastArray = nestedArray.flat(Infinity)

// 使用堆栈（Stack）模拟递归
function flattenStack(array) {
    const stack = [...array]
    const result = []
    while(stack.length) {
        const next = stack.pop()
        if (Array.isArray(next)) {
            stack.push(...next)
        } else {
            result.push(next)
        }
    }
    return result.reverse()
}

// 使用生成器（Generator）
function* flattenGenerator(arr) {
    for(const item of arr) {
        if (Array.isArray(item)) {
            yield* flattenGenerator(item)
        } else {
            yield item
        }
    }
}
const newArray = [...flattenGenerator(arr)]

// 使用扩展运算符（...）和 reduce
// concat 传递非数组值会作为单个元素加到结果数组，若其中有数组就作为数组处理
// 相当于只扁平化一层
function flattenReduce(arr) {
    return arr.reduce((prev, cur) => Array.isArray(cur) ? prev.concat(flattenReduce(cur)) : prev.concat(cur), [])
}

// console.log([1,2,3].concat(1,2,3,[4,[5,6]]))