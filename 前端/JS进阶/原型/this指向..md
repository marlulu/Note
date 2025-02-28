全局上下文：this指向全局对象，浏览器中为 window

函数上下文
- 对象的方法调用：this 指向调用该方法的对象。
- 普通函数调用：this 指向全局对象（非严格模式）或 undefined（严格模式）。
- 构造函数调用：this 指向新创建的对象。
- 指定 this 调用方式：使用 call、apply 和 bind 方法可以显式地设置 this 值。
- 箭头函数：箭头函数没有自己的 this 绑定，它会捕获其所在上下文的 this 值。

定时器中的 this 
- 普通函数在 setTimeout 中
  - this 指向全局对象（非严格模式）或 undefined（严格模式）
- 箭头函数在 setTimeout 中
  - 它会捕获其所在上下文的 this 值