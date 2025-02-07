- 容器属性：
	- grid-template-columns：定义列的宽度
	- grid-template-rows：定义行的高度
	- grid-template-areas：定义区域
		- grid-template-areas: 'a b c'
				                       'd e f'
				                       'g h i'
	- grid-auto-flow：
		- row：先行后列；
		- column：先列后行；
		- row dense： 先行后列，尽可能紧密填满，尽量不出现空格
		- column dense：先列后行
	- justify-item: 设置单元格内容的水平位置
		- start
		- center
		- end
		- stretch：拉伸，占满（默认）
	- align-items: 设置单元格内容的垂直位置
		- start
		- center
		- end
		- stretch：拉伸，占满（默认）
	- place-items：设置单元格内容的垂直位置和水平位置，垂直在前，水平在后
	
	
	- justify-content: 设置整个内容区域的水平位置
		- start
		- center
		- end
		- stretch: 项目大小没有指定时，拉伸占据整个网格容器
		- space-around：每个项目两侧的间隔相等相等（项目之间的间隔:项目与容器边框间隔 = 2 ：1）
		- space-evenly：项目与项目之间的间隔，与项目与容器边框之间的间隔相等（项目之间的间隔：项目与容器边框间隔 = 1 ： 1）
		- space-between：项目与项目的间隔相等，项目与容器边框之间没有间隔；
	- align-content：设置整个内容区域的垂直位置
	- place-content：设置整个内容区域的垂直区域和水平位置，垂直在前，水平在后
	- grid-auto-columns: 设置浏览器自动创建的多余网格的列宽
	- grid-auto-rows:设置浏览器自动创建的多余网格的行高
- 项目属性：
	- grid-row-start：设置项目的开始位置在第几根水平线上，还可以指定为网格线的名字，还可以使用span关键字，表示跨越
	- grid-row-end：设置项目的结束位置在第几根水平线上
	- grid-coumn-start: 设置项目的开始位置在第几条垂直线上
	- grid-coumn-end: 设置项目的结束位置在第几条垂直线上
	- grid-column: 是grid-column-start 和 grid-column-end的合并简写, 中间加 /
	- grid-row: 是grid-row-start 和 grid-row-end的合并简写，中间加 /
	- grid-area: 指定项目放在哪个区域，区域名对应 grid-template-areas；还可用作grid-row-start、grid-column-start、grid-row-end、grid-column-end的合并简写;
	- justify-self：设置单元格内容的水平位置，跟justify-items属性的用法完全一致，但只作用于单个项目；
	- align-self：属性设置单元格内容的垂直位置，跟align-items属性的用法完全一致，也是只作用于单个项目
	- place-self：是align-self属性和justify-self的简写

- 参考地址： https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html