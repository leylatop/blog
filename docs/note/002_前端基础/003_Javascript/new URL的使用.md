---
slug: /note/new-url-usage
title: new URL 的使用
---
## 基本使用及问题
new URL() 前面的 "new "表示它是一个构造函数：调用它可以为你创建一个新的 URL 实例；但是如果传入的参数是非法的url，她就会抛出错误。

```js
const urlstring = "this is not a URL"; 
const not_a_url = new URL(urlstring); 
// Uncaught TypeError: URL constructor: "this is not a URL" is not a valid URL.
```


## 解决方案
### 1. try...catch
```js
const urlstring = "this is not a URL";
let not_a_url;

try {
   not_a_url = new URL(urlstring);
} catch {
  // we catch and ignore the error
  // not_a_url is already undefined so no need to actually do anything.
}
```

- 缺点：代码行数增多，`not_a_url` 变为使用 `let` 声明的变量、控制流程复杂

### 2. URL.canParse()
```js
const urlstring = "this is not a URL";
const not_a_url = URL.canParse(urlstring) && new URL(urlstring);
// not_a_url = false

```

- 缺点：`not_a_url`的值不再是字符串、兼容性差

### 3. URL.parse
```js
const urlstring = "this is not a URL";

const not_a_url = URL.parse(urlstring);
// not_a_url = null

```

- 缺点：兼容性差



[参考资料](https://kilianvalkhof.com/2024/javascript/the-problem-with-new-url-and-how-url-parse-fixes-that/)
#javascript/url 
