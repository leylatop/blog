#### 创建正则表达式规则的四种方法

```
var regex = new RegExp('xyz', 'i');

var regex = new RegExp(/xyz/i);

var regex = new RegExp(/xyz/, 'i');

var regex = /xyz/i;
```

在es5中，RegExp构造函数的两种传参方式：第一种第一个参数是字符串，第二个参数为修饰符；第二种参数是一个正则表达式；

在es6中，RegExp构造函数允许第一个参数为正则表达式时，第二个为修饰符，覆盖正则表达式中的修饰符。

#### 字符串的四个正则方法

```
match()

replace()

search()

split()

```
#### u修饰符

在es6中，新增了一个u修饰符，为了处理码点大于\uFFFF的Unicode字符（也就是说，会正确处理四个字节的UTF-16编码）；\uD83D\uDC2A是一个字符，但是es5不支持四个字节的UTF-16，会将其识别成两个字符，导致第二行代码可以正确匹配到；加了u修饰符之后，es6会将其识别成一个字符。

```
/^\uD83D/u.test('\uD83D\uDC2A') // false
/^\uD83D/.test('\uD83D\uDC2A') // true
```

处理码点大于0xFFFF的Unicode字符时，要加上/u修饰符。

```
var s = '𠮷';

/^.$/.test(s) // false
/^.$/u.test(s) // true
```

若正则表达式是使用大括号表示的Unicode字符，也必须使用/u修饰符才可以识别，不然会被解释为量词。

```
/\u{61}/.test('a') // false
/\u{61}/u.test('a') // true
/\u{20BB7}/u.test('𠮷') // true
```

当使用u修饰符后，所有量词都会正确识别码点大于0xFFFF的Unicode字符。

```
/a{2}/.test('aa') // true
/a{2}/u.test('aa') // true
/𠮷{2}/.test('𠮷𠮷') // false
/𠮷{2}/u.test('𠮷𠮷') // true
```

预定义模式，\S是预定义模式，可以匹配所有非空字符，只有加了u修饰符，它才能正确匹配码点大于0xFFFF的 Unicode 字符。

```
/^\S$/.test('𠮷') // false
/^\S$/u.test('𠮷') // true
```

#### i修饰符

有些 Unicode 字符的编码不同，但是字型很相近，比如，\u004B与\u212A都是大写的K，不加u修饰符，就无法识别非规范的K字符。

```
/[a-z]/i.test('\u212A') // false
/[a-z]/iu.test('\u212A') // true
```

#### RegExp.prototype.unicode 属性

判断正则是否为设置了u属性

  

#### y修饰符

#### RegExp.prototype.sticky 属性

判断正则是否设置了y属性

  

#### RegExp.prototype.flags 属性

查看正则设置的所有属性

  

#### s修饰符

.可以匹配任意单个字符（dotAll模式）

  

#### RegExp.prototype.dotAll 属性

表示该正则表达式是否处在dotAll模式，也就是 是否是s修饰符。

#### 先行断言

```javascript
/x(?=y)/  // x只有在y前面才匹配
/\d+(?=%)/  // 只匹配百分号之前的数字
```

#### 先行否定断言

```javascript
/x(?!y)/  // x只有不在y前面才匹配
/\d+(?!%)/  // 只匹配不在百分号之前的数字

/\d+(?=%)/.exec('100% of US presidents have been male')  // ["100"]
/\d+(?!%)/.exec('that’s all 44 of them')                 // ["44"]
```

#### 后行断言

```javascript
/(?<=y)x/  // x只有在y后面才匹配
/(?<=\$)\d+/ // 只匹配美元符号之后的数字
```

#### 后行否定断言

```javascript
/(?<!y)x/  // x只有不在y后面才匹配
/(?<!\$)\d+/  // 只匹配不在美元符号后面的数字

/(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill')  // ["100"]
/(?<!\$)\d+/.exec('it’s is worth about €90')                // ["90"]

```
#### Unicode属性类

\p\{...\}和\P\{...\} 允许匹配符合Unicode某种属性的所有字符，\P\{…\}是\p\{…\}的反向匹配，即匹配不满足条件的字符。

```javascript
/\p{Script=Greek}/u  // 指定匹配一个希腊字母
\p{UnicodePropertyName=UnicodePropertyValue}  // 指定属性名和属性值

```

对于某些属性，可以只写属性名，或者只写属性值。

```javascript
\p{UnicodePropertyName}
\p{UnicodePropertyValue}

// 匹配所有空格
\p{White_Space}

// 匹配各种文字的所有字母，等同于 Unicode 版的 \w
[\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]

// 匹配各种文字的所有非字母的字符，等同于 Unicode 版的 \W
[^\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]

// 匹配 Emoji
/\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu

// 匹配所有的箭头字符
const regexArrows = /^\p{Block=Arrows}+$/u;
regexArrows.test('←↑→↓↔↕↖↗↘↙⇏⇐⇑⇒⇓⇔⇕⇖⇗⇘⇙⇧⇩') // true
```

#### 具名组匹配

具名组匹配（Named Capture Groups），允许为每一个组匹配指定一个名字，既便于阅读代码，又便于引用。

```javascript
const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj.groups.year; // 1999
const month = matchObj.groups.month; // 12
const day = matchObj.groups.day; // 31
```