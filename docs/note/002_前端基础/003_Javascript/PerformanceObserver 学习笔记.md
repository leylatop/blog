基本使用
```javascript
const observer = new PerformanceObserver(entryList => {
	for (const entry of entryList.getEntries()) {
		console.dir(entry);
	}
});

observer.observe({
	entryTypes: ['largest-contentful-paint'] // 这里可以替换其他性能指标
});
```

- 性能指标及其解释：
	- `paint`:  第一次绘制，第一次有内容的绘制；可以近似的理解为是页面首屏加载时间
	- `largest-contentful-paint`：渲染的最大的元素，最大指的是内容最大，而不是尺寸最大；而且统计的是当前屏幕可见内的元素；
	- `first-input`: 用户页面首次交互的时间（鼠标点击 `pointerdown`、键盘输入 `keydown`）
	- `mark&measure`: 用于统计某一段时间线的性能；使用时，需要有两个mark点作为起止点，期间的性能测量就是measure。
- [参考资料](https://www.zhangxinxu.com/wordpress/2023/08/js-performanceobserver-api/comment-page-1/#comment-440560)