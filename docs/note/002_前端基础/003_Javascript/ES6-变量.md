#### 声明变量

首先我们来回顾一下 es6 之前声明变量的方法：通常情况下，在 JavaScript 中，我们只有一种声明变量的关键字--var，我们使用 var 声明变量，使用 = 给变量赋值。在es6中我们可以使用新增的关键字let和const声明变量：let声明变量的方法和var一致，均可先声明再赋值，或直接声明并赋值；const声明变量时，不可先声明再赋值，必须直接声明并赋值，否则会报错，并且const声明的变量一旦生产声明过后，就不可再更改，我们可以理解一般用const声明常量；

```javascript
var str;                //声明变量
str = 'Learning';       //变量赋值
var str2 = 'Learning';  //直接声明并赋值
let str;                //声明变量
str = 'Learning';       //变量赋值
let str2 = 'Learning';  //直接声明并赋值
const str;              //报错Uncaught SyntaxError: Missing initializer in const declaration
const str3 = 'Learning';//直接声明并赋值
```

#### 作用于块作用域

除此之外，let和const的作用域与var不同，let和const声明的变量只能在当前的块作用域内访问到；

```javascript
{
  let a = 10;
  var b = 1;
}

a // 报错ReferenceError: a is not defined.
b // 1
```

#### 不可以变量提升

var可以变量提升，即在声明变量之前使用，值为undefined；let、const不可以变量提升，在声明变量之前使用会报错；

```javascript
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

#### 暂时性死区

只要块级作用域内存在`let或const`命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响，形成封闭作用域。凡是在声明变量之前访问变量都会报错，在作用域内，声明变量之前，该变量是不可用的，这称为“暂时性死区”。

```javascript
var a = 'string';
if(true) {
    console.log(a); // ReferenceError
    a = 'abc';      // ReferenceError
    console.log(a); // ReferenceError
    let a;
    console.log(a); // undefined
    a = 123;
    console.log(a); // 123
}
```

#### 不可重复声明

let不允许在同一个作用域内声明同一个变量。

```javascript
let a = 1;  // 1
var a = 2;  // Uncaught SyntaxError: Identifier 'a' has already been declared

var a = 1;  // 1
let a = 2;  // Uncaught SyntaxError: Identifier 'a' has already been declared
let a = 1;  // 1
let a = 2;  // Uncaught SyntaxError: Identifier 'a' has already been declared

var a = 1;  // 1
var a = 2;  // 2

```
#### const定义复合类型

const声明变量的本质是变量指向的内存地址所保存的数据不得改动。对于单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。

```javascript
const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
```

为了使对象冻结，在声明变量的时候，我们使用Object.freeze方法。

```javascript
const foo = Object.freeze({});

// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;
```


将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。

```javascript
var constantize = function(obj){
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```

#### es6声明变量的6中方法

`var、function、let、const、import、class`