所有的中间件，都会作为applyMiddleware函数的参数使用。

redux中间件是一个函数，由三层函数组成，每一层都返回一个新的函数
第一层的参数为 `store`，对象的key必须包含dispatch和getState，即 `{ dispatch, getState }`

第二层函数的参数为 `next`

第三层函数的参数为 `action`，action即为代码中调用dispatch时，传入的内容，例如：
```js
dispatch({ type: 'entry:select:items', payload: { cids: [ firstValidInteraction.data.triggerItemKey ] } })

dispatch(updateCurrentOrgList())

dispatch({ type: OrgActionType.UpdateOrgList, payload: updatedOrgList })
```

一般在第三层中进行参数的判断，若函数参数符合自定义的参数格式，则返回执行自定义的代码逻辑，否则返回`next(action)`

以redux-thunk中间件的代码为例：
```js
const middleware =
({ dispatch, getState }) => // 第一层
next => // 第二层
action => { // 第三层
  if (typeof action === 'function') { // dispatch的参数是函数
	// 将返回函数的调用结果转发给链中的下一个中间件
    return action(dispatch, getState, extraArgument)
  }
  // 转发给链中的下一个中间件，调用下一个中间件
  return next(action) // 
}
```


---
1. 实现一个logger中间件
```js
const logger = store => next => action => {
	console.log('dispatching', action)
	return next(action)
}
```

2. 怎么添加多个中间件？
```

```