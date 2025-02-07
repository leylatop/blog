## 常见类型
css 中常见的媒体类型有以下几种：

### 1. screen 媒体类型
对应计算机显示器、手机屏幕等显示设备 
这是我们最常用的,因为用户主要通过屏幕查看网页

```css
/* 只在屏幕设备上应用的样式 */
@import url("screen.css") screen;

/* 或者使用 @media 方式 */
@media screen {
  body {
    background-color: white;
    font-size: 16px;
  }
  /* 适合阅读的链接样式 */
  a {
    color: blue;
    text-decoration: underline;
  }
}
```

### 2. print（打印）
1. 确实是指实体打印机打印成纸质文档时的样式，在以下两种场景会生效:
- 用户点击浏览器的打印功能,在打印预览时
- 实际发送到打印机打印时

```css
/* 打印样式 */
@import url("print.css") print;

@media print {
  /* 隐藏不需要打印的元素 */
  .no-print, 
  .navigation,
  .footer {
    display: none;
  }
  
  /* 确保文本颜色为黑色，以节省墨水 */
  body {
    color: black;
    background: none;
    font-size: 12pt; /* 打印时使用 pt 单位 */
  }
  
  /* 显示链接的 URL */
  a[href]:after {
    content: " (" attr(href) ")";
  }
  
  /* 分页控制 */
  .new-page {
    page-break-before: always;
  }
  
  /* 避免元素被分页 */
  .keep-together {
    page-break-inside: avoid;
  }
}
```

### 3. speech 媒体类型
对应语音合成器这类辅助设备  
用于帮助视障人士浏览网页时的语音输出

### 4. all 媒体类型
表示适用于所有设备类型  


## 媒体类型重要性
在实际开发中,这种硬件设备的对应关系主要体现在:
1. 打印优化
```css
@media print {
  /* 隐藏不必要打印的内容 */
  nav, footer, button { display: none; }
  
  /* 确保文字是黑色的,节省彩色墨水 */
  body { color: black; }
  
  /* 添加页面分隔符 */
  h1 { page-break-before: always; }
}
```

2. 响应式设计
```css
@media screen and (max-width: 768px) {
  /* 手机屏幕上的样式 */
}

@media screen and (min-width: 1200px) {
  /* 大显示器上的样式 */
}
```

### 现代开发建议

1. 现代开发中，我们更常用的是响应式设计的媒体查询：

```css
@media (max-width: 768px) {
  /* 移动端样式 */
}

@media (min-width: 769px) and (max-width: 1024px) {
  /* 平板样式 */
}

@media (min-width: 1025px) {
  /* 桌面样式 */
}
```