---
slug: /note/link-tag-load-font-principle
title: link 标签加载字体原理
---
```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap" rel="stylesheet">

<link rel="stylesheet" href="https://font.sec.miui.com/font/css?family=MiSans:400,500,600:MiSans">
```


当使用 link 标签加载字体时候：
1. 浏览器解析 link 标签，获取到link标签的href
2. 发送http请求到href对应的网站
3. 网站服务器根据link中href对应的url，解析取font-family参数，获取到要返回的字体和字重
4. 服务器返回包含 @font-face 声明的css文件


```css
@font-face {
  font-family: 'MiSans';
  /* 定义字体源文件地址 */
  src: url('https://font.sec.miui.com/font/ttf/MiSans-Regular.ttf') format('truetype'),
       url('https://font.sec.miui.com/font/woff2/MiSans-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
}
```
5. 浏览器接收到服务器返回的css文件，并解析 @font-face 规则
6. 当页面中使用到具体字体时，再次发起HTTP请求获取字体文件
7. 浏览器会根据当前环境支持的字体格式，选择合适的文件下载

优化：
1. 服务器通常会设置字体cache-control，让浏览器缓存字体文件
2. 使用cdn分发字体
3. 服务器可以根据user-agent返回不同格式的字体文件


可以通过浏览器开发工具的 Network 面板观察这个过程：
1. 首先会看到对 CSS 文件的请求
2. 然后是对具体字体文件的请求
3. 可以查看请求头和响应头，了解缓存策略等信息
