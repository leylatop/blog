---
slug: /note/es6-string
title: ES6-字符串
---
#### 字符的Unicode标识，可以将码点放入大括号

```javascript
var str = '\u0061'
var str = '\u0061\u0062'
var str = '\u{00222}'
```

#### 字符串的遍历

```javascript
for(let codePoint of 'STR') {
    console.log(codePoint);
    // "f"
    // "o"
    // "o"
}
```
#### 模板字符串

模板字符串，是增强版的字符串，用`标识，可以定义多行字符串

```javascript
// 普通字符串
`In JavaScript '\n' is a line-feed.`

// 多行字符串（所有的空格和缩进都会被保留在输出之中，如果不想要可以使用trim()方法去掉空格）
`In JavaScript this is
 not legal.`

// 字符串中嵌入变量，需要将变量放在${}之内
let name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`

```


字符串中嵌入变量时，将变量放在${}之中；

${}内可以放任意的表达式，变量，调用函数，对象属性，若是对象，则会自动调用对象的toString方法将对象转化成字符串；

${}内不可以放没有声明的变量；

模板字符串可以嵌套；

如果在字符串中使用`，则在`前面加反斜杠进行转义；

```javascript
let greeting = `\`Yo\` World!`;
```

#### 模板字符串调用函数

模板字符串可以放在一个函数的后面，调用这个函数，函数参数为模板字符串；

```javascript
alert`123`
// 等同于
alert(123)
```

如果模板字符串中有变量，则先将模板字符串处理成多个参数，再调用函数；

```javascript
let a = 5;
let b = 10;

tag`Hello ${ a + b } world ${ a * b }`;
// 等同于
tag(['Hello ', ' world ', ''], 15, 50);

```

tag方法的第一个参数是一个数组，数组成员是模板字符串中没有变量替换的部分，变量替换只发生在数组第一个成员和第二个成员之间，第二个成员和第三个成员之间，以此类推；  
rag方法的其他参数都是模板字符串中的变量值。
