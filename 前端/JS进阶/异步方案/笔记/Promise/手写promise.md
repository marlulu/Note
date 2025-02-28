## Promiseȫ��Ͱ
```js
// ����Promise�� 3 ��״̬
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

// Promise ���캯��
function Promise(execute) {
  var that = this;
  that.state = PENDING; // ״̬��ʼ��

  that.value = undefined; // �ɹ���� ����this�ϱ���then����
  that.reason = undefined; // ʧ�ܽ�� ����this�ϱ���catch����

  that.onFulfilledFn = []; // �Ѷ��ֻص�����
  that.onRejectedFn = []; // �Ѿܾ��ص�����

  // ������ setTimeout ��Ϊ��ģ���첽΢����������΢����ֻ��ͨ��������ײ�ſ��Ե���
  function resolve(value) {
    setTimeout(function() {
      if (that.state === PENDING) {
        that.state = FULFILLED;
        // Ϊ�˺����� then �Ļص��п��Եõ� resolve ���ݵĲ���,���䱣���ڹ��캯���
        that.value = value;
        // ��ʱ onFulfilledFn ���ǿյ�����ôִ������Ļص��أ�
        // ���ע�⿴�������ǲ��õ� setTimeout �첽����
        // ��Ȼû����ʱʱ�䵫��ִ��ʱ�仹�ǻᱻ���ں����������ȴ�ͬ������ִ������ִ��
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
    // ���ڲ��� resolve �� reject ���� executor���û��ɵ��� resolve �� reject
    execute(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

// ԭ������(����) then
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
        // onFulfilled�п���ִ��ʧ��
        try {
          // �ж�x���ص��ǲ���һ��promise
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
    return reject(new TypeError("x ������ promise ���"));
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

// ��̬���� resolve
Promise.resolve = function(value) {
  if (value instanceof Promise) {
    return value; // �����Promiseʵ��ֱ�ӷ���
  }

  return new Promise(function(resolve, reject) {
    resolve(value);
  });
};

// ��̬���� reject
Promise.reject = function(reason) {
  return new Promise(function(resolve, reject) {
    reject(reason);
  });
};

// ԭ������(����) catch
Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
};

// ԭ������(����) finally
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

// ��̬���� all
Promise.all = function(promiseArr) {
  return new Promise(function(resolve, reject) {
    const length = promiseArr.length;
    const result = [];
    let count = 0;
    if (length === 0) {
      return resolve(result);
    }
    // promiseArr ��һ�������飬�������κε�������������for...of����
    for (let [i, p] of promiseArr.entries()) {
      // ���ﲻֱ��promiseArr[i].then��Ϊ�˷�ֹ����Ĳ���Promsie��������
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

// ��̬���� race
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

// ��̬���� any
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

// ��̬���� allSettled
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

// ʹ�� Promise.finally ʵ�� Promise.allSettled
Promise.allSettled = function(promises) {
  // Ҳ����ʹ����չ������� Iterator ת��������
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

// ʹ�� Promise.all ʵ�� Promise.allSettled
Promise.allSettled = function(promises) {
  // Ҳ����ʹ����չ������� Iterator ת��������
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

## ʵ�ֲ������Ƶ� Promise ������
ʵ���в������Ƶ� Promise ���������⡣һ�����񲢷���������Ҫ��ÿ�ζ�������������ִ�У�
```js
class Scheduler {
  constructor() {
    this.queue = []; // �������
    this.maxCount = 2; // �������
    this.runCounts = 0; // ���˼���������
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
    // ��ͬ���Ҫ����
    this.queue
      .shift()()
      .then(() => {
        this.runCounts--; // ���� this.queue.shift() �� !this.queue || !this.queue.length ���������ְ취
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

## ʵ�� Ajax �����������
ʵ��һ������������ multiRequest(urls, maxNum, callback)��Ҫ�����£�
+ Ҫ����󲢷��� maxNum
+ ÿ����һ�����󷵻أ�������һ����λ�����������µ�����
+ ����������ɺ󣬽������ urls �����˳�����δ��
+ multiRequest ���Է���һ�� promise ���� ֱ��ִ�� callback �ص�
```js
function multiRequest(urls = [], maxNum, callback) {
  const len = urls.length;
  const result = new Array(len).fill(false);
  let runCount = 0;
  return new Promise((resolve, reject) => {
    // ���ͬʱ����maxNum������
    while (runCount < maxNum) {
      sendRequest();
    }
    function sendRequest() {
      let curCount = runCount; // curCount �� 0 ��ʼ�� urls ���±�
      runCount++;
      if (runCount >= len) {
        callback(result); // ����ִ�лص�
        resolve(result); // Ҳ���Է���һ���� promise
        return
      }
      console.log(`��ʼ���͵� ${curCount} ������`);
      let curUrl = urls[curCount];
      fetch(curUrl)
        .then(value => {
          console.log(`�� ${curCount} ������${value} �ɹ��ˣ�`);
          result[curCount] = `${value} �ɹ�`;
        })
        .catch(reason => {
          console.log(`�� ${curCount} ������${reason} ʧ���ˣ�`);
          result[curCount] = `${reason} ʧ��`;
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

## Promise ����ʵ�� Ajax ����
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
    console.error("������", error);
  }
);
```

## Generator ������ Promise �Ľ��
ʹ�� Generator �����������̣������첽������ʱ��ͨ������һ��Promise����
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
�������� Generator ����g֮�У���һ���첽����getFoo�������صľ���һ��Promise���󡣺���run�����������Promise���󣬲�������һ��next������