# Promise

------

## Promise的含义

简单来说是一个容器，用于保存某个未来才会结束的事件的结果，通常是一个异步操作。

promise对象的两个特点
+ 对象不受外界的影响。promise对象有三种状态：**pending**（进行中），**fulfilled**（已成功），**rejected**（已失败）。
+ 一旦状态改变，就不会在改变，任何时候都能获取这个结果。状态变为fulfilled或rejected，状态就凝固了，这时就称为resolved（已定型）

缺点：
1. 无法取消 Promise，一旦新建它就会立刻执行，无法中途取消。
2. Promise 内部的错误不会影响到 Promise 外部的代码。故需要设置回调函数才能知道错误。
3. 无法得知 pending 状态。不知道是刚刚开始还是即将结束。

> PS：如果某些事件不断地反复发生，一般来说，使用 Stream (opens new window)模式是比部署 Promise 更好的选择。

Promise 核心观点是 **异步链式调用**

基本用法
```js
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```
**resolve** 函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 fulfilled(resolved)），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；

**reject** 函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

**promise.then()**
> 它的作用是为 Promise 实例添加状态改变时的回调函数；如果该对象状态变为resolved(resolved统一只指fulfilled状态)，则会调用then()方法指定的回调函数。

**promise.catch()**
> Promise.prototype.catch()方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数；
如果异步操作抛出错误，状态就会变为rejected，就会调用catch()方法指定的回调函数，处理这个错误。

**promise.finally()**
> finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的；使用场景：不管成功或者失败，都需要执行的代码（loading关闭）

**总览**
```text
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

## Promise静态方法

+ Promise.all(iterator)：将多个Promise实例，包装成一个新的 Promise 实例，所有成功了才成功，失败了返回第一个失败的。若自身定义了catch方法，则不会调用Promise.all中的catch方法，会调用then方法进行回调。
+ Promise.race(iterator)：有一个实例先改变状态，那个率先改变状态的 Promise 实例的返回值就会传递给回调函数。
+ Promise.allSettled(iterable)：当所有Promise实例的状态都改变了，才会结束，状态只可能变成fulfilled。
+ Promise.any(iterable)：有一个成功就返回第一个成功的，只有所有失败才会返回失败。
+ Promise.resolve(value)：将现有的对象转化成 Promise 对象。
    >4种情况
    > + 参数是一个 Promise 实例：不变。
    > + 参数是一个thenable对象：将thenable对象转化为 Promise 对象，然后立即执行 thenable 对象的then()方法。
    > + 参数不是具有then()方法的对象，或根本就不是对象：返回一个新的 Promise 对象，状态为 resolved。
    > + 不带有任何参数：直接返回一个状态为 resolved 对象。
    >> 需要注意的是，立即resolve()的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。
```js
// 例子
setTimeout(function () {
    console.log('three');
    }, 0);
    
Promise.resolve().then(function () {
console.log('two');
});

console.log('one');

// one
// two
// three
```
上面代码中，setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.resolve()在本轮“事件循环”结束时执行，console.log('one')则是立即执行，因此最先输出。

+ Promise.reject(reason)：返回一个新的 Promise 实例，该实例的状态为rejected。
+ Promise.try()：让同步函数同步执行，异步函数异步执行。Promise.try就是模拟try代码块。
```text
Promise.try(() => database.users.get({id: userId}))
  .then(...)
  .catch(...)
```

## Promise/A+ 规范
<img src="D:/文件-前端/Note/JS进阶/异步方案/图片/img2.png">