---
slug: /note/js-precision-problem
title: js精度问题
---
```js
0.1 + 0.2 === 0.3; // false
```

二进制浮点数最大的问题是：
二进制浮点数中的0.1和0.2并不是十分精确，它们相加的结果并非刚好等于0.3，而是一个比较接近的数字0.30000000000000004，所以条件判断结果为false。

原因：
因为js遵循IEEE 754规范，会将小数先转换为二进制数后再进行计算，并且会限制二进制数的长度。而0.1和0.2在转二进制时出现无限循环，限制长度后计算自然失去精度。

解决方法：
最常见的解决方式就是设置一个误差范围，通常成为“机器精度”，对js来说，这个值是 `2^-52 (2.220446049250313e-16)`,在es6中被定义成了一个人常量，保存在Number.EPSILON。

```js
function numbersCloseEnoughToEqual(n1, n2) { 
	return Math.abs( n1- n2 ) < Number.EPSILON; 
}
var a = 0.1 + 0.2; 
var b = 0.3; 
numbersCloseEnoughToEqual( a, b ); // true 
numbersCloseEnoughToEqual( 0.0000001, 0.0000002 ); // false
```


