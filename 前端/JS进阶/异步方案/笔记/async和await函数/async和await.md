# Async

----
**作用：** async/await 做的事情就是将 Generator 函数转换成 Promise，说白了，async 函数就是 Generator 函数的语法糖，await 命令就是内部 then 命令的语法糖。

async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await，仅此而已。

**原理：** 将 Generator 函数和自动执行器包装在一个函数里。




