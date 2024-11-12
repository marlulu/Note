## Redux

三大准则
1. 单一数据源：整个应用的全局 state 都储存在一棵状态树中，这个状态树只存在于唯一一个store中
2. State 只读：唯一改变 state 的方法就是触发 action
3. 使用纯函数执行修改：为了描述 action 如何更改 state，需要编写纯的 reducer