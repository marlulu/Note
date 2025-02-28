# Proxy

-----
Proxy 用于修改某些操作的默认行为

生成 Proxy 实例：`let proxy = new Proxy(target, handler);`

new Proxy() 表示生成一个 Proxy 实例，target 参数表示所要拦截的目标对象(包括函数)，handler 参数也是一个对象，用来定制拦截行为。

**Proxy 的实例方法**
+ get(target, propKey, receiver)：拦截对象属性的读取，若一个属性不可配置且不可写，则 Proxy 不能修改该属性，访问会报错。
+ set(target（目标对象）, propKey（属性名）, value（属性值）, receiver（Proxy 实例本身）)：拦截对象属性的设置，返回一个布尔值，若目标对象自身某个属性不可写，则不起作用。
+ has(target, propKey)：拦截 propKey in proxy 操作，返回一个布尔值。对 `for...in` 循环不生效
+ deleteProperty(target, propKey)：拦截 delete proxy[propKey] 操作，返回一个布尔值。目标自身有不可配置属性，不能被删除，会报错
+ ownKeys(target)：拦截 `Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`、`for ··· in 循环`，返回一个数组，该方法返回目标对象所有自身的属性的属性名，而 `Object.keys()` 的返回结果仅包括目标对象自身的可遍历属性。
+ getOwnPropertyDescriptor(target, propKey)：拦截 `Obejct.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象。
+ defineProperty(target, propKey, propDesc)：拦截 `Object.defineProperty(proxy, propKey, propDesc)`、`Object.defineProperties(proxy, propDescs)`，返回一个布尔值。
+ preventExtensions(target)：拦截 `Object.preventExtensions(proxy)`，返回一个布尔值。
+ getPrototypeOf(target)：拦截 `Object.getPrototypeOf(proxy)`，返回一个对象。拦截获取对象原型
+ isExtensible(target)：拦截 `Object.isExtensible(proxy)`，返回一个布尔值。
+ setPrototypeOf(target, proto)：拦截 `Object.setPrototypeOf(proxy, proto)`，返回一个布尔值
+ apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如 `proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`。
+ construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如 `new proxy(...args)`，this 指向的是 handler，不是实例对象。

**Proxy.revocable()**
返回一个可取消的 Proxy 实例。
```js
let target = {};
let handler = {};

let {proxy, revoke} = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo // 123

revoke();
proxy.foo // TypeError: Revoked
```
使用场景：目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。

**this问题**
+ 目标对象内部的this关键字会指向 Proxy 代理。
+ Proxy 拦截函数内部的this，指向的是handler对象。

## defineProperty 与 proxy
`Object.defineProperty`：可以在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象。
```js
Object.defineProperty(obj, prop, descriptor)

obj: 要在其上定义属性的对象。
prop:  要定义或修改的属性的名称。
descriptor: 将被定义或修改的属性的描述符。

// 例如
var obj = {};
Object.defineProperty(obj, "num", {
    value : 1,
    writable : true,
    enumerable : true,
    configurable : true
});
//  对象 obj 拥有属性 num，值为 1
```

**局限性**
+ 内建对象具有“内部插槽”，对这些对象的访问无法被代理。
  ```js
  user = new Proxy(user, {
    get(target, prop, receiver) {
        let value = Reflect.get(...arguments);
        return typeof value === 'function' ? value.bind(target) : value
    }
  })
  ```
+ 私有类字段也是如此，因为它们也是在内部使用插槽实现的。因此，代理方法的调用必须具有目标对象作为 this 才能访问它们。
+ 对象的严格相等性检查 === 无法被拦截。
+ 性能：基准测试（benchmark）取决于引擎，但通常使用最简单的代理访问属性所需的时间也要长几倍。实际上，这仅对某些“瓶颈”对象来说才重要。
