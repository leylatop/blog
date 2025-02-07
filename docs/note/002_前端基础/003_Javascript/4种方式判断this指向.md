如果要判断一个函数内的this指向，只有在运行这个函数的时候，才能知道。通过查看调用函数的方式，按照以下顺序来判断this的指向：
1. new绑定：函数是否使用`new` 关键字调用？如果是，则绑定到实例上（即new出来的对象）；
```js
// this => bar
const bar = new foo()
```

2. 显示绑定：是否由 `call` 或 `apply` 或 `bind`调用，如果是则绑定到`call`或 `apply` 或 `bind`的第一个参数上；
```js
// this => obj
const bar = foo.call(obj)
```

3. 隐式绑定：是否由上下文对象调用？如果由上下文对象调用，则绑定到那个上下文对象
```js
// this => obj
const bar = obj.foo()
```

4. 默认绑定：如果以上规则都没有匹配上，在严格模式下绑定到 `undefined`，否则绑定到全局对象。
```js
// this => window
const bar = foo()
```

