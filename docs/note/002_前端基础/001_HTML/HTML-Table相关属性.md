---
slug: /note/html-table-related-attributes
title: HTML-Table相关属性
---
- colgroup和col都是HTML表格中用来定义列的元素
- colgroup：用于定义表格中一组或多组列的属性，可以包含一个或多个col元素
	- span：指定colgroup元素所包含的列数。
	- width：指定colgroup元素所包含的所有列的宽度。
	- align：指定colgroup元素所包含的所有列的水平对齐方式。
	- valign：指定colgroup元素所包含的所有列的垂直对齐方式。
	- style：指定colgroup元素的样式。
- col元素：用于定义表格中单独的一列的属性，可以设置 span属性，定义col的跨度
	- span：指定col元素所占据的列数。
	- width：指定col元素的宽度。
	- align：指定col元素的水平对齐方式。
	- valign：指定col元素的垂直对齐方式。
	- style：指定col元素的样式。

- th、td的属性，多用于合并单元格
	- rowspan属性：设置单元格占几行，若设置单元格占2行，则第2行里列数要里面也要少一个，不然会被挤出去
	- colspan属性：设置单元格占几列，若单元格占2列，则本行单元格也要少一个，不然也会被挤出去
