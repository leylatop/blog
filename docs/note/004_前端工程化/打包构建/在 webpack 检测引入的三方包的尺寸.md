---
slug: /note/check-the-size-of-the-third-party-package-introduced-in-webpack
title: 在 webpack 检测引入的三方包的尺寸
---
- webpack-stats-plugin 插件：
	- 用于生成 `webpack` 构建的统计信息。可以为程序生成有用的性能分析数据，例如文件大小、构建时间、资源使用率和依赖关系等。
	- 使用插件时，在 `webpack` 的 `plugins` 引入 `webpack-stats-plugin` 的 `StatsWriterPlugin` 方法，并使用 `filename` 参数制定要输出的构建信息的路径、文件名、文件类型。若未指定路径，则文件默认存放于 `webpack` 的输出目录下。
- webpack-bundle-analyzer 插件：
	- 用于生成代码分析报告，帮助提升代码质量和网站性能。
	- 将 webpack-stats-plugin 生成的文件，导入至该插件，会自动打开分析界面，[详情可参考](https://juejin.cn/post/6844903825216651271)
