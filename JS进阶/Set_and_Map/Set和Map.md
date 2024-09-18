# Set and Map

--------

Set 是一种叫做 集合 的数据结构，Map 是一种叫做 字典 的数据结构

## Set
类似数组，有序结构，成员唯一，不可重复。

引用类型数据，有构造函数：`let set = new set([]);`

**操作方法**
+ Set.prototype.add(value)：添加元素，出现在 set 结尾处，若元素存在则忽略，返回值为 set 对象。
+ Set.prototype.delete()：删除，返回布尔值，表示是否删除成功
+ Set.prototype.has(value)：返回布尔值，表示该值是否为 Set 成员
+ Set.prototype.clear()：清除所有成员。
+ Set.prototype.size()：返回 Set 中元素的数量

**遍历方法**
+ Set.prototype.keys()：返回键名的遍历器
+ Set.prototype.values()：返回键值的遍历器
+ Set.prototype.entries()：返回键值对的遍历器
+ Set.prototype.forEach()：使用回调函数遍历每个成员

**集合运算方法**
+ Set.prototype.intersection(other)：交集
+ Set.prototype.union(other)：并集
+ Set.prototype.difference(other)：差集
+ Set.prototype.symmetricDifference(other)：对称差集
+ Set.prototype.isSubsetOf(other)：判断是否为子集
+ Set.prototype.isSupersetOf(other)：判断是否为超集
+ Set.prototype.isDisjointFrom(other)：判断是否不相交
>以上方法的参数都必须是 Set 结构，或者是一个类似于 Set 的结构（拥有size属性，以及keys()和has()方法。


数组的去重：
> let arr2 = [... new Set(arr)]; //...为展开运算；Set为ES6新增数据结构，不能有相同元素；

转为数组：
> let arr = Array.from(set); 

## WeakSet
WeakSet 结构与 Set 类似，也是不重复的值的集合。WeakSet 对象允许你将弱引用对象储存在一个集合中。

**操作方法**
+ WeakSet.prototype.add(value)：向 WeakSet 实例添加新元素
+ WeakSet.prototype.delete(value)：删除指定的元素
+ WeakSet.prototype.has(value)：返回一个布尔值，表示 WeakSet 中是否存在此元素

**与 set 的区别**
+ WeakSet 的成员只能是对象，而不能是其他类型的值。
+ WeakSet 中的对象都是弱引用
+ WeakSet 没有 size 静态属性
+ WeakSet 没有 clear 方法
+ WeakSet 没有遍历方法，WebSet 不能遍历

**特征**
+ 成员的值都是唯一的，没有重复的值
+ 成员只能是对象，而不能是其他类型的值
+ WeakSet 中的对象都是弱引用，引用不计入垃圾回收机制
+ WeakSet 中的对象都是弱引用，所以不会引发内存泄漏
+ WeakSet 中的对象都是弱引用，所以 WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息
+ WeakSet 的成员是不适合引用的，因为它会随时消失
+ WeakSet 不可遍历。因为 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行。
+ WeakSet 没有 size 属性，因为 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，没有 size 也就没法遍历。
+ WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。


## Map
键值对集合（Hash结构）

Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。

**静态属性**
+ Map.prototype.size：返回 Map

**操作方法**
+ Map.prototype.set(key, value)：设置键名 key 和对应的键值 value，返回的是当前 Map 对象，可采用链式写法
+ Map.prototype.get(key)：获取 key 对应的键值，若没有，则返回 undefined
+ Map.prototype.has(key)：返回布尔值表示是否存在
+ Map.prototype.delete(key)：删除某个键，返回布尔值表示是否成功
+ Map.prototype.clear()：清除所有成员

**遍历方法**
+ Map.prototype.keys()：返回键名的遍历器。
+ Map.prototype.values()：返回键值的遍历器。
+ Map.prototype.entries()：返回所有成员的遍历器。
+ Map.prototype.forEach()：遍历 Map 的所有成员。
> Map 的遍历顺序就是插入顺序。

Map 转为数组
```js
const myMap = new Map()
.set(true, 7)
.set({foo: 3}, ['abc']);
[...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
```

数组 转为 Map
```js
new Map([
  [true, 7],
  [{foo: 3}, ['abc']]
])
// Map {
//   true => 7,
//   Object {foo: 3} => ['abc']
// }
```

Map 转为对象
```js
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }
```

对象转为 Map
```js
// 使用 Object.entries()
let obj = {"a":1, "b":2};
let map = new Map(Object.entries(obj));

// 自己实现
function objToStrMap(obj) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }
    return strMap;
}

objToStrMap({yes: true, no: false})
// Map {"yes" => true, "no" => false}
```

Map 转为 JSON
```js
// Map 的键名都是字符串，这时可以选择转为对象 JSON。
function strMapToJson(strMap) {
    return JSON.stringify(strMapToObj(strMap));
}

let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)
// '{"yes":true,"no":false}'
```
```js
// Map 的键名有非字符串，这时可以选择转为数组 JSON。
function mapToArrayJson(map) {
    return JSON.stringify([...map]);
}

let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap)
// '[[true,7],[{"foo":3},["abc"]]]'
```

JSON 转为 Map
```js
// 正常情况下，所有键名都是字符串。
function jsonToStrMap(jsonStr) {
    return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}
```
```js
// 整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为 Map。这往往是 Map 转为数组 JSON 的逆操作。
function jsonToMap(jsonStr) {
    return new Map(JSON.parse(jsonStr));
}

jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
// Map {true => 7, Object {foo: 3} => ['abc']}
```

## WeakMap

**特点**
+ 只接受对象（null除外）和 Symbol 值作为键名，不接受其他类型的值作为键名。
+ WeakMap 的键名所指向的对象，不计入垃圾回收机制。
+ WeakMap 没有 size 静态属性
+ WeakMap 没有 clear 方法
+ WeakMap 没有遍历方法，WeakMap 不能遍历
+ WeakMap 只有四个方法可用：get()、set()、has()、delete()。

### WeakMap 用途

DOM 节点作为键名。将 DOM 节点作为 WeakMap 的键名，一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险。
```js
let wm = new WeakMap(), element = document.querySelector(".element");
wm.set(element, "data");

let value = wm.get(elemet);
console.log(value); // data

element.parentNode.removeChild(element);
element = null;
```

数据缓存。当我们需要关联对象和数据，比如在不修改原有对象的情况下储存某些属性或者根据对象储存一些计算的值等，而又不想管理这些数据的死活时非常适合考虑使用 WeakMap。
```js
const cache = new WeakMap();
function countOwnKeys(obj) {
    if (cache.has(obj)) {
        console.log('Cached');
        return cache.get(obj);
    } else {
        console.log('Computed');
        const count = Object.keys(obj).length;
        cache.set(obj, count);
        return count;
    }
}
```

部署私有属性。例如，Countdown 类的两个内部属性 _counter 和 _action，是实例的弱引用，所以如果删除实例，它们也就随之消失，不会造成内存泄漏。
```js
const privateData = new WeakMap();

class Person {
    constructor(name, age) {
        privateData.set(this, { name: name, age: age });
    }
    
    getName() {
        return privateData.get(this).name;
    }

    getAge() {
        return privateData.get(this).age;
    }
}

export default Person;
```

## WeakRef
用于直接创建对象的弱引用。


