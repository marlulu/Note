# Set and Map

--------

Set ��һ�ֽ��� ���� �����ݽṹ��Map ��һ�ֽ��� �ֵ� �����ݽṹ

## Set
�������飬����ṹ����ԱΨһ�������ظ���

�����������ݣ��й��캯����`let set = new set([]);`

**��������**
+ Set.prototype.add(value)�����Ԫ�أ������� set ��β������Ԫ�ش�������ԣ�����ֵΪ set ����
+ Set.prototype.delete()��ɾ�������ز���ֵ����ʾ�Ƿ�ɾ���ɹ�
+ Set.prototype.has(value)�����ز���ֵ����ʾ��ֵ�Ƿ�Ϊ Set ��Ա
+ Set.prototype.clear()��������г�Ա��
+ Set.prototype.size()������ Set ��Ԫ�ص�����

**��������**
+ Set.prototype.keys()�����ؼ����ı�����
+ Set.prototype.values()�����ؼ�ֵ�ı�����
+ Set.prototype.entries()�����ؼ�ֵ�Եı�����
+ Set.prototype.forEach()��ʹ�ûص���������ÿ����Ա

**�������㷽��**
+ Set.prototype.intersection(other)������
+ Set.prototype.union(other)������
+ Set.prototype.difference(other)���
+ Set.prototype.symmetricDifference(other)���ԳƲ
+ Set.prototype.isSubsetOf(other)���ж��Ƿ�Ϊ�Ӽ�
+ Set.prototype.isSupersetOf(other)���ж��Ƿ�Ϊ����
+ Set.prototype.isDisjointFrom(other)���ж��Ƿ��ཻ
>���Ϸ����Ĳ����������� Set �ṹ��������һ�������� Set �Ľṹ��ӵ��size���ԣ��Լ�keys()��has()������


�����ȥ�أ�
> let arr2 = [... new Set(arr)]; //...Ϊչ�����㣻SetΪES6�������ݽṹ����������ͬԪ�أ�

תΪ���飺
> let arr = Array.from(set); 

## WeakSet
WeakSet �ṹ�� Set ���ƣ�Ҳ�ǲ��ظ���ֵ�ļ��ϡ�WeakSet ���������㽫�����ö��󴢴���һ�������С�

**��������**
+ WeakSet.prototype.add(value)���� WeakSet ʵ�������Ԫ��
+ WeakSet.prototype.delete(value)��ɾ��ָ����Ԫ��
+ WeakSet.prototype.has(value)������һ������ֵ����ʾ WeakSet ���Ƿ���ڴ�Ԫ��

**�� set ������**
+ WeakSet �ĳ�Աֻ���Ƕ��󣬶��������������͵�ֵ��
+ WeakSet �еĶ�����������
+ WeakSet û�� size ��̬����
+ WeakSet û�� clear ����
+ WeakSet û�б���������WebSet ���ܱ���

**����**
+ ��Ա��ֵ����Ψһ�ģ�û���ظ���ֵ
+ ��Աֻ���Ƕ��󣬶��������������͵�ֵ
+ WeakSet �еĶ����������ã����ò������������ջ���
+ WeakSet �еĶ����������ã����Բ��������ڴ�й©
+ WeakSet �еĶ����������ã����� WeakSet �ʺ���ʱ���һ������Լ���Ÿ�����󶨵���Ϣ
+ WeakSet �ĳ�Ա�ǲ��ʺ����õģ���Ϊ������ʱ��ʧ
+ WeakSet ���ɱ�������Ϊ WeakSet �ڲ��ж��ٸ���Ա��ȡ�����������ջ�����û�����С�
+ WeakSet û�� size ���ԣ���Ϊ WeakSet �ڲ��ж��ٸ���Ա��ȡ�����������ջ�����û�����У�û�� size Ҳ��û��������
+ WeakSet ��һ���ô����Ǵ��� DOM �ڵ㣬�����õ�����Щ�ڵ���ĵ��Ƴ�ʱ���������ڴ�й©��


## Map
��ֵ�Լ��ϣ�Hash�ṹ��

