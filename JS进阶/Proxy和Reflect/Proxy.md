# Proxy

-----
Proxy �����޸�ĳЩ������Ĭ����Ϊ

���� Proxy ʵ����`let proxy = new Proxy(target, handler);`

new Proxy() ��ʾ����һ�� Proxy ʵ����target ������ʾ��Ҫ���ص�Ŀ�����(��������)��handler ����Ҳ��һ��������������������Ϊ��

**Proxy ��ʵ������**
+ get(target, propKey, receiver)�����ض������ԵĶ�ȡ����һ�����Բ��������Ҳ���д���� Proxy �����޸ĸ����ԣ����ʻᱨ��
+ set(target��Ŀ�����, propKey����������, value������ֵ��, receiver��Proxy ʵ������)�����ض������Ե����ã�����һ������ֵ����Ŀ���������ĳ�����Բ���д���������á�
+ has(target, propKey)������ propKey in proxy ����������һ������ֵ���� `for...in` ѭ������Ч
+ deleteProperty(target, propKey)������ delete proxy[propKey] ����������һ������ֵ��Ŀ�������в����������ԣ����ܱ�ɾ�����ᱨ��
+ ownKeys(target)������ `Object.getOwnPropertyNames(proxy)`��`Object.getOwnPropertySymbols(proxy)`��`Object.keys(proxy)`��`for ������ in ѭ��`������һ�����飬�÷�������Ŀ�����������������Ե����������� `Object.keys()` �ķ��ؽ��������Ŀ���������Ŀɱ������ԡ�
+ getOwnPropertyDescriptor(target, propKey)������ `Obejct.getOwnPropertyDescriptor(proxy, propKey)`���������Ե���������
+ defineProperty(target, propKey, propDesc)������ `Object.defineProperty(proxy, propKey, propDesc)`��`Object.defineProperties(proxy, propDescs)`������һ������ֵ��
+ preventExtensions(target)������ `Object.preventExtensions(proxy)`������һ������ֵ��
+ getPrototypeOf(target)������ `Object.getPrototypeOf(proxy)`������һ���������ػ�ȡ����ԭ��
+ isExtensible(target)������ `Object.isExtensible(proxy)`������һ������ֵ��
+ setPrototypeOf(target, proto)������ `Object.setPrototypeOf(proxy, proto)`������һ������ֵ
+ apply(target, object, args)������ Proxy ʵ����Ϊ�������õĲ��������� `proxy(...args)`��`proxy.call(object, ...args)`��`proxy.apply(...)`��
+ construct(target, args)������ Proxy ʵ����Ϊ���캯�����õĲ��������� `new proxy(...args)`��this ָ����� handler������ʵ������

**Proxy.revocable()**
����һ����ȡ���� Proxy ʵ����
```js
let target = {};
let handler = {};

let {proxy, revoke} = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo // 123

revoke();
proxy.foo // TypeError: Revoked
```
ʹ�ó�����Ŀ���������ֱ�ӷ��ʣ�����ͨ��������ʣ�һ�����ʽ��������ջش���Ȩ���������ٴη��ʡ�

**this����**
+ Ŀ������ڲ���this�ؼ��ֻ�ָ�� Proxy ����
+ Proxy ���غ����ڲ���this��ָ�����handler����

## defineProperty �� proxy
`Object.defineProperty`��������һ�������϶���һ�������ԣ������޸�һ��������������ԣ��������������
```js
Object.defineProperty(obj, prop, descriptor)

obj: Ҫ�����϶������ԵĶ���
prop:  Ҫ������޸ĵ����Ե����ơ�
descriptor: ����������޸ĵ����Ե���������

// ����
var obj = {};
Object.defineProperty(obj, "num", {
    value : 1,
    writable : true,
    enumerable : true,
    configurable : true
});
//  ���� obj ӵ������ num��ֵΪ 1
```

**������**
+ �ڽ�������С��ڲ���ۡ�������Щ����ķ����޷�������
  ```js
  user = new Proxy(user, {
    get(target, prop, receiver) {
        let value = Reflect.get(...arguments);
        return typeof value === 'function' ? value.bind(target) : value
    }
  })
  ```
+ ˽�����ֶ�Ҳ����ˣ���Ϊ����Ҳ�����ڲ�ʹ�ò��ʵ�ֵġ���ˣ��������ĵ��ñ������Ŀ�������Ϊ this ���ܷ������ǡ�
+ ������ϸ�����Լ�� === �޷������ء�
+ ���ܣ���׼���ԣ�benchmark��ȡ�������棬��ͨ��ʹ����򵥵Ĵ���������������ʱ��ҲҪ��������ʵ���ϣ������ĳЩ��ƿ����������˵����Ҫ��
