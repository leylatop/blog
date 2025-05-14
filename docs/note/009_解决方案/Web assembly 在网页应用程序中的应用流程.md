---
slug: /note/web-assembly-application-process-in-web-page-application
title: Web assembly 在网页应用程序中的应用流程
---
- 基础流程
	1. 编写 底层语言代码（c/c++/rust）
	2. 编译底层代码为 wasm 文件（[编译网站](https://mbebenita.github.io/WasmExplorer/)）
	3. 编写 js 代码，使用 fetch 引入wasm文件
	4. 编写html代码，引入js文件
	[参考地址](https://xie.infoq.cn/article/0bb5ff2fa5d5d9db492c88a4c)


- AssemblyScript
	- AssemblyScript 是一种类似 TypeScript 的编程语言，可以将 TypeScript 代码编译为 WebAssembly 模块；开发人员能够使用 TypeScript 编写 WebAssembly 模块。
	- 所以，JavaScript 代码可以转换为 TypeScript 代码，然后使用 AssemblyScript 将 TypeScript 代码编译为 WebAssembly 模块，最终在 JavaScript 或 TypeScript 中使用；
	- 具体流程如下：
		1. 将 JavaScript 代码转换为 TypeScript 代码：可以使用 TypeScript 编辑器或转换工具将 JavaScript 代码转换为 TypeScript 代码。
		2. 使用 AssemblyScript 将 TypeScript 代码编译为 WebAssembly 模块：可以使用 AssemblyScript 编译器将 TypeScript 代码编译为 WebAssembly 模块，输出为 .wasm 文件。
		3. 在 JavaScript 或 TypeScript 中加载和调用 WebAssembly 模块：可以使用 JavaScript 或 TypeScript 的 WebAssembly API 加载和实例化 WebAssembly 模块，然后调用模块中的函数。
[参考地址](https://juejin.cn/post/6844903661982728200)

- confluence文档： https://confluence.300624.cn/pages/viewpage.action?pageId=921999161