Map �ļ�ʵ�����Ǹ��ڴ��ַ�󶨵ģ�ֻҪ�ڴ��ַ��һ��������Ϊ��������

**��̬����**
+ Map.prototype.size������ Map

**��������**
+ Map.prototype.set(key, value)�����ü��� key �Ͷ�Ӧ�ļ�ֵ value�����ص��ǵ�ǰ Map ���󣬿ɲ�����ʽд��
+ Map.prototype.get(key)����ȡ key ��Ӧ�ļ�ֵ����û�У��򷵻� undefined
+ Map.prototype.has(key)�����ز���ֵ��ʾ�Ƿ����
+ Map.prototype.delete(key)��ɾ��ĳ���������ز���ֵ��ʾ�Ƿ�ɹ�
+ Map.prototype.clear()��������г�Ա

**��������**
+ Map.prototype.keys()�����ؼ����ı�������
+ Map.prototype.values()�����ؼ�ֵ�ı�������
+ Map.prototype.entries()���������г�Ա�ı�������
+ Map.prototype.forEach()������ Map �����г�Ա��
> Map �ı���˳����ǲ���˳��

Map תΪ����
```js
const myMap = new Map()
.set(true, 7)
.set({foo: 3}, ['abc']);
[...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
```

���� תΪ Map
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

Map תΪ����
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

����תΪ Map
```js
// ʹ�� Object.entries()
let obj = {"a":1, "b":2};
let map = new Map(Object.entries(obj));

// �Լ�ʵ��
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

Map תΪ JSON
```js
// Map �ļ��������ַ�������ʱ����ѡ��תΪ���� JSON��
function strMapToJson(strMap) {
    return JSON.stringify(strMapToObj(strMap));
}

let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)
// '{"yes":true,"no":false}'
```
```js
// Map �ļ����з��ַ�������ʱ����ѡ��תΪ���� JSON��
function mapToArrayJson(map) {
    return JSON.stringify([...map]);
}

let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap)
// '[[true,7],[{"foo":3},["abc"]]]'
```

JSON תΪ Map
```js
// ��������£����м��������ַ�����
function jsonToStrMap(jsonStr) {
    return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}
```
```js
// ���� JSON ����һ�����飬��ÿ�������Ա��������һ����������Ա�����顣��ʱ��������һһ��Ӧ��תΪ Map���������� Map תΪ���� JSON ���������
function jsonToMap(jsonStr) {
    return new Map(JSON.parse(jsonStr));
}

jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
// Map {true => 7, Object {foo: 3} => ['abc']}
```

## WeakMap

**�ص�**
+ ֻ���ܶ���null���⣩�� Symbol ֵ��Ϊ�������������������͵�ֵ��Ϊ������
+ WeakMap �ļ�����ָ��Ķ��󣬲������������ջ��ơ�
+ WeakMap û�� size ��̬����
+ WeakMap û�� clear ����
+ WeakMap û�б���������WeakMap ���ܱ���
+ WeakMap ֻ���ĸ��������ã�get()��set()��has()��delete()��

### WeakMap ��;

DOM �ڵ���Ϊ�������� DOM �ڵ���Ϊ WeakMap �ļ�����һ����� DOM �ڵ�ɾ������״̬�ͻ��Զ���ʧ���������ڴ�й©���ա�
```js
let wm = new WeakMap(), element = document.querySelector(".element");
wm.set(element, "data");

let value = wm.get(elemet);
console.log(value); // data

element.parentNode.removeChild(element);
element = null;
```

���ݻ��档��������Ҫ������������ݣ������ڲ��޸�ԭ�ж��������´���ĳЩ���Ի��߸��ݶ��󴢴�һЩ�����ֵ�ȣ����ֲ��������Щ���ݵ�����ʱ�ǳ��ʺϿ���ʹ�� WeakMap��
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

����˽�����ԡ����磬Countdown ��������ڲ����� _counter �� _action����ʵ���������ã��������ɾ��ʵ��������Ҳ����֮��ʧ����������ڴ�й©��
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
����ֱ�Ӵ�������������á�


