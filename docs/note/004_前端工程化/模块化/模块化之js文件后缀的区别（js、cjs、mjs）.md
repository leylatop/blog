在开发中，经常能看到有些文件的后缀是.cjs，或.mjs，以.cjs 或 .mjs 为后缀的文件与普通的js文件的区别是什么呢？

在现代开发工具和环境中，在我们创建一个js文件时，js文件同时也是一个模块，可以在js文件中，将当前文件的局部变量导出，其他js（模块）再进行引用，以达到解耦和提升代码复用性的目的。

## `.js`

`.js` 就是普通的js文件，它可以是普通的脚本，也可以是模块文件
在`.js` 作为模块文件时，它处于何种模块系统，取决于配置：
1. 在`Node.js`中，取决于`package.json` 中的`type` 字段；如果`type`字段为`module`，js文件会被当做ES模块（ESM）；如果`type`字段未指定，则被当做CommonJS模块（CJS），如果想在项目中使用 ESM 而不是 CommonJS，请使用以下命令。
```bash
npm pkg set type="module"
```
2. 在浏览器中，.js 可以通过`<script>` 或 `<script type="module" >`执行

## `.mjs`(ES 模块)
`mjs`后缀明确表示这个文件是ES模块（ESM），无论`package.json`中的`type`字段如何配置。

Node.js和浏览器均支持`mjs`，可以使用`import`和`export`语法。

## `.cjs`
`cjs`后缀明确表示这个文件是CommonJS模块，即使`package.json`中的`type`字段设置为`"module"`。

主要用于Node.js，使用`require()`和`module.exports`语法。


## 模块类型总结

| **模块类型**     | **用途/特点**                         | **常用环境**     | **示例**                  |
| ------------ | --------------------------------- | ------------ | ----------------------- |
| **ESM**      | 官方标准模块系统，使用 `import`/`export`     | Node.js, 浏览器 | `import { } from ''`    |
| **CommonJS** | 基于 `require()` 和 `module.exports` | Node.js      | `const x = require('')` |
| **UMD**      | 兼容 CommonJS、AMD 和全局变量             | 浏览器、Node.js  | 通用库                     |
| **AMD**      | 异步模块加载，依赖管理                       | 浏览器          | `define([], function)`  |
| **SystemJS** | 动态模块加载，支持多种模块格式                   | 浏览器、Node.js  | `System.import()`       |
| **IIFE**     | 立即执行函数表达式，独立作用域                   | 早期浏览器        | `(function(){})()`      |
| **Globals**  | 直接暴露全局变量                          | 早期浏览器        | `var MyModule = {}`     |








