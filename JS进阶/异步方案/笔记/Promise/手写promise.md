## Promise全家桶
```js
// 定义Promise的 3 种状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

// Promise 构造函数
function Promise(execute) {
  var that = this;
  that.state = PENDING; // 状态初始化

  that.value = undefined; // 成功结果 放在this上便于then访问
  that.reason = undefined; // 失败结果 放在this上便于catch访问

  that.onFulfilledFn = []; // 已兑现回调队列
  that.onRejectedFn = []; // 已拒绝回调队列

  // 这里用 setTimeout 是为了模仿异步微任务，真正的微任务只有通过浏览器底层才可以调用
  function resolve(value) {
    setTimeout(function() {
      if (that.state === PENDING) {
        that.state = FULFILLED;
        // 为了后面在 then 的回调中可以得到 resolve 传递的参数,将其保存在构造函数里。
        that.value = value;
        // 此时 onFulfilledFn 还是空的又怎么执行里面的回调呢？
        // 大家注意看这里我们采用的 setTimeout 异步任务，
        // 虽然没有延时时间但在执行时其还是会被放在宏任务队列里，等待同步任务执行完再执行
        that.onFulfilledFn.forEach(function(f) {
          f(that.value);
        });
      }
    });
  }

  function reject(reason) {
    setTimeout(function() {
      if (that.state === PENDING) {
        that.state = REJECTED;
        that.reason = reason;
        that.onRejectedFn.forEach(function(f) {
          f(that.reason);
        });
      }
    });
  }

  try {
    // 把内部的 resolve 和 reject 传入 executor，用户可调用 resolve 和 reject
    execute(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

// 原型属性(方法) then
Promise.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled =
    typeof onFulfilled === "function"
      ? onFulfilled
      : function(x) {
          return x;
        };
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : function(e) {
          throw e;
        };
  var that = this;
  var promise;
  if (that.state === FULFILLED) {
    promise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        // onFulfilled有可能执行失败
        try {
          // 判断x返回的是不是一个promise
          var x = onFulfilled(that.value);
          resolvePromise(promise, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      });
    });
  }
  if (that.state === REJECTED) {
    promise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        try {
          var x = onRejected(that.reason);
          resolvePromise(promise, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      });
    });
  }
  if (that.state === PENDING) {
    promise = new Promise(function(resolve, reject) {
      that.onFulfilledFn.push(function() {
        try {
          var x = onFulfilled(that.value);
          resolvePromise(promise, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      });
      that.onRejectedFn.push(function() {
        try {
          var x = onRejected(that.reason);
          resolvePromise(promise, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      });
    });
  }
  return promise;
};

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    return reject(new TypeError("x 不能与 promise 相等"));
  }
  if (x instanceof Promise) {
    if (x.state === FULFILLED) {
      resolve(x.value);
    } else if (x.state === REJECTED) {
      reject(x.reason);
    } else {
      x.then(function(y) {
        resolvePromise(promise, y, resolve, reject);
      }, reject);
    }
  } else if (x !== null && (typeof x === "object" || typeof x === "function")) {
    var executed;
    try {
      var then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          function(y) {
            if (executed) return;
            executed = true;
            resolvePromise(promise, y, resolve, reject);
          },
          function(e) {
            if (executed) return;
            executed = true;
            reject(e);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (executed) return;
      executed = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

module.exports = {
  deferred() {
    var resolve;
    var reject;
    var promise = new Promise(function(res, rej) {
      resolve = res;
      reject = rej;
    });
    return {
      promise,
      resolve,
      reject
    };
  }
};

// 静态方法 resolve
Promise.resolve = function(value) {
  if (value instanceof Promise) {
    return value; // 如果是Promise实例直接返回
  }

  return new Promise(function(resolve, reject) {
    resolve(value);
  });
};

// 静态方法 reject
Promise.reject = function(reason) {
  return new Promise(function(resolve, reject) {
    reject(reason);
  });
};

// 原型属性(方法) catch
Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
};

// 原型属性(方法) finally
Promise.prototype.finally = function(fn) {
  return this.then(
    function(value) {
      return Promise.resolve(fn()).then(function() {
        return value;
      });
    },
    function(error) {
      return Promise.resolve(fn()).then(function() {
        throw error;
      });
    }
  );
};

// 静态方法 all
Promise.all = function(promiseArr) {
  return new Promise(function(resolve, reject) {
    const length = promiseArr.length;
    const result = [];
    let count = 0;
    if (length === 0) {
      return resolve(result);
    }
    // promiseArr 不一定是数组，可以是任何迭代器，所以用for...of更好
    for (let [i, p] of promiseArr.entries()) {
      // 这里不直接promiseArr[i].then是为了防止传入的不是Promsie对象的情况
      Promise.resolve(p).then(
        function(data) {
          result[i] = data;
          count++;
          if (count === length) {
            resolve(result);
          }
        },
        function(reason) {
          return reject(reason);
        }
      );
    }
  });
};

// 静态方法 race
Promise.race = function(promiseArr) {
  return new Promise(function(resolve, reject) {
    const length = promiseArr.length;
    if (length === 0) {
      return resolve();
    }

    for (let item of promiseArr) {
      Promise.resolve(item).then(
        function(value) {
          return resolve(value);
        },
        function(reason) {
          return reject(reason);
        }
      );
    }
  });
};

// 静态方法 any
Promise.any = function(promiseArr) {
  return new Promise(function(resolve, reject) {
    const length = promiseArr.length;
    const result = [];
    let count = 0;
    if (length === 0) {
      return resolve(result);
    }

    for (let [i, p] of promiseArr.entries()) {
      Promise.resolve(p).then(
        value => {
          return resolve(value);
        },
        reason => {
          result[i] = reason;
          count++;
          if (count === length) {
            reject(result);
          }
        }
      );
    }
  });
};

// 静态方法 allSettled
Promise.allSettled = function(promiseArr) {
  return new Promise(function(resolve) {
    const length = promiseArr.length;
    const result = [];
    let count = 0;

    if (length === 0) {
      return resolve(result);
    } else {
      for (let [i, p] of promiseArr.entries()) {
        Promise.resolve(p).then(
          value => {
            result[i] = { status: "fulfilled", value: value };
            count++;
            if (count === length) {
              return resolve(result);
            }
          },
          reason => {
            result[i] = { status: "rejected", reason: reason };
            count++;
            if (count === length) {
              return resolve(result);
            }
          }
        );
      }
    }
  });
};

// 使用 Promise.finally 实现 Promise.allSettled
Promise.allSettled = function(promises) {
  // 也可以使用扩展运算符将 Iterator 转换成数组
  // const promiseArr = [...promises];
  const promiseArr = Array.from(promises);
  return new Promise(resolve => {
    const result = [];
    const len = promiseArr.length;
    let count = len;
    if (len === 0) {
      return resolve(result);
    }
    for (let i = 0; i < len; i++) {
      promiseArr[i]
        .then(
          value => {
            result[i] = { status: "fulfilled", value: value };
          },
          reason => {
            result[i] = { status: "rejected", reason: reason };
          }
        )
        .finally(() => {
          if (!--count) {
            resolve(result);
          }
        });
    }
  });
};

// 使用 Promise.all 实现 Promise.allSettled
Promise.allSettled = function(promises) {
  // 也可以使用扩展运算符将 Iterator 转换成数组
  // const promiseArr = [...promises];
  const promiseArr = Array.from(promises);
  return Promise.all(
    promiseArr.map(p =>
      Promise.resolve(p).then(
        res => {
          return { status: "fulfilled", value: res };
        },
        error => {
          return { status: "rejected", reason: error };
        }
      )
    )
  );
};
```

