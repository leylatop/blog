---
slug: /note/css-solution
title: CSS 解决方案
---
- css in js：解决传统 CSS 的一些问题，如全局命名空间的冲突、依赖管理、复用样式等，并在组件化开发的背景下提供更好的封装和模块化。
	- 设计思路：局部作用域、组件驱动、动态样式、依赖追踪、服务器渲染
	- 框架举例：[styled-component](https://styled-components.com/)
- css module：基于组件和更高级别的抽象
	- [bootstrap](https://getbootstrap.com/)
- css 原子化：基于更低级的原子级别的框架
	- [Tailwind CSS](https://tailwindcss.com/)、[open-props](https://open-props.style/)


================================================================
Tailwind 和 bootstrap区别：
- Tailwind CSS 和 Bootstrap 在外观上可能看起来有些相似，因为它们都使用类名来应用样式；
- Tailwind CSS 和 Bootstrap 都实现了一些实用工具类，例如 .text-center 用于文本居中，和间距工具类（如 .mt-4）用于应用边距；
- Bootstrap 设计理念是基于组件和更高级别的抽象，Tailwind CSS 鼓励开发者在创建界面时从零开始，使用原子级别的实用工具类来一步一步构建样式。
