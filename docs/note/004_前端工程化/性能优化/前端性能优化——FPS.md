- FPS（Frames Per Second）：每秒帧数，指浏览器每秒渲染的帧数，通常情况下，60FPS是流畅的标准，低于60FPS会感觉到卡顿

- FPS 是衡量网页性能优化成效的重要指标之一，FPS 越高，页面渲染越流畅，用户体验越好，可以通过优化代码、减少重绘和回流、合理使用Web动画等方式提高FPS

- 优化FPS
  - 优化 `CSS`: 减少 `CSS` 文件大小，避免使用 `CSS` 表达式、`@import`、`!important` 等属性，减少 `CSS` 选择器的层级，避免使用 `CSS` 动画
  - 合理使用 `Web Worker`：将一些耗时的计算放到 `Web Worker` 中，避免阻塞主线程
  - 避免不必要的 `DOM` 操作：减少 `DOM` 操作次数，合并多次修改 `DOM` 的操作，避免频繁操作 `DOM`，减少页面回流和重绘
  - 利用 `requestAnimationFrame` 代替 `setTimeout` 定时器
  - 慎用 `javascript` 动画
  - 开启硬件加速：通过css 的 `transform`、`opacity`、`filter`、`will-change` 等属性触发硬件加速，使得动画效果由GPU处理，而非 `CPU` 处理；`GPU` 加速可以减少 `CPU` 的工作量，提高页面渲染性

