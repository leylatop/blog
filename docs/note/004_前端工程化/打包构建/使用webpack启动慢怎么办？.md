---
slug: /note/use-webpack-to-start-slowly-what-should-i-do
title: 使用webpack启动慢怎么办？
---
启动慢的原因：
- 项目规模越来越大；
- 模块（多）：模块多就意味着要构建的文件比较多，随着文件的变多和依赖路径的变深，启动速度势必会变慢；
- 配置：
	- 比如说配置了很多loader
	- 或者配置了要打出sourcemap

解法：
- 找一个webpack的替代方案，vite、rsbuild
- 拆分项目，减少webpack要构建的文件
