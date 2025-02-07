
1. this.hooks.program.call(ast)
	1. 先遍历program根，如果代码里有import或export语句，就会向index.js 添加一个抽象的依赖，`HarmonyCompatobilityDependency`，用于在生成模块代码的时候添加一行代码标识该模块为原生的esmodule模块
2. this.blockPreWalkStatements(ast.body)：遍历导入导出模块
	1. this.hooks.import.call => 触发 **HarmonyImportDependencyParserPlugin** 插件中的parser.hooks.import.tap("HarmonyImportDependencyParserPlugin", callback)中的callback
		1. 添加 `ConstDependency` 到抽象依赖，在生成代码时候，删除import语句
		2. 再添加 `HarmonyImportSideEffectDependency` 到普通依赖，用于在生成代码的时候，插入var xxx = require('xxx')代码 ，用于将esmodule语法，转换成commonjs语法。webpack只能导出commonjs。
		3. 加入到抽象依赖不会递归遍历，加入到普通依赖对象中的依赖，会递归遍历并编译
	2. this.hooks.importSpecifier.call 触发 **HarmonyImportDependencyParserPlugin** 插件中的parser.hooks.importSpecifier.tap('HarmonyImportDependencyParserPlugin', callback)中的callback
		1. 调用 parser.tagVariable，使用new VariableInfo()创建import语句对应的info，存储到 this.scope.definitions中，记录全局作用域中，模块的组成部分，以及来源自哪个模块，以及用于在全局作用域中使用新的变量名称替换旧的变量名称，比如使用esmodule导入其他模块，在编译成commonjs后，要添加xxx.default
4. this.walkStatements(ast.body)：继续遍历整个文件的语句
	1. 如果是变量，需要走到 walkIdentifier 中，调用callHooksForName，调用 getVariableInfo，获取VariableInfo，getVariableInfo内部使用了this.scope.definitions，如果变量名在defintions中存在，说明是外部引入进来的，否则是模块内部的局部变量。
	2. 在callHooksForInfoWithFallback 触发hook.call，触发 **HarmonyImportDependencyParserPlugin** 插件中 的parser.hooks.expression.for(harmonySpecifierTag).tap("HarmonyImportDependencyParserPlugin",callback)中的callback。
	3. 如果是引入的外部变量，会在callback创建一个`HarmonyImportSepeifierDependency` 依赖，放到抽象依赖中。如果是外部引入进来的，会在生成代码的时候，把变量名改掉。
5. this.walkStatements(ast.body)：继续遍历整个文件的语句
	1. 如果是导出，需要走到walkExportDefaultDeclaration，重点调用 this.hooks.export.call 和 this.hooks.exportExpression.call的callback
	2. 在 this.hooks.export.call  的回调中，会触发 **HarmonyExportDependencyParserPlugin**中的this.hooks.export.tap的回调，添加 `HarmonyExportHeaderDependency`抽象依赖，删除export default，只剩值，比如export default 'xxx'，只剩下 'xxx'
	3. this.hooks.exportExpression.call 的回调中，会触发  **HarmonyExportDependencyParserPlugin** 中的this.hooks.exportExpression.tap的回调，添加 `HarmonyExportExpressionDependency` 抽象依赖。将'xxx' 封装成 `const webpackDefaultExport = 'title'`，再添加导出定义，完成esmodule => commonjs的整个流程
```js
webpackRequire.d(webpackExports, {
    "default": () => webpackDefaultExport
});
```

---

总结：
1. esmodule转commonjs共涉及6个依赖：
	- HarmonyCompatibilityDependency
	- ConstDependency
	- HarmonyImportSideEffectDependency
	- HarmonyImportSpecifierDependency
	- HarmonyExportHeaderDependency
	- HarmonyExportExpressionDependency

2. 导入和解析语句用到的依赖及其功能：
```js
let oldCode = `
import title from './title';
console.log(title);
`;


//1. HarmonyCompatibilityDependency
let oldCode1 = `
webpackRequire.r(webpackExports);
import title from './title';
console.log(title);
`;


//2. ConstDependency
let oldCode2 = `
webpackRequire.r(webpackExports);
console.log(title);
`;


//3. HarmonyImportSideEffectDependency
let oldCode3 = `
webpackRequire.r(webpackExports);
var _titlewebpackImportedModule0 = webpackRequire("./src/title.js");
console.log(title);
`;

//4. HarmonyImportSpecifierDependency
let oldCode4 = `
webpackRequire.r(webpackExports);
var _titlewebpackImportedModule0 = webpackRequire("./src/title.js");
console.log(_titlewebpackImportedModule0.default);
`;
```

3. parse解析语句的关键的方法：
在JavaScript解析器中，`preWalkStatement`、`blockPreWalkStatement` 和 `walkStatement` 是用于遍历和处理不同类型的语句的函数。它们的作用如下：

1. **`preWalkStatement`**:
   - 这个函数用于在遍历语句之前进行预处理。它通常用于收集变量声明、函数声明等信息，以便在实际遍历语句时可以使用这些信息。
   - 适用于所有类型的语句，包括块语句、循环语句、条件语句等。

2. **`blockPreWalkStatement`**:
   - 这个函数专门用于处理块级作用域内的语句。它通常用于处理块级作用域中的变量声明，例如 `let` 和 `const`。
   - 适用于块级作用域的语句，如 `ImportDeclaration`、`ExportDeclaration`、`ClassDeclaration` 等。

3. **`walkStatement`**:
   - 这个函数用于实际遍历和处理语句。它会根据语句的类型调用相应的处理函数。
   - 适用于所有类型的语句，负责执行语句的具体逻辑处理。

这三个函数通常在解析器中配合使用，以确保在解析 JavaScript 代码时能够正确处理不同类型的语句和作用域。
