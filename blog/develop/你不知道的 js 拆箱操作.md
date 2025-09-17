---
slug: you-dont-know-js-unboxing-detail
title: 你不知道的 js 拆箱操作
date: 2025-07-01
authors: leyla
tags: [前端, javascript, 你不知道的 js, 拆箱操作]
keywords: [前端, javascript, 你不知道的 js, 拆箱操作]
---

## 解释：
拆箱操作，即对象转换为基本类型。可以将对象转换为字符串、数字或布尔值。拆箱操作的语法为 `unboxing(object)`。

<!-- truncate -->
## 对象转为字符串
```js
const obj = {
  toString: () => {
    console.log('toString');
    return 'hello';
  },
  valueOf: () => {
    console.log('valueOf');
    return 'world';
  },
};
console.log(String(obj)); // toString world

const obj1 = {
  toString: () => {
    console.log('toString');
    return {}
  },
  valueOf: () => {
    console.log('valueOf');
    return 'world';
  },
};
String(obj1); // toString valueOf world, 先执行 toString 方法，如果 toString 方法返回的是非基本类型，则执行 valueOf 方法

const obj2 = {
  toString: () => {
    console.log('toString');
    return Symbol('hello');
  },
  valueOf: () => {
    console.log('valueOf');
    return 'world';
  },
};
String(obj2); // toString 报错，因为 Symbol 不能转换为字符串，直接报错，不执行 valueOf 方法

const obj3 = {
  toString: () => {
    console.log('toString');
    return {};
  },
  valueOf: () => {
    console.log('valueOf');
    return {};
  },
};
String(obj3); // toString valueOf 报错，因为toString 和 valueOf 方法返回的都是非基本类型，直接报错
```

### 总结
1. 在对象转为字符串的拆箱过程中，会先尝试调用对象的 `toString` 方法，再尝试调用 `valueOf` 方法；
2. 若对象的 `toString` 方法返回的值是基础类型（string、number、boolean），则最终值是 `toString` 返回值到 `string` 类型的转换（基础类型 => string 类型）；
3. 若 `toString` 返回值非基础类型值：
   - 若是 `Symbol` 类型，则直接抛出错误，中断执行(`TypeError: Cannot convert a Symbol value to a string`)；
   - 若是对象，或数组，则继续执行 `valueOf` 方法；
4. 在这一步，若 `valueOf` 方法返回的是基础类型（string、number、boolean），则最终值是 `toString` 返回值到 `string` 类型的转换（基础类型 => string 类型）；
5. 若 `valueOf` 返回值非基础类型值：
   - 若是 `Symbol` 类型，则直接抛出错误，中断执行(`TypeError: Cannot convert a Symbol value to a string`)；
   - 若是对象，或数组，则抛出错误，结束执行(`TypeError: Cannot convert object to primitive value`)；

## 对象转为数字
```js
const obj = {
  toString: () => {
    console.log('toString');
    return 'hello';
  },
  valueOf: () => {
    console.log('valueOf');
    return 'world';
  },
};
console.log(Number(obj)); // valueOf NaN，因为 valueOf 方法返回的是基本类型值 `world`，所以下一步是将基本类型转换为数字，但是 world 不能转换为数字，所以最终结果是 NaN；如果 valueOf 方法返回的是可以被转换的值，比如 false 或 "0"，则最终结果是 0


const obj1 = {
  toString: () => {
    console.log('toString');
    return 'hello';
  },
  valueOf: () => {
    console.log('valueOf');
    return {};
  },
};
Number(obj1); // valueOf toString NaN，因为 valueOf 方法返回的是非基本类型值，所以下一步是调用 toString 方法，但是 hello 不能转换为数字，所以最终结果是 NaN

const obj2 = {
  toString: () => {
    console.log('toString');
    return 'hello';
  },
  valueOf: () => {
    console.log('valueOf');
    return Symbol('hello');
  },
};

// valueOf 报错，因为 Symbol 不能转换为数字，直接报错，不执行 valueOf 方法
Number(obj2); 

const obj3 = {
  toString: () => {
    console.log('toString');
    return {};
  },
  valueOf: () => {
    console.log('valueOf');
    return {};
  },
};
Number(obj3); // valueOf toString 报错，因为 valueOf 和 toString 方法返回的都是非基本类型值，直接报错
```

### 总结
1. 在对象转为数字的拆箱过程中，会先尝试调用对象的 `valueOf` 方法，再尝试调用 `toString` 方法；
2. 若对象的 `valueOf` 方法返回的值是基础类型（string、number、boolean），则最终值是 `valueOf` 返回值到数字类型的转换（基础类型 => number 类型）；
3. 若 `valueOf` 返回值非基础类型值：
   - 若是 `Symbol` 类型，则直接抛出错误，中断执行(`TypeError: Cannot convert a Symbol value to a number`)；
   - 若是对象，或数组，则继续执行 `toString` 方法；
4. 在这一步，若 `toString` 方法返回的是基础类型（string、number、boolean），则最终值是 `valueOf` 返回值到数字类型的转换（基础类型 => number 类型）；
5. 若 `toString` 返回值非基础类型值：
   - 若是 `Symbol` 类型，则直接抛出错误，中断执行(`TypeError: Cannot convert a Symbol value to a number`)；
   - 若是对象，或数组，则抛出错误，结束执行(`TypeError: Cannot convert object to primitive value`)；

## 拆箱示例
- 运算符拆箱
```js
const obj = {}
console.log(obj + 1); // Object => number，因为 `valueOf()` 返回值是 {}， 所以调用了 `toString()`，`toString()` 返回值是 "[object Object]"，所以最终结果是 "[object Object]1"
```
