## Redux

Redux 是一个使用 'action' 事件进行应用状态的管理和更新的模式和工具库。使代码具有可预测性

三大准则
1. 单一数据源：整个应用的全局 state 都储存在一棵状态树中，这个状态树只存在于唯一一个store中
2. State 只读：唯一改变 state 的方法就是触发 action
3. 使用纯函数执行修改：为了描述 action 如何更改 state，需要编写纯的 reducer

单向数据流
- 使用 state 来描述应用的状况，基于 state 来渲染出视图，当发生某些事情的时候，state 会根据发生的事情进行改变，生成新的 state，基于新的 state 生成新的视图。

主要内容
1. Action：发生的事件
2. Reducer：接收事件并进行处理
3. Store：存储所有 state 状态
4. Dispatch：用于触发事件 action 更新 state
5. Selector：从 store 树中提取状态

Redux 数据流
- 初始化启动
  1. 使用顶层的 root reducer 函数并创建 Redux store
  2. store 调用一次 root reducer，并将返回值保存为它的初始值
  3. 当视图首次渲染的时候，视图组件访问 Redux store 中的 state，并将其作为要展示的内容，同时监听 store 更新
- 更新环节
  1. 应用程序发生事件
  2. dispatch 一个 action 到 Redux store
  3. store 用之前的 state 和 当前的 action 再次运行 reducer 函数，并将返回值保存为新的 state
  4. store 通知所有订阅过的视图，store 发生了更新
  5. 每个订阅过 store 的视图组件会检测它们的需要的 store 部分是否需要更新
  6. 若需要，强制使用新数据重新渲染，更新页面。


Redux 构建流程
- 创建 Redux Store
- 创建 Slice Reducer 和 Action
  - createSlice 内部有个叫 immer 的库，它会跟踪进行的所有更改，然后使用更改列表返回一个安全的、不可更新的值

Thunks 异步
- 在 Redux 同步数据流前添加了异步额外，可以像 ajax 请求那样的运行逻辑，然后再 dispatch action
- Thunk 函數接收 dispatch 和 getState 作为参数，并在异步逻辑中使用。

react-thunk 可以让 action 函数化