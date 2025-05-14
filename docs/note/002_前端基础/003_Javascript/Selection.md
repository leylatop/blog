---
slug: /note/selection
title: Selection
---
获取用户选择的文本范围，或者插入符号的位置
```javascript
window.getSelection() 
document.getSelection()
```

- 属性

	- anchor： 按下鼠标的位置（锚点）
	- focus：松开鼠标的位置（焦点）
	- anchorNode：按下鼠标时，鼠标所在node信息
	
	- focusNode： 松开鼠标时，鼠标所在node信息
	
	- focusOffset: 选区终点在 focusNode 中的位置偏移量
	
	- isCollapsed： 起点终点是否一致
	
	- type: 'None' | 'Range' | 'Caret'(已经被折叠)

  

- 方法
	* addRange(range): 将一个区域，增加到选区里面
	
	* collapse(parentNode, offset): 折叠当前选区到一个点; 更改选区/光标位置
	
	* collapseToEnd(): 折叠选区，并把鼠标定位在原来选区的末尾处
	
	* collapseToStart()：折叠选区，并把鼠标定位在原来选区的开始处
	
	* containsNode(aNode, aPartlyContained)：判断指定节点是否(完全)被包含在选区内
	
	* deleteFromDocument()
	
	* empty: 将选中区域设置为空
	
	* extend(node, offset)：移动选中区到新的位置
	
	* modify('move'|'extend', 'forward' | 'backward' | 'left' | 'right', 'character'|'word'|'sentence'|'line'|'paragraph'|'lineboundary'|'sentenceboundary'|'paragraphboundary'|'documentboundary'):  通过简单的文本命令来改变当前选区或光标位置
	
	* removeAllRanges(): 移除所有range对象
	
	* removeRange(range): 移除某个range对象
	
	* selectAllChildren(parentNode): 将所有子元素设置为选中区域（全选文本功能）
	
	* setBaseAndExtent(anchorNode,anchorOffset,focusNode,focusOffset)：将起始节点中间的设置为选中区域
	
	- getRangeAt(0):  获得一个range对象
	
	- toString(): 获得选区的纯文本
