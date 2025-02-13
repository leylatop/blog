<!-- ![下载此文档](http://images.leyla.top/note/IMG_7629.png) -->
## 基础
1. 字体由 **顶线、中线、基线、底线**组成；
2. 顶线到底线的距离，是**内容区域**；
3. 内容区域 + 内容区域上下对称的空白区域，是**行高**；
4. 上一行的底线，到下一行的顶线，之间的距离，是**行距**；
5. 行内框：行高指定的高度；
6. 行框：本行内若有元素行内框最大的值；
## vertical-align
1. 设置元素内部的子元素，在垂直方向的对齐方式，设置在子元素身上，且不会继承；
2. 语法：baseline | sub | super | top | text-top | middle | bottom | text-bottom | 百分比 | 长度 | inherit
3. **参数：**
	- baseline： 基线对齐；
	- sub： 下标显示；
	- super： 上标显示；
	- top： 顶端对齐；
	- text-top： 文本的顶端对齐；
	- middle： 中部对齐；  _//__没有研究透的属性_
	- bottom： 底端对齐；
	- text-bottom：   文本的底端对齐；
	- 百分比和长度： CSS2，可为负数。
	- **初始值：** baseline
4. **基线对齐（** **vertical-align : baseline** **）**
	- 基线对齐（vertical-align : baseline）使元素的**基线**同基准元素（取行高最高的作为基准）的**基线**对齐
5. **顶端对齐（** **vertical-align : top** **）**
	- 顶端对齐（vertical-align : top）是将元素的行内框的**顶端**与行框的**顶端**对齐
6. **文本顶端对齐（** **vertical-align : text-top** **）**
	- 文本顶端对齐（vertical-align : text-top）是将元素行内框的**顶端**同父元素文本的**顶线**对齐（可能会把**行框**撑高）
7. **底端对齐（** **vertical-align : bottom** **）**
	- 底端对齐（vertical-align : bottom）是将元素的行内框的**底端**与行框的**底端**对齐
8. **文本底端对齐（** **vertical-align : text-bottom** **）**
	- 文本底端对齐（vertical-align : text-top）是将元素行内框的**底端端**同父元素文本的**底线**对齐（可能会把**行框**撑高）
9. **中间对齐（** **vertical-align : middle** **）**
	- 中间对齐（vertical-align : middle）通常使用在图片上，将图片的垂直方向的**中线**与文本行的**中线**对齐。（对于文字的处理有些偏差）
10. 上标和下标
	- 上标（vertical-align:super）使元素的**基线**相对于基准元素的**基线**升高，下标（vertical-align:sub）使元素的基线降低，移动的幅度CSS规范中没有规定，由浏览器来决定。
链接：
[## 我对CSS vertical-align的一些理解与认识](https://www.zhangxinxu.com/wordpress/2010/05/%E6%88%91%E5%AF%B9css-vertical-align%E7%9A%84%E4%B8%80%E4%BA%9B%E7%90%86%E8%A7%A3%E4%B8%8E%E8%AE%A4%E8%AF%86%EF%BC%88%E4%B8%80%EF%BC%89/)
[# vertical-align属性测试实验面板](https://www.zhangxinxu.com/study/201005/verticle-align-test-demo.html)
[深入理解css行高](https://developer.aliyun.com/article/330933)