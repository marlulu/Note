```
# Dart/Flutter 集合类型：List、Map、Set 完全指南

## 一、概述

在 Dart（Flutter）中，`List`、`Map`、`Set` 是三种最核心的集合类型，分别对应有序列表、键值对映射和无序不重复集合。它们都位于 `dart:core` 库中，无需额外导入即可使用。

| 类型 | 中文名称 | 有序性 | 重复性 | 访问方式 | 典型用途 |
|------|----------|--------|--------|----------|----------|
| List | 列表 | ✅ 有序 | ✅ 允许重复 | 索引（index） | 有序数据、数组 |
| Map | 映射 | 插入有序（LinkedHashMap） | Key 唯一，Value 可重复 | Key | 键值对、字典 |
| Set | 集合 | 插入有序（LinkedHashSet） | ✅ 元素唯一 | 迭代 / 包含判断 | 去重、集合运算 |

---

## 二、List（列表）

### 2.1 声明与创建

```dart
// 1. 字面量声明（最常用）
List<int> numbers = [1, 2, 3];
var fruits = ['apple', 'banana', 'orange'];

// 2. 空列表
var emptyList = <String>[];
List<int> emptyList2 = [];

// 3. 固定长度列表
var fixedList = List<int>.filled(5, 0); // 长度为5，初始值为0

// 4. 生成式创建
var generated = List.generate(10, (index) => index * 2); // [0, 2, 4, ..., 18]

// 5. 不可变列表（编译时常量）
const immutableList = [1, 2, 3];
```

### 2.2 常用属性

```
List<String> list = ['a', 'b', 'c'];

list.length;      // 3，长度
list.isEmpty;     // false，是否为空
list.isNotEmpty;  // true，是否非空
list.first;       // 'a'，第一个元素
list.last;        // 'c'，最后一个元素
list.reversed;    // ('c', 'b', 'a')，倒序迭代器
```

### 2.3 常用方法

#### 增删改查

```
List<int> list = [1, 2, 3];

// 增加
list.add(4);           // [1, 2, 3, 4]，末尾添加
list.addAll([5, 6]);   // [1, 2, 3, 4, 5, 6]，批量添加
list.insert(0, 0);     // [0, 1, 2, 3, 4, 5, 6]，指定位置插入
list.insertAll(1, [7,8]); // 指定位置批量插入

// 删除
list.remove(0);        // 删除第一个匹配的元素 0
list.removeAt(0);      // 删除索引 0 处的元素
list.removeLast();     // 删除最后一个元素
list.removeRange(0, 2); // 删除索引 [0, 2) 区间元素
list.clear();          // 清空

// 修改
list[0] = 10;          // 通过索引直接赋值

// 查询
list[0];               // 通过索引访问
list.indexOf(2);       // 查找元素索引，找不到返回 -1
list.lastIndexOf(2);   // 从后往前找
list.contains(2);      // true，是否包含
```

#### 遍历方式

```
// 1. for 循环索引
for (int i = 0; i < list.length; i++) {
  print(list[i]);
}

// 2. for-in
for (var item in list) {
  print(item);
}

// 3. forEach
list.forEach((item) => print(item));

// 4. 迭代器
var iterator = list.iterator;
while (iterator.moveNext()) {
  print(iterator.current);
}
```

#### 函数式操作

```
List<int> nums = [1, 2, 3, 4, 5];

// map：转换每个元素
var doubled = nums.map((e) => e * 2).toList(); // [2, 4, 6, 8, 10]

// where：过滤
var even = nums.where((e) => e % 2 == 0).toList(); // [2, 4]

// every：全部满足
nums.every((e) => e > 0); // true

// any：任一满足
nums.any((e) => e > 4);   // true

// reduce / fold：归约
nums.reduce((a, b) => a + b);      // 15
nums.fold(0, (a, b) => a + b);     // 15，带初始值

// take / skip：截取
nums.take(3);   // (1, 2, 3)
nums.skip(2);   // (3, 4, 5)

// sort：排序
nums.sort((a, b) => b.compareTo(a)); // 降序
```

### 2.4 要点与注意事项

1. **索引越界**：访问索引必须在 `[0, length-1]` 范围内，否则抛出 `RangeError`。
2. **遍历中修改**：使用 `forEach` 或 `for-in` 遍历时，**禁止增删元素**，否则会抛出 `ConcurrentModificationError`。如需边遍历边删除，使用 `for` 循环倒序遍历。
3. **`const` 列表**：`const []` 创建的是编译时常量，完全不可修改；`final` 只是变量不可重新赋值，但列表内容可变。
4. **`map()` 返回的是 Iterable**：`map`、`where` 等操作返回的是惰性 `Iterable`，需要调用 `.toList()` 才会真正执行并转为列表。
5. **固定长度 vs 可增长**：`List.filled` 创建的列表默认固定长度，不能 `add/remove`；如需可增长，使用 `growable: true` 参数。
6. **空安全**：Dart 2.12+ 支持空安全，`List<int?>` 表示元素可空，`List<int>?` 表示列表本身可空。

---

## 三、Map（映射）

### 3.1 声明与创建

```
// 1. 字面量声明
Map<String, int> scores = {
  'Alice': 90,
  'Bob': 85,
};

