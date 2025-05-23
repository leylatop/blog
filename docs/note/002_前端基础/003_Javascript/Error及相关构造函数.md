---
slug: /note/error-and-related-constructor-functions
title: Error及相关构造函数
---
1. 构造函数 Error 表示一个错误对象，当运行时错误产生时，Error 的实例对象会被抛出。Error 对象也可以用来创建自定义的异常对象。
2. Error 对象常常和 throw 语句一起使用，用于创建自定义的异常对象。
3. 创建自定义异常对象主要是为了获得当前执行栈的上下文，上下文信息中包括`函数调用栈`和产生错误的`文件名`、`行号`、`列号`等信息，以便更好地定位错误。
4. 通常错误对象中至少包含两个属性：`name`和`message`，`name`属性表示错误的名称，`message`属性表示错误的描述信息。
5. 错误对象中的属性都是只读的，不可修改。
6. 除Error对象外，还有其他内建的错误对象，如：
  - EvalError：eval 函数错误，通常是 eval 函数的参数不正确
  - SyntaxError：语法错误，通常是代码书写错误
  - ReferenceError：引用错误，通常是变量未定义
  - TypeError：类型错误，通常是数据类型不匹配，比如变量值为 null 或 undefined，但是却要求是对象；要区分变量未定义和变量值为 undefined 的情况
  - RangeError：范围错误，通常是数值超出范围
  - URIErrorEvalError：URI错误，通常是 URI 相关函数的参数不正确
