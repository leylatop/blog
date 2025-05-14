---
slug: /note/ant-design-table-component-header-fixed-principle
title: Ant-Design Table 组件头部固定原理
---
- 在线demo地址： https://ant.design/components/table-cn#components-table-demo-fixed-header
- 表现形式：表头固定，滚动条从表体开始，但表头每列宽度和表体一致，在有滚动条的前提下也一致；
- 原理是：
	- 表头为一个表格，表体为一个表格；
	- 表头的表格列数，比表体表格列数多出一列
	- 表体表格的容器设置overflow-y为scroll，即时达不到滚动的条件也设置为scroll，这样在表体的右侧，就会有一个空滚动条进行占位；
	- 在表头表格的最右侧，留出一个空白的单元格，单元格的宽度为滚动条的宽度；
	- 这样就能保证上下容器是一样宽的；
	- 其他列的宽度使用 colgroup和 col进行动态设置
