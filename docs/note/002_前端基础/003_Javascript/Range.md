文档片段(用于操作选中的文本)

- document.getSelection(): 返回选中的文档片段，即 Selection 对象
- document.createRange(): 创建一个新的文档片段


Selection 对象的属性和方法
- getRangeAt(): 返回选中的range对象
- addRange(): 添加一个range对象到选中的文档片段
- removeAllRanges(): 移除所有range对象
- removeRange(): 移除一个range对象


Range 对象的属性和方法
- startContainer: 返回range的起始容器
- startOffset: 返回range的起始位置
- endContainer: 返回range的终止容器
- endOffset: 返回range的终止位置
- collapsed: 返回range的起始位置和终止位置是否相同
- commonAncestorContainer: 返回range的共同祖先容器
- cloneContents(): 返回range的副本
- extractContents(): 从文档中移除range的内容，并返回该内容
- insertNode(): 在range的起始位置插入一个节点
