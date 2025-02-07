思路： div + 伪元素实现

1. div设置width + height，position: relative 及渐变效果
```css
div {
	width: 100px;
	height: 100px;
	position: relative;
	background: linear-gradient(180deg, #D6E8FF 0%, rgba(255, 255, 255, 0) 100%);
}
```

2. :before 设置width/height 与 div等宽等高，设置背景图，及绝对定位
```css
:before {
	content: '';
	background-image: url('/mb-dashboard/images2/payment-modal2/payment-ws-2303/background-img.png');
	background-repeat: no-repeat;
	background-position: top center;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
}
```  

3. 将div 其他子元素设置成 相对定位