---
slug: /note/css-hover-and-active-border-size-change
title: css 实现hover时边框为1px，active时边框为2px
---
- 使用outline+outline-offset改变“border”的大小，但不改变原来的宽度
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
	<style>
		div {
			width: 100px;
			height: 100px;
			margin: 10px;
			border: 1px solid transparent;
		}
		
		div:hover {
			border: 1px solid #00f;
		}
		
		div:active {
			border: 1px solid #f00;
			outline: 1px solid #f00;
			outline-offset: -2px; // offset向里便宜2px
		}
	</style>
</head>
<body>
	<div></div>
</body>
</html>
```