var person = <String, dynamic>{
  'name': 'Tom',
  'age': 20,
};

// 2. 空 Map
var emptyMap = <String, int>{};
Map<String, int> emptyMap2 = {};

// 3. 构造函数
var map = Map<String, int>();
map['a'] = 1;

// 4. 不可变 Map
const constMap = {'key': 'value'};
```

### 3.2 常用属性

```
Map map = {'a': 1, 'b': 2};

map.length;       // 2，键值对数量
map.isEmpty;      // false
map.isNotEmpty;   // true
map.keys;         // ('a', 'b')，所有 key 的 Iterable
map.values;       // (1, 2)，所有 value 的 Iterable
map.entries;      // 所有 MapEntry 的 Iterable
```

### 3.3 常用方法

#### 增删改查

```
Map<String, int> map = {'a': 1, 'b': 2};

// 增加 / 修改
map['c'] = 3;              // 新增或覆盖
map.addAll({'d': 4, 'e':5}); // 批量合并
map.putIfAbsent('f', () => 6); // 不存在时才添加

// 删除
map.remove('a');           // 删除 key 为 'a' 的项
map.removeWhere((k, v) => v > 3); // 按条件删除
map.clear();               // 清空

// 查询
map['a'];                  // 取值，不存在返回 null
map.containsKey('a');      // true，是否包含 key
map.containsValue(1);      // true，是否包含 value
```

#### 遍历方式

```
// 1. 遍历 key
for (var key in map.keys) {
  print('$key: ${map[key]}');
}

// 2. 遍历 entries（推荐）
for (var entry in map.entries) {
  print('${entry.key}: ${entry.value}');
}

// 3. forEach
map.forEach((key, value) {
  print('$key: $value');
});
```

#### 转换与过滤

```
// map：转换键值对
var newMap = map.map((k, v) => MapEntry(k.toUpperCase(), v * 2));

// where 过滤
var filtered = Map.fromEntries(
  map.entries.where((e) => e.value > 2)
);
```

### 3.4 要点与注意事项

1. **Key 唯一性**：同一个 key 重复赋值会覆盖旧值。
2. **取值可能为 null**：`map[key]` 在 key 不存在时返回 `null`，无法区分「值为 null」和「key 不存在」，需用 `containsKey` 确认。
3. **遍历顺序**：Dart 中默认的 `Map` 是 `LinkedHashMap`，**按插入顺序遍历**，并非完全无序。
4. **Key 类型**：Key 必须实现 `==` 和 `hashCode`。自定义类作为 Key 时需重写这两个方法，否则无法正确查找。
5. **`const` Map**：`const {}` 创建的 Map 完全不可修改。
6. **空安全**：`map['key']` 返回可空类型，使用前需判空或使用 `??` 提供默认值：`map['key'] ?? 0`。

---

## 四、Set（集合）

### 4.1 声明与创建

```
// 1. 字面量声明
Set<int> numbers = {1, 2, 3};
var fruits = {'apple', 'banana'};

// 2. 空 Set
var emptySet = <String>{};
Set<int> emptySet2 = {};

// 3. 从 List 创建（自动去重）
var setFromList = Set.from([1, 2, 2, 3]); // {1, 2, 3}

// 4. 不可变 Set
const constSet = {1, 2, 3};
```

### 4.2 常用属性

```
Set set = {1, 2, 3};

set.length;      // 3
set.isEmpty;
set.isNotEmpty;
set.first;
set.last;
```

### 4.3 常用方法

#### 增删查

```
Set<int> set = {1, 2, 3};

// 增加
set.add(4);        // 添加单个元素
set.addAll({5, 6});// 批量添加

// 删除
set.remove(1);     // 删除元素
set.removeWhere((e) => e > 4); // 按条件删除
set.clear();       // 清空

// 查询
set.contains(2);   // true
set.containsAll({1, 2}); // 是否包含全部
```

#### 集合运算

```
Set a = {1, 2, 3};
Set b = {2, 3, 4};

a.union(b);         // {1, 2, 3, 4}，并集
a.intersection(b);  // {2, 3}，交集
a.difference(b);    // {1}，差集（a 有 b 没有）
```

#### 遍历

```
// for-in
for (var item in set) {
  print(item);
}

