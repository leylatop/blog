---
slug: /note/await-and-async
title: await&async
---
- 函数前面若有async关键字，表明函数内部有异步操作；调用该函数，会立即返回一个promise实例；
- async 代替了 Generator 函数的星号（`*`）
- await 代替了 Generator 函数的星号的yield
- async函数自带执行器，无需像 Generator 函数一样手动执行.next
