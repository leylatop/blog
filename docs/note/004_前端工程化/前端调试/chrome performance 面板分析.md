---
slug: /note/chrome-performance-panel-analysis
title: chrome performance 面板分析
---
1. 分析前提，需要在无痕浏览器进行分析；
2. google 测试页面：[https://googlechrome.github.io/devtools-samples/jank/](https://googlechrome.github.io/devtools-samples/jank/ "https://googlechrome.github.io/devtools-samples/jank/")
3. 重点关注：cpu使用情况、main高危task（执行时间较长，超过50ms）、layout（重排）
4. 调用树call tree可以查看函数调用情况，并且定位到具体的js
5. pre-paint，准备重新绘制，选中这个块，可以在summary中查看调用情况；
