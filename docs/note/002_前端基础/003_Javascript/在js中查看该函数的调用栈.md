---
slug: /note/view-the-call-stack-of-the-function-in-js
title: 在js中查看该函数的调用栈
---
在函数中输入这个，就可以查看调用该函数的方法
```javascript

const error = new Error();
const stack = error.stack;
const caller = stack.split('\n')[2].trim();
console.log(`调用函数或文件是：${caller}`);

```
