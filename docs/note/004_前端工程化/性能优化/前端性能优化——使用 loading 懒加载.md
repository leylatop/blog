- 图片懒加载
- 懒加载是一种只加载用户可视区域图片的技术，非可视区域的图片则在需要时才加载。这可以显著减少初始页面加载时间。
- 使用方式
```html
<img src="default.jpg" loading="lazy">
```

相关
- [[前端性能优化——使用 preconnect 预连接]]
- [[前端性能优化——使用 dns-prefetch 预解析]]
- [[前端性能优化——使用 prefetch 预加载]]
- [[前端性能优化——使用 preload 预加载]]
- [[前端性能优化——使用 fetchpriority 提升请求优先级]]