// forEach
set.forEach((item) => print(item));
```

### 4.4 要点与注意事项

1. **元素唯一性**：重复元素会被自动忽略，常用于列表去重：`List unique = list.toSet().toList();`
2. **无序性**：默认 `Set` 是 `LinkedHashSet`，按插入顺序遍历；如需排序使用 `SplayTreeSet`。
3. **元素相等性**：与 Map 的 Key 一样，自定义类放入 Set 必须重写 `==` 和 `hashCode`。
4. **无法通过索引访问**：Set 无序，不能用 `set[0]` 访问，只能遍历或用 `first/last`。
5. **空 Set 语法陷阱**：`{}` 默认是 `Map` 而非 `Set`，必须指定类型：`<String>{}` 才是空 Set。

---

## 五、三种集合对比与选型

| 特性 | List | Map | Set |
| --- | --- | --- | --- |
| 顺序 | 有序 | 插入有序 | 插入有序（默认） |
| 重复 | 允许 | Key 唯一，Value 可重复 | 不允许 |
| 访问方式 | 索引 | Key | 包含判断 |
| 查找效率 | O(n) | O(1) 平均 | O(1) 平均 |
| 增删末尾 | O(1) | O(1) 平均 | O(1) 平均 |
| 适用场景 | 有序列表、数组 | 键值映射、字典 | 去重、集合运算 |

### 选型建议

- 需要按索引访问 → **List**
- 需要通过键快速查找值 → **Map**
- 需要保证元素不重复 → **Set**
- 需要去重的 List → 先转 Set 再转回 List

---

## 六、通用注意事项

### 6.1 可变性与不可变性

```
// 可变集合（默认）
var list = [1, 2, 3];
list.add(4); // ✅ 允许

// final：变量不可重新赋值，但内容可变
final List<int> list = [1, 2];
list.add(3); // ✅ 允许
list = [4];  // ❌ 报错

// const：编译时常量，完全不可变
const list = [1, 2];
list.add(3); // ❌ 报错
```

### 6.2 类型安全与泛型

- 始终使用泛型指定集合内元素类型：`List<int>` 而非 `List`
- `dynamic` 类型会失去静态类型检查，尽量避免
- 集合的 `runtimeType` 会携带泛型信息，但运行时类型判断需谨慎

### 6.3 惰性 Iterable

`map()`、`where()`、`take()`、`skip()` 等方法返回的是**惰性 Iterable**，不会立即执行，直到调用 `toList()`、`toSet()` 或开始遍历时才真正计算。

```
var result = list.map((e) {
  print('processing $e');
  return e * 2;
});
// 此时没有任何输出，因为还未执行

print(result.first); // 此时才开始执行并输出
```

### 6.4 并发修改异常

在 `forEach`、`for-in` 遍历过程中修改集合（增删元素）会抛出 `ConcurrentModificationError`。

**正确做法**：

```
// 倒序 for 循环删除
for (int i = list.length - 1; i >= 0; i--) {
  if (list[i] % 2 == 0) {
    list.removeAt(i);
  }
}

// 或使用 removeWhere
list.removeWhere((e) => e % 2 == 0);
```

### 6.5 深拷贝与浅拷贝

```
List list1 = [1, 2, 3];
List list2 = list1;        // 浅拷贝，引用同一对象
list2.add(4);              // list1 也会改变

List list3 = List.from(list1); // 深拷贝（元素层面）
List list4 = [...list1];       // 展开运算符，推荐写法
```

>
> 注意：如果集合内是对象，`List.from` 和展开运算符仍是**浅拷贝**，只复制引用，不复制对象本身。

### 6.6 集合字面量中的 if 和 for

Dart 2.3+ 支持集合字面量内使用 `if` 和 `for`：

```
// 集合 if
var list = [
  1,
  2,
  if (condition) 3,
];

// 集合 for
var list = [
  for (var i in [1, 2, 3]) i * 2,
];

// Map 同样支持
var map = {
  for (var item in list) item.key: item.value,
};
```

---

## 七、速查表

### List 常用 API

| 操作 | 方法 |
| --- | --- |
| 末尾添加 | `add()` / `addAll()` |
| 指定位置插入 | `insert()` / `insertAll()` |
| 删除 | `remove()` / `removeAt()` / `removeLast()` |
| 区间删除 | `removeRange()` |
| 按条件删除 | `removeWhere()` |
| 查找索引 | `indexOf()` / `lastIndexOf()` |
| 转换 | `map()` |
| 过滤 | `where()` |
| 归约 | `reduce()` / `fold()` |
| 排序 | `sort()` |

### Map 常用 API

| 操作 | 方法 |
| --- | --- |
| 添加/修改 | `[]=` / `putIfAbsent()` |
| 批量合并 | `addAll()` |
| 删除 | `remove()` / `removeWhere()` |
| 查 key | `containsKey()` |
| 查 value | `containsValue()` |
| 所有键 | `keys` |
| 所有值 | `values` |
| 所有条目 | `entries` |

### Set 常用 API

| 操作 | 方法 |
| --- | --- |
| 添加 | `add()` / `addAll()` |
| 删除 | `remove()` / `removeWhere()` |
| 包含 | `contains()` / `containsAll()` |
| 并集 | `union()` |
| 交集 | `intersection()` |
| 差集 | `difference()` |
| ``` |  |