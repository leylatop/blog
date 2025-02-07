#### 对象方法

##### fromCodePoint

根据Unicode码点实例化一个字符串，用来支持处理Unicode码点大于0xFFFF的字符，Unicode码点大于0xFFFF的字符需要4个字节进行存储；如果String.fromCodePoint方法有多个参数，则它们会被合并成一个字符串返回。

```javascript
String.fromCodePoint(0x20BB7)
// "𠮷"
```

##### raw

方法raw，转义\，转义成\\（一变二，二变四）；raw也可以做普通方法使用，第一个参数必须是对象，且对象含有raw属性，属性值必须是数组（可迭代的字符串）。

```javascript
String.raw `hello`
//hello
String.raw `Hi\n${2+3}!`   
// Hi\\n5!
String.raw({raw: 'test'})
//test
String.raw({ raw: 'test' }, 0, 1, 2);
//t0e1s2t
String.raw({ raw: ['t','e','s','t'] }, 0, 1, 2);
//t0e1s2t
```

#### 实例方法

##### codePointAt

返回字符串指定下标的字符的Unicode码点，在js内部，字符以UTF-16格式存储，一个字符固定占用2个字节，但是Unicode码点大于0xFFFF的字符需要4个字节进行存储，js就会认为这个字符是两个字符；string.length为2；对于codePointAt()方法会正确返回 32 位的 UTF-16 字符的码点。

```javascript
'string'.codePointAt(3)
// 返回i的Unicode码点
```

##### includes startsWith endsWith

includes() 字符串中是否包含参数，返回布尔类型；  
startsWith() 字符串是否以参数开头，返回布尔类型；  
endsWith() 字符串是否以参数结尾，返回布尔类型；  
三个方法都可以传入第二个参数，第二个参数表示开始的位置，endsWith的第二个参数表示结束的位置。

```javascript
let s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true
let s = 'Hello world!';

s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false

```
##### repeat

repeat() 重复字符串，参数为重复的次数；若为小数，则向下取整；若为负数或Infinity，则报错；若为字符串，则转化成数字。

```javascript
ab.repeat(3);
//ababab

```
##### padStart padEnd

字符串补全功能，如果字符串长度不够，则在尾部或头部补全，方法接收两个参数，第一个参数为补全后字符串的长度，第二个参数为要补全的内容；  
若补全后字符串长度小于当前字符串的长度，则不进行补全；  
若要补全的内容+原字符串 > 最终字符串长度，则截取要补全的内容+原字符串；  
若第二个参数未定义，则使用空格进行补全；

```javascript
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'

'abc'.padStart(2, 'x') // 'abc'
'abc'.padStart(10, '0123456789')
// '0123456abc'

'x'.padStart(4) // '   x'
'x'.padEnd(4) // 'x   '
```

##### trimStart trimEnd

trimStart() 消除头部的空格，对tab 键、换行符等不可见的空白符号也有效  
trimEnd() 消除尾部的空格，对tab 键、换行符等不可见的空白符号也有效