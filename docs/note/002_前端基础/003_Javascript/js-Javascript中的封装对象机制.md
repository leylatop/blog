## 包装
1. 在使用基本类型的值访问的.length、.toString()方法时，由于基本类型值没有这些属性，此时JavaScript会自动为基本类型的值包装一个封装对象

```js
const a = 'abc'
a.length // 3
a.toUpperCase() // ABC
```


2. 自行封装基本类型值，推荐使用Object方法
```js
var a = "abc";
var b = new String( a );
var c = Object( a );

typeof a; // "string"
typeof b; // "object"
typeof c; // "object"

b instanceof String; // true
c instanceof String; // true

Object.prototype.toString.call( b ); // "[object String]"
Object.prototype.toString.call( c ); // "[object String]"

```

3. 数组、对象、函数、正则表达式本身就是对象，都是通过封装对象来包装

**Tips：一般情况下，不要直接创建封装对象，js引擎自己会决定什么时候应该使用封装对象。**
```js
const bool = new Boolean(false)
if(!bool) {
	console.log('false log') // 永远也不会执行到这里，因为bool是一个封装对象，对象的值永远为true
}
```


## 拆封

1. 拆封现有的封装对象，用valueOf方法
```js
const str = new String('abc')
str.valueOf() // ’abc‘

const num = new Number(42)
num.valueOf() // 42

const bool = new Boolean(true)
bool.valueOf()  // true

```


## 隐式拆封（自动拆箱）

1. 在需要用到封装对象中的基本类型的值时，会发生隐式拆封，即自动拆箱

```js
var a = new String( "abc" );
var b = a + ""; // b的值为"abc"

typeof a; // "object"
typeof b; // "string"
```



关联：[[js中的自动拆箱（unboxing）机制]]