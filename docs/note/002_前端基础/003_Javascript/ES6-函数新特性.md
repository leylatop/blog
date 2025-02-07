#### 参数默认值

```javascript
function log(x, y = 'world') {
    console.log(x, y);
};
log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello
log(); //undefined world
```

#### 参数变量

- 参数变量是默认声明的，所以不可以再使用let或const再次声明；
- 使用参数默认值时，函数名不可以有同名参数；
- 
```javascript
function foo(x = 5) {
    let x = 1; // error
    const x = 2; // error
}
```

#### 惰性求值

- 函数参数默认值若为表达式，则是惰性求值，每次调用的时候重新求值；
```javascript
// TODO...
function foo() {
}

function log(get) {

}
```

#### 函数参数解构赋值

- 函数参数可以与解构赋值一起使用，只有当函数foo的参数是一个对象时，变量x和y才会通过解构赋值生成，参数至少要是设默认的空对象：

```javascript
function foo({ x, y = 5 } = {}) {
    console.log(x, y);
}

foo({}) // undefined 5
foo({ x: 1 }) // 1 5
foo({ x: 1, y: 2 }) // 1 2
foo() // undefined 5
```

- 下面代码，若调用fetch时，不传入第二个参数，会默认解构赋值的是一个undefined，所以报错
```javascript
function fetch(url, { body = '', method = 'GET', headers = {} }) {
    console.log(method);
}
fetch('http://example.com', {})
// "GET"
fetch('http://example.com')
// 报错

```

- 正确写法
```javascript
function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
    console.log(method);
}

fetch('http://example.com')
// "GET
```

- 结构赋值其他情况
```javascript
// 写法一
function m1({ x = 0, y = 0 } = {}) {
    return [x, y];
}

// 写法二
function m2({ x, y } = { x: 0, y: 0 }) {
    return [x, y];
}

// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]

// x 和 y 都有值的情况
m1({ x: 3, y: 8 }) // [3, 8]
m2({ x: 3, y: 8 }) // [3, 8]

// x 有值，y 无值的情况
m1({ x: 3 }) // [3, 0]
m2({ x: 3 }) // [3, undefined]

// x 和 y 都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]
m1({ z: 3 }) // [0, 0]
m2({ z: 3 }) // [undefined, undefined]
```

#### 函数length属性

- 函数的length属性为**函数参数的个数**，并且除去有默认值的参数，某个参数指定默认值以后，预期传入的参数个数就不包括这个参数了；如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了。
```javascript
(function (a = 0, b, c) { }).length // 0
(function (a, b = 1, c) { }).length // 1

```

#### 作用域问题
- 如果设置了参数默认值，函数初始化时，参数会形成单独的作用域，初始化结束时，作用域消失。
```javascript
var x = 1;
function f(x, y = x) {
    console.log(y);
}
f(2) // 2
let x = 1;
function f(y = x) {
    let x = 2;
    console.log(y);
}
f() // 1 取的是全局变量let x的值

function f(y = x) {
    let x = 2;
    console.log(y);
}
f() // ReferenceError: x is not defined
```

#### 箭头函数

- 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
- 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
- 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
- 不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

```javascript
var f = v => v;
var f = () => 5;
var sum = (num1, num2) => num1 + num2;
```

#### 尾调用

- 最后一句执行的语句是调用一个函数

```javascript
function f(x) {
    return g(x);
}
```

#### 尾递归

- 最后一句执行的语句是调用自身函数

```javascript
function factorial(n) {
    if (n === 1) return 1;
    return n * factorial(n - 1);
}

factorial(5) // 120
```

#### 函数参数的尾逗号

```javascript
function clownsEverywhere(
    param1,
    param2,
) { /* ... */ }

clownsEverywhere(
    'foo',
    'bar',
);

```
#### Function.prototype.toString()

```javascript
function /* foo comment */ foo() { }

foo.toString()
// "function /* foo comment */ foo () {}"
```

#### catch 命令的参数

- 之前
```javascript
try {
    // ...
} catch (err) {
    // 处理错误
}

```

- es6
```javascript
try {
    // ...
} catch {
    // ...
}
```
