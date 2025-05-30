---
slug: /note/javascript-engine-execution-steps
title: JavaScript 引擎执行代码的主要步骤
---

1. 词法分析（Lexical Analysis）
- 将源代码文本分解成一个个的 token（记号）
- 识别关键字、标识符、运算符、括号等基本语法单元
- 例如 `let x = 1` 会被分解为 `let`(关键字)、`x`(标识符)、=(运算符)、`1`(数字字面量)

2. 语法分析（Parsing）
- 将 token 序列转换成抽象语法树（AST）
- 检查代码的语法结构是否正确
- 生成的 AST 表示了代码的层次结构和语法关系

3. 预编译
- 创建执行上下文（Execution Context）
- 创建变量对象（Variable Object）/活动对象（Activation Object）
- 建立作用域链（Scope Chain）
- 确定 this 指向

4. 字节码生成（Bytecode Generation）
- 将 AST 转换成字节码
- 字节码是介于源码和机器码之间的中间代码
- 比源码更容易被机器执行，比机器码更容易跨平台

5. 解释/编译执行
- 解释器（Interpreter）直接执行字节码
- 热点代码（Hot Code）会被即时编译器（JIT Compiler）编译成机器码
- 采用混合模式提高执行效率：
  - 首次执行使用解释器快速启动
  - 频繁执行的代码使用 JIT 编译优化

6. 优化执行
- 类型推断和特化
- 内联缓存（Inline Caching）
- 死代码消除
- 循环优化
- 逃逸分析

7. 运行时支持
- 垃圾回收（Garbage Collection）
- 内存管理
- 调用栈管理
- 异常处理

这个过程中的一些关键概念：

- V8 等现代 JS 引擎会采用惰性编译策略，即函数在第一次被调用时才会被完整编译
- 使用多层编译（Tiered Compilation）策略，根据代码热度选择不同的优化级别
- 支持去优化（Deoptimization）机制，当优化假设失败时回退到解释执行
- 运行时收集类型信息和执行频率信息，指导优化决策
