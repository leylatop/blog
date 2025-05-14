---
slug: /note/electron-preload-script
title: Electron 预加载脚本
---
- 预加载脚本：网页加载到浏览器窗口之前运行的代码；
- 预加载脚本功能
	- 通过 `contextBridge` API 向渲染器公开特权API
	- 设置进程间通信（IPC）接口，以便主进程（Electron）和渲染进程（渲染dom页面）之间传递任意消息
- [参考资料](https://electron.nodejs.cn/docs/latest/tutorial/tutorial-preload)
