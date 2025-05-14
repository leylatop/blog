---
slug: /note/js-native-constructor-prototype-proto-constructor
title: js-原生构造函数的prototype、__proto__、constructor
---


## 代码

```js
typeof String // "function"
String.toString() // "ƒ String() { [native code] }"
String.prototype.toString() // ""

String.prototype // String {"", constructor: ƒ, anchor: ƒ, big: ƒ, blink: ƒ, …}
String.__proto__ // Function.prototype(ƒ () { [native code] })
String.constructor // ƒ Function() { [native code] }

String.prototype.prototype // ❎ undefined
String.prototype.__proto__ // Object.prototype
String.prototype.constructor // String

// -----------------分割线-------------------------------

typeof Number // "function"
Number.toString() // "ƒ Number() { [native code] }"
Number.prototype.toString() // "0"

Number.prototype // Number {0, constructor: ƒ, toExponential: ƒ, toFixed: ƒ, toPrecision: ƒ, …}
Number.__proto__ // Function.prototype(ƒ () { [native code] })
Number.constructor // ƒ Function() { [native code] }

Number.prototype.prototype // ❎ undefined
Number.prototype.__proto__ // Object.prototype
Number.prototype.constructor // Number


// -----------------分割线-------------------------------

typeof Boolean // "function"
Boolean.toString() // "ƒ Boolean() { [native code] }"
Boolean.prototype.toString() // "false"

Boolean.prototype // Boolean {false, constructor: ƒ, toString: ƒ, valueOf: ƒ}
Boolean.__proto__ // Function.prototype(ƒ () { [native code] })
Boolean.constructor // ƒ Function() { [native code] }

Boolean.prototype.prototype // ❎ undefined
Boolean.prototype.__proto__ // Object.prototype
Boolean.prototype.constructor // Boolean

// -----------------分割线-------------------------------

typeof Symbol // "function"
Symbol.toString() // "ƒ Symbol() { [native code] }"
Symbol.prototype.toString() // "Symbol(Symbol.iterator)"

Symbol.prototype // Symbol {Symbol(Symbol.iterator), constructor: ƒ, toString: ƒ, valueOf: ƒ}
Symbol.__proto__ // Function.prototype(ƒ () { [native code] })
Symbol.constructor // ƒ Function() { [native code] }

Symbol.prototype.prototype // ❎ undefined
Symbol.prototype.__proto__ // Object.prototype
Symbol.prototype.constructor // Symbol

// -----------------分割线-------------------------------

typeof Array // "function"
Array.toString() // "ƒ Array() { [native code] }"
Array.prototype.toString() // ""

Array.prototype // [] 比较特殊，Array.prototype 是一个数组
Array.__proto__ // Function.prototype(ƒ () { [native code] })
Array.constructor // ƒ Function() { [native code] }

Array.prototype.prototype // ❎ undefined
Array.prototype.__proto__ // Object.prototype
Array.prototype.constructor // Array


// -----------------分割线-------------------------------
typeof Object // "function"
RegExp.toString() // "ƒ RegExp() { [native code] }"
RegExp.prototype.toString() // "/(?:)/"

RegExp.prototype // RegExp {constructor: ƒ, exec: ƒ, test: ƒ, toString: ƒ, Symbol(Symbol.match): ƒ, …}
RegExp.__proto__ // Function.prototype(ƒ () { [native code] })
RegExp.constructor // ƒ Function() { [native code] }

RegExp.prototype.prototype // ❎ undefined
RegExp.prototype.__proto__ // Object.prototype
RegExp.prototype.constructor // RegExp

// -----------------分割线-------------------------------

typeof Function // "function"
Function.toString() // "ƒ Function() { [native code] }"
Function.prototype.toString() // "ƒ () { [native code] }"

Function.prototype // ƒ () { [native code] }
Function.__proto__ // Function.prototype(ƒ () { [native code] })
Function.constructor // ƒ Function() { [native code] }

Function.prototype.prototype // ❎ undefined
Function.prototype.__proto__ // Object.prototype
Function.prototype.constructor // Function


// -----------------分割线-------------------------------

typeof Object // "function"
Object.toString() // "ƒ Object() { [native code] }"
Object.prototype.toString() // "[object Object]"

Object.prototype // {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
Object.__proto__ // Function.prototype(ƒ () { [native code] })
Object.constructor // ƒ Function() { [native code] }

Object.prototype.prototype // ❎ undefined
Object.prototype.__proto__ // null
Object.prototype.constructor // ƒ Object() { [native code] } 

```

## 总结
- 所有原生构造函数的类型都是 `function`
- 所有原生构造函数都有 `prototype`、`__proto__`、`constructor` 属性
- 所有原生构造函数的 `prototype` 是一个原型对象，每个原生构造函数的 `prototype` 值都不同（`Function.prototype` 是一个函数、`Array.prototype` 是一个数组，"对象"是一个广义的概念,包括函数、数组等特殊类型。）
- 所有原生构造函数的 `__proto__` 属性均值指向 `Function.prototype`，即指向 `Function` 的原型，说明所有原生构造函数都是 `Function` 的实例
- 所有原生构造函数的 `constructor` 属性值指向 `Function`

- 所有原生构造函数的 `prototype` 均没有 `prototype` 属性
- 所有原生构造函数的 `prototype` 的 `__proto__` 属性值指向 `Object.prototype`
- 所有原生构造函数的 `prototype` 的 `constructor` 属性值指向自身
- 所有原生构造函数的 `prototype` 在某种情况下可以作为默认值使用，即使 `prototype` 是一个对象，在实际使用时，会进行隐式转换

## Function 的特殊性
- `Function` 的 `prototype` 属性值是一个函数，但是`Function.prototype` 没有 `prototype`属性，因为`Function.prototype`是所有构造函数的原型，否则会形成循环引用
- `Function` 的 `__proto__` 属性值指向 `Function.prototype`，即指向自身的原型
- `Function.__proto__ === Function.prototype` 为 `true`
- `Function` 的 `constructor` 属性值指向 `Function`，即指向自身

## Object 的特殊性
- `Object.prototype` 的 `__proto__` 属性值指向 `null`
- `prototype` 是函数独有的属性，但`Function.prototype`虽然是一个函数，但是`Function.prototype`没有`prototype`属性，因为`Function.prototype`是所有构造函数的原型，否则会形成循环引用

## 其他普通函数和对象：
- `prototype` 是函数独有的属性，用于定义由该函数创建的对象的原型
- `__proto__` 和 `constructor` 是所有对象都有的属性，函数也是对象，所以函数也有这两个属性
- 函数可能有的属性：`prototype`、`__proto__`、`constructor`，但是`Function.prototype`虽然是一个函数，但是`Function.prototype`没有`prototype`属性，因为`Function.prototype`是所有构造函数的原型，否则会形成循环引用；使用字面量创建的函数，没有`prototype`属性；

## 各个原生构造函数的`prototype`属性值不一致的原因：
- 为了保持类型一致性，`prototype`属性值应该与其构造的实例类型一致
- 为了实现功能继承，这种设计使得实例可以直接继承相应类型的方法和属性。






----
**【原创整理】转载请联系作者，并注明出处。**
