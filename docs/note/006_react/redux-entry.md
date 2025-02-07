1. redux-entry 是 redux的中间件

2. redux-entry 提供了一个 createReduxEntry方法，返回{  middleware, setEntry, setEntryMap }，其中 middleware 是供redux作为中间件使用

3. 可以再entry中获取store，也可以dispatch 一些action

4. 可以触发其他的action 或 entry

5. 可以触发多个action 或 entry

6. 可以用 createStateStore 创建 mini-state-store