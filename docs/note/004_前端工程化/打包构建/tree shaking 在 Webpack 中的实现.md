---
slug: /note/tree-shaking-in-webpack
title: tree shaking 在 Webpack 中的实现
---
## tree-shaking
tree-shaking，摇掉没有被挂的文件。在打包后的文件中，移除没有被「引用」的模块代码，以此减少打包后的包的体积。

## 实现原理三阶段：
- make构建阶段：收集模块导出变量，并记录到模块依赖关系图 ModuleGraph 中；
- seal生成阶段：遍历模块依赖关系图 ModuleGraph，标记模块是否被引用
- 生成产物时：若模块没有被引用，则在打包文件中删除对应模块

## Webpack 中 Tree Shaking 的实现
- 在 Webpack 中 Tree Shaking 的实现，分为如下步骤：
	- 在 `FlagDependencyExportsPlugin` 插件中根据模块的 `dependencies` 列表收集模块导出值，并记录到 ModuleGraph 体系的 `exportsInfo` 中
	- 在 `FlagDependencyUsagePlugin` 插件中收集模块的导出值的使用情况，并记录到 `exportInfo._usedInRuntime` 集合中
	- 在 `HarmonyExportXXXDependency.Template.apply` 方法中根据导出值的使用情况生成不同的导出语句
	- 使用 DCE 工具删除 Dead Code，实现完整的树摇效果

- [参考资料](https://juejin.cn/post/7019104818568364069)