## 实现并行限制的 Promise 调度器
实现有并行限制的 Promise 调度器问题。一个任务并发控制器，要求每次都有两个任务在执行：
```js
class Scheduler {
  constructor() {
    this.queue = []; // 任务队列
    this.maxCount = 2; // 最大并行数
    this.runCounts = 0; // 跑了几个任务了
  }
  add(promiseCreator) {
    this.queue.push(promiseCreator);
  }
  taskStart() {
    for (let i = 0; i < this.maxCount; i++) {
      this.request();
    }
  }
  request() {
    if (!this.queue || !this.queue.length || this.runCounts >= this.maxCount) {
      return;
    }
    this.runCounts++;
    // 不同情况要改造
    this.queue
      .shift()()
      .then(() => {
        this.runCounts--; // 这里 this.queue.shift() 和 !this.queue || !this.queue.length 可以用这种办法
        this.request();
      });
  }
}

const timeout = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
    });
}

const scheduler = new Scheduler();

const addTask = (time, order) => {
  scheduler.add(() => {
    return timeout(time).then(() => {
      console.log(order);
    });
  });
};
addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
scheduler.taskStart();
// 2
// 3
// 1
// 4
```

## 实现 Ajax 并发请求控制
实现一个批量请求函数 multiRequest(urls, maxNum, callback)，要求如下：
+ 要求最大并发数 maxNum
+ 每当有一个请求返回，就留下一个空位，可以增加新的请求
+ 所有请求完成后，结果按照 urls 里面的顺序依次打出
+ multiRequest 可以返回一个 promise 或者 直接执行 callback 回调
```js
function multiRequest(urls = [], maxNum, callback) {
  const len = urls.length;
  const result = new Array(len).fill(false);
  let runCount = 0;
  return new Promise((resolve, reject) => {
    // 最多同时发送maxNum个请求
    while (runCount < maxNum) {
      sendRequest();
    }
    function sendRequest() {
      let curCount = runCount; // curCount 从 0 开始是 urls 的下标
      runCount++;
      if (runCount >= len) {
        callback(result); // 可以执行回调
        resolve(result); // 也可以返回一个新 promise
        return
      }
      console.log(`开始发送第 ${curCount} 个请求`);
      let curUrl = urls[curCount];
      fetch(curUrl)
        .then(value => {
          console.log(`第 ${curCount} 个请求：${value} 成功了！`);
          result[curCount] = `${value} 成功`;
        })
        .catch(reason => {
          console.log(`第 ${curCount} 个请求：${reason} 失败了！`);
          result[curCount] = `${reason} 失败`;
        })
        .finally(() => {
          if (runCount < len) {
            sendRequest();
          }
        });
    }
  });
}
```

## Promise 对象实现 Ajax 操作
```js
const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject) {
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();
  });

  return promise;
};

getJSON("/posts.json").then(
  function(json) {
    console.log("Contents: " + json);
  },
  function(error) {
    console.error("出错了", error);
  }
);
```

## Generator 函数与 Promise 的结合
使用 Generator 函数管理流程，遇到异步操作的时候，通常返回一个Promise对象。
```js
function getFoo () {
    return new Promise(function (resolve, reject){
        resolve('foo');
    });
}

const g = function* () {
    try {
        const foo = yield getFoo();
        console.log(foo);
    } catch (e) {
        console.log(e);
    }
};

function run (generator) {
    const it = generator();

    function go(result) {
        if (result.done) return result.value;

        return result.value.then(function (value) {
            return go(it.next(value));
        }, function (error) {
            return go(it.throw(error));
        });
    }

    go(it.next());
}

run(g);
```
上面代码的 Generator 函数g之中，有一个异步操作getFoo，它返回的就是一个Promise对象。函数run用来处理这个Promise对象，并调用下一个next方法。