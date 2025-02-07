
思路：
- 原代码：使用svg渲染的实现、虚线
- bug：在Electron低分屏时，用户会调整缩放比，导致drp发生改变，出现实现或虚线不显示的情况
- dpr 指 window.devicePixelRatio，可以使用 2k 屏幕，调整系统缩放比例，调整 chrome 页面的缩放来改变；
解决方式：
1. 使用 zoom 将非整数 dpr 调整至最近的整数倍数，避免渲染的问题。zoom 属性可以用于 html 级别，  或者 element 级别，涉及 dpr 的计算需要额外处理 zoom 的影响，zoom: 1/window.devicePixelRatio
2. 参照解决方式1，将调整zoom，改为调整transform:scale值，并根据实际情况调整transform-origin位置，好处是不占空间
3. 将svg渲染改为使用css绘制：css使用border直接写会与UI样式有出入，所以使用background-image手动实现
<!-- ![图片](../../../asset/Pastedimage20240308120112.png) -->


将svg渲染改为使用css绘制方法如下：
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>

<style>
svg {
	width: 43px;
	height: 1px;
	display: block;
	margin: 50px auto 2px;
}

  
.css {
	width: 43px;
	height: 1px;
	margin: 0 auto 50px;
}

  

.solid {
	background-image: linear-gradient(to right, black 0%, black 100%, transparent 0%);
	background-size: 43px 1px;
	background-repeat: repeat-x;
}

  

.dotted {
height: 1px;
background-image: linear-gradient(to right, black 0%, black 25%, transparent 25%);
background-size: 4px 1px;
background-repeat: repeat-x;
}

  

.dashed {
	height: 1px;
	background-image: linear-gradient(to right, black 0%, black 55%, transparent 55%);
	background-size: 22% 1px;
	background-repeat: repeat-x;
}

</style>
</head>
<body>
<div>
<svg class="svg__StyledSVGIcon-sc-5p68xx-1 gsJViy icon design/bs_solid svg-icon" viewBox="0 0 43 1"><path d="M0 0h80v1H0z"></path></svg>
<div class="css solid"></div>
</div>
<hr>
<div>
<svg class="svg__StyledSVGIcon-sc-5p68xx-1 gsJViy icon design/bs_dotted svg-icon" viewBox="0 0 43 1"><path d="M0 1h1V0H0v1zm4 0h1V0H4v1zm4 0h1V0H8v1zm4 0h1V0h-1v1zm4 0h1V0h-1v1zm4 0h1V0h-1v1zm4 0h1V0h-1v1zm4 0h1V0h-1v1zm4 0h1V0h-1v1zm4 0h1V0h-1v1zm4 0h1V0h-1v1zm4 0h1V0h-1v1zm4 0h1V0h-1v1zm4 0h1V0h-1v1zm4 0h1V0h-1v1zm4 0h1V0h-1v1zm4 0h1V0h-1v1zm4 0h1V0h-1v1zm4 0h1V0h-1v1zm4 0h1V0h-1v1zm4 0h1V0h-1v1z"></path></svg>
<div class="css dotted"></div>
</div>
<hr>
<div>
<svg class="svg__StyledSVGIcon-sc-5p68xx-1 gsJViy icon design/bs_dashed svg-icon" viewBox="0 0 43 1"><path d="M0 1h5V0H0v1zm9 0h5V0H9v1zm10 0h5V0h-5v1zm9 0h5V0h-5v1zm10 0h5V0h-5v1zm9 0h5V0h-5v1zm9 0h5V0h-5v1zm10 0h5V0h-5v1zm9 0h5V0h-5v1z"></path></svg>
<div class="css dashed"></div>
</div>
</body>

</html>
```