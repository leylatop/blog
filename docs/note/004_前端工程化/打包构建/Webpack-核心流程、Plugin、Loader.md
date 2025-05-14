---
slug: /note/webpack-core-process-plugin-loader
title: Webpack-核心流程、Plugin、Loader
---
- webpack构建的核心流程的四个阶段：
	- 初始化阶段：设置参数，加载插件，执行配置的环境和参数，准备好编译器；
	- 构建阶段-make：从入口开始递归地构建依赖图，完成后得到每个模块的源代码；
	- 生成阶段-seal：根据依赖图生成代码块（chunk），再将代码块转换为文件列表，最后生成编译资源（compilation assets）；
	- 写入阶段-emit：将编译资源写入到文件系统
- webpack Plugin 系统：Plugin在Webpack的生命周期中的特定时刻执行任务，以实现各种自定义功能，Plugin在各个阶段被使用。Plugin 的作用有以下：
	- 优化构建或输出的资源
	- 管理公共脚本
	- 创建富文本的项目或应用程序特定的构建任务
	- 执行在加载资源时需要的任务
	- 自定义Webpack的构建过程
- Webpack Loader系统：Loader 主要作用是转换和处理资源文件，Loader主要在**构建阶段（make）** 被使用。Loader的职责有以下：
	- 转换文件内容（例如，将TypeScript转换为JavaScript，将Sass转换为CSS）
	- 将其他类型的文件转换为有效的模块（例如，将图片转换为Base64 URL，将HTML转换为字符串）
	- 使Webpack能够处理非JavaScript文件
