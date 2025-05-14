---
slug: /note/object-entries-and-object-fromentries
title: Object.entries 和 Object.fromEntries
---
`Object.entries`: 将对象或基于对象的可迭代对象转换为键值对数组
- 参数: 一个对象或基于对象的可迭代对象（或数组），可以是：
  - 普通对象，例如 `{ a: 1, b: 2 }`。
  - 数组，例如 `[1, 2, 3]`，它会返回数组索引和值的键值对。
  - 字符串，例如 `'abc'`，它会返回字符串索引和值的键值对。
  - 类数组对象，例如 `arguments` 对象。
  - 其他带有可枚举属性的对象，例如通过 `Object.create` 创建的对象。
  - 在ES6之后的版本，如果传入的参数是一个非对象（`number`、`boolean`、`map`、`set`等）会被强制转换为一个对象。
  - 如果传入的参数是`null`或`undefined`，会抛出`TypeError`异常。
  - 如果想要将`map`或`set`对象转换为键值对数组，可以使用`map`或`set`对象的`entries`方法,或先将`map`或`set`对象转换为数组，再使用`Object.entries`方法。
- 返回值: 一个包含对象自身可枚举属性的键值对数组
- 示例：
```js
const obj = { foo: 'bar', baz: 42 };
console.log(Object.entries(obj)); // [['foo', 'bar'], ['baz', 42]]

const arr = ['a', 'b', 'c'];
console.log(Object.entries(arr)); // [['0', 'a'], ['1', 'b'], ['2', 'c']]

const str = 'hello';
console.log(Object.entries(str)); // [['0', 'h'], ['1', 'e'], ['2', 'l'], ['3', 'l'], ['4', 'o']]

// 注意：非对象参数（如数字或布尔值）将被强制转换为对象。
const num = 42;
console.log(Object.entries(num)); // []

const bool = true;
console.log(Object.entries(bool)); // []

const map = new Map().set('foo', 'bar').set('baz', 42);
console.log(Object.entries(map)); // []

const set = new Set().add('foo').add('bar').add('baz');
console.log(Object.entries(set)); // []

// 如果参数是 `null` 或 `undefined`，它会抛出一个错误，因为它们不能被转换为对象。
try {
  console.log(Object.entries(null));
} catch (e) {
  console.error(e); // TypeError: Cannot convert undefined or null to object
}

try {
  console.log(Object.entries(undefined));
} catch (e) {
  console.error(e); // TypeError: Cannot convert undefined or null to object
}
```

`Object.fromEntries`: 将键值对数组转换为对象，是`Object.entries`的逆操作
- 参数: 
  - 键值对数组，可以是数组，也可以是`Map`对象
  - 如果传入的参数是一个非数组或非`Map`对象（`string`、`number`、`boolean`、`undefined`、`null`、`set`），会抛出`TypeError`异常
- 返回值: 一个新的对象，包含键值对数组中的键值对
- 示例：
```js
const entries = [['foo', 'bar'], ['baz', 42]];
console.log(Object.fromEntries(entries)); // { foo: 'bar', baz: 42 }

const map = new Map().set('foo', 'bar').set('baz', 42);
console.log(Object.fromEntries(map)); // { foo: 'bar', baz: 42 }

// 如果参数是 非数组或非Map对象 ，它会抛出一个错误，因为它们不能被转换为对象。
try {
  const params = null; // null/undefined/number/boolean/undefined/set
  console.log(Object.fromEntries(params));
} catch (e) {
  console.error(e); // TypeError: Cannot convert undefined or null to object
}
```



示例：
- 将url的查询参数转换为对象
```js
function parseQuery(url) {
  const search = url.split('?')[1];
  if (!search) return {};
  return Object.fromEntries(new URLSearchParams(search));
  // return Object.fromEntries(new URLSearchParams(search).entries()) // entries() 可以省略，是因为默认就是返回键值对数组
}
```
