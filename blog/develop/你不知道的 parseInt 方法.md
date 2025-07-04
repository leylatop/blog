---
slug: you-dont-know-parseInt-detail
title: 你不知道的 parseInt 方法
date: 2025-06-16
authors: leyla
tags: [前端, javascript, parseInt]
keywords: [前端, javascript, parseInt]
---
## 解释：
parseInt方法，解析字符串为数字。可以将字符串转换为整数。parseInt方法的语法为parseInt(string, radix)

## 参数
parseInt方法接受两个参数，第一个参数是要转换的字符串，第二个参数是转换时的基数。
- 第一个参数：理论上来说，接收任意类型的参数，但是只会解析字符串，如果参数不是字符串，会**先强制类型转换为字符串后**，再解析。
- 第二个参数：解析时的基数，即字符串的进制。参数的取值范围为2-36，当参数大于 10 时，字母 'A' 到 'Z'（大小写均可）被用作 10 到 35 的数字。

<!-- truncate -->

**如果不传入第二个参数，parseInt方法会根据字符串的格式自动判断进制，规则如下：**
- 如果字符串以 "0x" 或 "0X" 开头，parseInt会自动将其解释为十六进制数，相当于使用基数 16。
- 如果字符串以非"0" 开头，会自动将其解释为十进制数，相当于使用基数 10。
- 如果字符串以 "0" 开头，早期版本的ECMAScript规定解析为八进制数，但是ES5之后规定为十进制数。
- 如果字符串以+/-号开头，后面跟着数字，会被解释为带符号的十进制数
  
**如果传入第二个参数，parseInt方法会根据第二个参数的值进行解析，规则如下：**
- 如果第二个参数为0或没有传入，parseInt会根据字符串的格式自动判断进制。
- 如果第二个参数在2-36之间，parseInt会根据第二个参数的值进行解析。
- 如果第二个参数不在2-36之间，parseInt会返回NaN。

## 返回值
parseInt方法的返回值是转换后的整数。如果字符串的第一个字符不能转换为数字，parseInt方法会返回NaN。

```markdown
- 0-9、A-Z分别对应0-9、10-35（大小写均可）
- 当基数为2时，字符串中的第一位必须是0或1，否则返回NaN；后续字符必须是0或1，否则进行截断处理
- 当基数为8时，字符串中的第一位必须是0-7，否则返回NaN；后续字符必须是0-7，否则进行截断处理
- 当基数为10时，字符串中的第一位必须是0-9，否则返回NaN；后续字符必须是0-9，否则进行截断处理
- 当基数为16时，字符串中的第一位必须是0-9、a-f、A-F，否则返回NaN；后续字符必须是0-9、a-f、A-F，否则进行截断处理
- 当基数为19时，字符串中的第一位必须是0-9、a-i、A-I，否则返回NaN；后续字符必须是0-9、a-i、A-I，否则进行截断处理
- 当基数为其他值时，字符串中的第一位必须根据其范围确定，否则返回NaN；后续字符必须根据其范围确定，否则进行截断处理
```

## 注意
parseInt解析输入的字符串时，会进行截断处理，直到遇到无法解析的字符为止。比如，parseInt('123.45')，会解析为123，因为小数点后的字符无法解析；parseInt('123abc')，会解析为123，因为遇到无法解析的字符a时，a不在10进制范围内，会停止解析。

```js
parseInt('123', 2) // 1 = 1 * 2^2，只解析到第一个字符1，后面的字符不在2进制范围内
parseInt('123', 8) // 83 = 1 * 8^2 + 2 * 8^1 + 3 * 8^0
parseInt('123', 10) // 123
parseInt('123', 16) // 291 = 1 * 16^2 + 2 * 16^1 + 3 * 16^0
parseInt('F', 16) // 15
parseInt('FF', 16) // 255 parseInt 在截断时，进行贪心匹配
parseInt('G', 16) // NaN
parseInt('g', 16) // NaN parseInt对大小写不敏感
```


```js
// 非字符串参数会被强制转化成字符串,再进行转换, 以下值均为NaN，因为默认基数为10，f 不在10进制范围内
parseInt(false) 
parseInt(String(false))
parseInt(String(new Boolean(false)))
parseInt('false')
```

## 奇怪的bug
```js
parseInt( 1/0, 19 ); // 18
parseInt( 1/0, 23 ); // 22
parseInt( 1/0, 24 ); // 23
```
原因：1/0 为 Infinity，Infinity 转化为字符串为 "Infinity"，"Infinity" 转化为19进制时，会把I解析为18，而n不在19进制范围内，所以会停止解析，返回18。同理，23进制时，会把I解析为22，n不在23进制范围内，返回22。24进制时，会把I解析为23，n不在24进制范围内，返回23。

### 补充其他的bug
```js
parseInt( 0.000008 );       // 0   ("0" 来自于 "0.000008") String(0.000008) => "0.000008"
parseInt( 0.0000008 );      // 8   ("8" 来自于 "8e-7") String(0.0000008) => "8e-7"
parseInt( false, 16 );      // 250 ("fa" 来自于 "false") String(false) => "false"，截取到fa，因为l不在16进制范围内，返回fa
parseInt( parseInt, 16 );   // 15  ("f" 来自于 "function..") String(parseInt) => "function.."

parseInt( "103", 2 );       // 2 截取到10，因为3不在2进制范围内，返回2

// ----------------------------分割线----------------------------

parseInt(" 100") // 100 `parseInt`会忽略前后空格
parseInt(" -17 ", 10) // -17 `parseInt`会忽略前后空格

// ----------------------------分割线----------------------------

parseInt("F", 17) // 15
parseInt("F", 16) // 15

parseInt("1100", 2) + parseInt("1100", 3) // 48 = 12 + 36

// ----------------------------分割线----------------------------

parseInt("100", 0) // 100
parseInt("100", 1) // NaN
parseInt("100", 37) // NaN

// ----------------------------分割线----------------------------

parseInt('0b10') // 0 parseInt 不认识字符串的"0b" 二进制前缀，只解析到 "b" 前面的 0。
parseInt(0b10) // 2 0b10 是一个数字字面量，非严格模式下，会被解析为二进制数，所以0b10 = 1 * 2^1 = 2

parseInt('0o21') // 0 parseInt 不认识字符串的"0o" 八进制前缀，只解析到 "o" 前面的 0。
parseInt(0o21) // 17 0o21 是一个数字字面量，非严格模式下，会被解析为八进制数，所以0o21 = 2 * 8^1 + 1 * 8^0 = 17

parseInt(0x10) // 16 0x10 是一个数字字面量，非严格模式下，会被解析为十六进制数，所以0x10 = 1 * 16^1 + 0 * 16^0 = 16
parseInt( "0x10" );         // 16 ("10" 来自于 "0x10") 字符串以 "0x" 或 "0X" 开头，parseInt 会自动将其解释为十六进制数，相当于使用基数 16。截取掉0x，使用10进行解析，返回16。10 = 1 * 16^1 + 0 * 16^0

parseInt(021) // 17 021 是一个数字字面量，非严格模式下，会被解析为八进制数，所以021 = 2 * 8^1 + 1 * 8^0 = 17
parseInt("021") // 21 '021' 是一个字符串，parseInt 函数在解析字符串时，会忽略前导零。
```


## 补充知识：
- 0b开头：二进制数
- 0开头/0o开头：八进制数
- 0x开头：十六进制数
