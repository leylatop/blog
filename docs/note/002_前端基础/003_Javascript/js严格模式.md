js 严格模式会在文件的开头标明
```js
'use strict'
```

与严格模式相反的模式为宽松模式，也叫懒惰模式

在严格模式下：
1. 禁止自动或隐式创建全局变量

在宽松模式下：
1. 给变量 `a` 赋值，如果变量`a is not defined` ，则会自动创建一个全局变量 `a`

`ReferenceError` 和 `TypeError` 的区别：
ReferenceError 同作用域判别失败相关，而 TypeError 则代表作用域判别成功了，但是对 结果的操作是非法或不合理的。

