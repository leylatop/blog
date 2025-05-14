---
slug: /note/es6-symbol
title: ES6-symbol
---
Symbol 是es6新增的一种数据类型。

#### 创建

```javascript
var a = Symbol();
// Symbol()
var a = Symbol('foo');
// Symbol(foo)

// 没有参数的情况
let s1 = Symbol();
let s2 = Symbol();
s1 === s2 // false

// 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('foo');
s1 === s2 // false
```

#### description描述

```javascript
a.description = 'foo'
```

#### 作为属性名的Symbol（不能用点运算符）

```javascript
let mySymbol = Symbol();
// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';
// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};
// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });
// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```

#### 遍历Symbol属性名

只有Object.getOwnPropertySymbols，可以获取对象的Symbol属性名；Reflect.ownKeys可以获得所有类型的属性名。

```javascript
const obj = {};
let foo = Symbol("foo");
Object.defineProperty(obj, foo, {
  value: "foobar",
});
for (let i in obj) {
  console.log(i); // 无输出
}
Object.getOwnPropertyNames(obj)
// []
Object.getOwnPropertySymbols(obj)
// [Symbol(foo)]

let obj = {
  [Symbol('my_key')]: 1,
  enum: 2,
  nonEnum: 3
};

Reflect.ownKeys(obj)
//  ["enum", "nonEnum", Symbol(my_key)]
```

#### Symbol.for() Symbol.keyFor()

Symbol.for()生成Symbold的时候，会被登记在全局环境中供搜索。不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。

```javascript
// 没有参数的情况
let s1 = Symbol.for();
let s2 = Symbol.for();
s1 === s2 // true

// 有参数的情况
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');
s1 === s2 // true

```

Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key值。

```javascript
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"
let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined

```
#### 对象内置的Symbol值

```javascript
Symbol.hasInstance
Symbol.isConcatSpreadable
Symbol.species
Symbol.match
Symbol.replace
Symbol.search
Symbol.split
Symbol.iterator
Symbol.toPrimitive
Symbol.toStringTag
Symbol.unscopables
```
