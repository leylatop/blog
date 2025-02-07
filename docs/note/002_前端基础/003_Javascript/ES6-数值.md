#### 二进制和八进制表示法

二进制： 0b 或 0B
八进制： 0o 或 0O

```javascript
// 判断数字是否有限
Number.isFinite()

// 判断数字是否为NaN
Number.isNaN()

// 转化为整数
Number.parseInt()

// 转化为浮点数
Number.parseFloat()

// 判断数字是否为整数
Number.isInteger() 

// 引入的常量
Number.EPSILON = Math.pow(2, -52)

// 安全整数
Number.MAX_SAFE_INTEGER = Math.pow(2, 53) - 1
Number.MIN_SAFE_INTEGER = -Number.MAX_SAFE_INTEGER

// 判断数字是否在安全整数范围内
Number.isSafeInteger()

// 去除一个数的小数部分，返回整数部分
Math.trunc();

// 判断一个数到底是正数、负数、还是零
Math.sign()

// 计算一个数的立方根
Math.cbrt()

// 将参数转为 32 位无符号整数的形式，然后返回这个 32 位值里面有多少个前导 0
Math.clz32()

// 返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数
Math.imul()

// 返回一个数的32位单精度浮点数形式
Math.fround()

// 返回所有参数的平方和的平方根
Math.hypot()

// Math.expm1(x)，返回 ex - 1，Math.exp(x) - 1
Math.expm1()

// Math.log1p(x)， 返回1 + x的自然对数，即Math.log(1 + x)
Math.log1p()

// Math.log10(x)， 返回以 10 为底的x的对数
Math.log10()

// Math.log2(x)返回以 2 为底的x的对数
Math.log2()

// 返回x的双曲正弦（hyperbolic sine）
Math.sinh(x)

// 返回x的双曲余弦（hyperbolic cosine）
Math.cosh(x) 

// 返回x的双曲正切（hyperbolic tangent）
Math.tanh(x)

// 返回x的反双曲正弦（inverse hyperbolic sine）
Math.asinh(x)

// 返回x的反双曲余弦（inverse hyperbolic cosine）
Math.acosh(x)

// 返回x的反双曲正切（inverse hyperbolic tangent）
Math.atanh(x)

// 指数运算符（**）
2 ** 2 // 4
2 ** 3 // 8

// 相当于 2 ** (3 ** 2)
2 ** 3 ** 2
// 512
let a = 1.5;
a **= 2;
```