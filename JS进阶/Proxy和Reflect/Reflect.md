# Reflect

-----

Reflect 不是一个函数对象，因此它是不可构造的。

**必要性**
+ 默认行为的一致性：Reflect 对象提供了与大多数 Proxy traps 对应的方法，使得在进行对象操作时，可以保持一致的编程模式，且代码的可读性和可维护性更强。
+ 更好的错误处理：Reflect 方法返回一个布尔值，可以清晰地指示操作是否成功，这使得错误处理更加直观。
+ 函数式编程风格：Reflect 方法接受目标对象作为第一个参数，这允许你以函数式编程风格处理对象操作。
+ 接收者（receiver）参数：Reflect 方法通常接受一个接收者参数，这允许你在调用方法时明确指定 this 的值，这在实现基于原型的继承和自定义 this 绑定时非常有用。

**数据绑定和观察者模式**
```js
const handler = {
  set(target, prop, value) {
    console.log(`属性 ${prop} 被设置为 ${value}`);
    return Reflect.set(target, prop, value);
  }
};

const data = new Proxy({}, handler);

data.name = '小明';
```

**扩展对象功能**
```js
const original = {
  greet() {
    console.log('Hello!');
  }
};

const handler = {
  apply(target, thisArg, argumentsList) {
    console.log(`调用了方法：${target.name}`);
    return Reflect.apply(target, thisArg, argumentsList);
  }
};

const proxy = new Proxy(original.greet, handler);

proxy(); // 输出：调用了方法：greet，Hello!
```

