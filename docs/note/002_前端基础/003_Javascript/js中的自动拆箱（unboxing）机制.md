---
slug: /note/js-automatic-unboxing-mechanism
title: js中的自动拆箱（unboxing）机制
---
```js
function foo(x) {
  x = x + 1;
  x; // 3
}

var a = 2;
var b = new Number( a ); // Object(a)也一样

foo( b );
console.log( b ); // 是对象2，不是对象3/数字3
```
自动拆箱机制是JavaScript中的一个重要特性，它允许我们在大多数情况下将包装对象和原始值互换使用，提高了语言的灵活性和易用性。


自动拆箱的过程：
当在期望使用原始值的上下文中遇到包装对象时，JavaScript会自动调用该对象的valueOf()或toString()方法来获取原始值。

自动拆箱的对象：
- Number 对象
```js
let numObj = new Number(42);
console.log(numObj + 1); // 43
```

- String对象
```js
let strObj = new String("hello");
console.log(strObj + " world"); // "hello world"
```

- Boolean对象
```js
let boolObj = new Boolean(true);
if (boolObj) {
    console.log("This will be printed");
}
```

- Symbol对象（虽然很少使用Symbol构造函数）
```js
let symObj = Object(Symbol("foo"));
console.log(typeof symObj); // "object"
console.log(typeof symObj.valueOf()); // "symbol"
```

- BigInt对象
```js
let bigIntObj = Object(BigInt(42));
console.log(bigIntObj + BigInt(1)); // 43n
```


自动拆箱的常见场景：
- 在进行运算时（如加法、减法等）
- 在比较操作中（使用==或===）
- 在if语句的条件中
- 作为函数的参数传递时


注意事项：
1. 自动拆箱通常是隐式的，开发者不需要手动操作。
2. 在某些情况下，显式使用valueOf()或toString()方法可能更清晰。
3. null和undefined没有对应的包装对象，因此不存在拆箱操作。

