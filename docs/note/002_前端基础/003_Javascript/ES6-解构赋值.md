---
slug: /note/es6-destructuring-assignment
title: ES6-解构赋值
---
解构赋值：按照一定的模式，从数组和对象中提取值，对声明的变量进行赋值；如果被提取的不是数组或对象，则先转化成数组或对象。

### 数组的解构赋值

完全解构：等号左右两侧模式完全匹配，并且取值时，按照数组的次序排列。

```javascript
let [a, b, c] = [1, 2, 3]; 
// a=1 b=2 c=3
let [a, [[b], c]] = [1, [[2], 3]];
// a=1 b=2 c=3
let [, , c] = ['1', '2', '3']
// c=3
let [a, , c] = ['1', '2', '3'];
// a=1 b=2 c=3
let [a, ...b] = ['1', '2', '3'];
// a=1 b=['2', '3']
let [a, b, ...c] = ['1']; 
// a=1 b=undefined c=[]
```

不完全解构：等号左边的模式只匹配一部分右边的数组，这种情况依然可以解析成功。

```javascript
let [x, y] = [1, 2, 3];
// x=1 y=2
let [a, [b], d] = [1, [2, 3], 4];
// a=1 b=2 d=4
```

解构失败：如果解构不成功，则变量值为undefined； 等号右边若不是数组，或不能转化成可迭代的对象，则会报错

```javascript
let [a] = [];
let [b, a] = [1];
// a=undefined
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
// 报错
```

#### 对象的解构赋值

不需要按照次序排序，变量名与要匹配的对象属性名一致即可，若被匹配的对象中没有要声明的变量的同名属性，则会报错；先找到同名属性，然后再赋给对应的变量，真正被赋值的是后者，而不是前者。

```javascript
let {foo: foo, bar: bar} = {foo: 'aaa', bar: 'bbb'}
// 定义变量foo、bar，匹配对象中的属性为foo和bar的value值。等号左边foo是匹配的模式，baz才是变量
let {foo, bar} = {foo: 'aaa', bar: 'bbb'}
// 若变量名与属性名一致，则可以省略
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
// 定义一个变量bar，匹配对象中的foo的值
Object.setPrototypeOf(obj1, obj2);
// 把obj2对象设置成obj1对象的原型，对象的解构赋值可以取到继承的属性

```
对象解构赋值时，被匹配的对象可以是一个数组：

```javascript
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
// first=1 last=3

```
#### 字符串的解构赋值

字符串也可以解构赋值，这是因为此时，字符串被转换成了一个类似数组的对象。

```javascript
const [a, b, c, d, e] = 'hello';
//a="h" b="e" c="l" d="l" e="o"
```

####  函数参数的解构赋值

函数的参数为解构赋值中被赋值的变量，调用函数的传参为解构赋值中被匹配的对象，函数的参数可以是字符串、数字、布尔类型、数组、对象。

```javascript
function add([x, y]){
    return x + y;
}
add([1, 2]); // 3
```

函数参数的默认值：

```javascript
// 函数参数的解构赋值的默认值：若调用函数时没有参数，则使用等号左边变量的默认值；
function move({x = 0, y = 0} = {}) {
    return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]

// 函数参数的解构赋值的默认值：若调用函数时没有参数，则使用等号右边参数的默认值；
function move({x, y} = { x: 0, y: 0 }) {
    return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
```

#### 圆括号的使用

可以使用圆括号的情况：赋值语句的非模式部分（对象赋值时，必须要在赋值语句外面加括号）

```javascript
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确
```
