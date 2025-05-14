---
slug: /note/adobe-xd-plugin-development
title: Adobe XD 插件开发
---
Adobe XD提供了一些内置模块供插件端直接调用，插件端可以调用这些API与XD进行交互：
```
scenegraph: 获取当前文档的画板信息，以及画板上的元素信息
application: 用于获取当前文档信息
uxp: 用于获取当前插件信息
clipboard: 用于复制粘贴
viewport：用于访问和操作XD文档中的视口
selection：用于访问和操作XD文档中的选择内容
```

所以插件端的开发及运行都需要在XD中运行。

