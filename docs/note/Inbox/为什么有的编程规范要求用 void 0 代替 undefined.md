## 在什么场景下需要使用undefined
任何变量在赋值前，值都为 undefined。我们可以判断值是否 === undefined，以此来判断变量是否被赋为其他变量的值。
```js
let value
console.log(value === undefined) // true

undefined = 'hello'
console.log(value === undefined) //false
```

## 为什么要用void 0 代替 undefined
undefined 在是一个全局变量，我们可以用 `window.undefined`获取它的值。但是，在早期浏览器中 `undefined` 值是可以被修改的，一旦 undefined 值被修改，`value === undefined` 的判断结果就不正确。


void 运算符对给定的表达式进行求值，会忽略计算结果并**始终**返回 undefined。也就是说 void 任何值都会返回 undefined。所以用 void 0 获取 undefined 的值比较稳妥，避免因为 undefined 变量值被修改导致的判断 === undefined 错误。
```
var value;
console.log(value === void 0); //true
console.log(value === void(0)); //true
```

## 扩展
这个问题在 [ECMAScript 5](https://link.segmentfault.com/?enc=2idCyDtepPdmjOn4WoXNOw%3D%3D.Mn9HvUpFZs3iebg0PFXyc6UfixWJO2V3lA1MQq9cPzJ2E2borjLULqh8LEXFOIKW) 中被修复了，在实现了 ECMAScript 5 规范的浏览器中运行以下代码。

```js
Object.getOwnPropertyDescriptor(window, undefined); //运行结果：{"writable":false,"enumerable":false,"configurable":false}
```

从上面的运行结果可知，全局变量 undefined 的 writable 属性是 false，也就是不可写。


