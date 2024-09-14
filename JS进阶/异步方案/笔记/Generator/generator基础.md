# Generator

----

**概念：**
ES6新增遍历器对象；异步编程解决方案，让异步代码同步执行。语法上，可以理解为是一个状态机，封装了多个内部状态。同时也是个遍历器生成函数，返回遍历对象，遍历Generator中每一个状态。

特征：
+ function关键字与函数名之间有一个星号(*)
+ 函数体内部使用yield表达式，定义不同的内部状态。

调用Generator函数后，函数并不执行，返回的不是函数运行结果，而是一个指向内部状态的指针对象，也就是遍历对象。

Generator 函数是分段执行的，yield 表达式是暂停执行的标记，next 方法可以恢复执行。

## yield 表达式
+ 只能用在 Generator 函数里面，用在其他地方会报错
+ yield表达式如果用在另一个表达式之中，必须放在圆括号里面。
+ 函数每次与到yield会暂停执行，下次又从该位置继续向后执行，而 return 不具备记忆功能，一个函数里面只能执行一次return。
## next
参数表示上一个 yield 表达式的返回值，yield 本身是没有返回值，总是undefined。

故从语义上讲，第一个 next 方法用来启动遍历器对象，不用带参数。

**运行逻辑**
+ 遇到 yield 表达式，就暂停后执行后面的操作，并将 yield 后面的值座位返回对象value的参数。
+ 下一次调用 next 时，继续往下执行，直到遇到下一个 yield。
+ 若没有遇到新的 yield，就会一直运行到函数结束，直到遇到 return，将 return 后面的值座位返回对象value的值。
+ 若没有 return，将返回对象 value 的值为 undefined。

## 与 Iterator的关系
任意对象的 Symbol.iterator 方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历对象。

Generator就是一个遍历器生成函数，给 Symbol.iterator 属性赋值，使对象具有 iterator 接口

## Generator 原型上的方法
### Generator.prototype.throw()
在函数体外抛出错误，然后在 Generator 函数体内捕获。

throw方法被内部捕获以后，会附带执行到下一条yield表达式，这种情况下等同于执行一次next方法。
### Generator.prototype.return()
Generator 函数返回的遍历器对象，还有一个return()方法，可以返回给定的值，并且终结遍历 Generator 函数。


## next()、throw()、return() 的共同点
都是让 Generator 函数恢复执行，并且使用不同的语句替换 yield 表达式。
+ next() 是将 yield 表达式替换成一个值。如果 next 方法没有参数，就相当于替换成 undefined。
+ throw() 是将 yield 表达式替换成一个 throw 语句。
+ return() 是将 yield 表达式替换成一个 return 语句。


## yield*
用来在一个 Generator 函数里面执行另一个 Generator 函数。

## 手撕 Generator
```js
function webCanteenGenerator(list) {
    let index = 0;
    let length = list.length;
    return {
        next: function() {
            let done = index >= length;
            let value = !done ? list[index++] : undefined;
            return {
                done: done,
                value: value
            }
        }
    }
}
```

## Generator 的自动执行
Generator 函数的自动执行需要一种机制，即当异步操作有了结果，能够自动交回执行权，Generator 才可以自动执行。
```js
const fetch = require('node-fetch')

function* gen() {
    let r1 = yield fetch("https://api.github.com/users/github");
    let r2 = yield fetch("https://api.github.com/users/github/followers");
    let r3 = yield fetch("https://api.github.com/users/github/repos");
}

function run(gen) {
    let g = gen();
    
    function next(data) {
        let result = g.next(data);
        if (result.done) return;
        
        // 执行 g.next()，yield 返回的是一个 Promise 对象
        // 给这个 Promise 对象添加then 方法，当异步操作成功时执行 then 中的 onFullfilled 函数，
        // onFullfilled 函数中又去执行 g.next，从而让 Generator 继续执行，然后再返回一个 Promise，
        // 再在成功时执行 g.next，然后再返回……
        
        result.value.then(function(data) {
            return data.json();
        }).then(function(data) {
            next(data)
        });
    }
    next();
}

// 执行多个异步任务
run(gen)
```

## Thunk函数
将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数。
柯里化

## co模块
用于 Generator 函数的自动执行。

**原理**：
两种方法可以做到这一点。
1. 回调函数。将异步操作包装成 Thunk 函数，在回调函数里面交回执行权。
2. Promise 对象。将异步操作包装成 Promise 对象，用then方法交回执行权。

co 模块其实就是将两种自动执行器（Thunk 函数和 Promise 对象），包装成一个模块。使用 co 的前提条件是，Generator 函数的yield命令后面，只能是 Thunk 函数或 Promise 对象。