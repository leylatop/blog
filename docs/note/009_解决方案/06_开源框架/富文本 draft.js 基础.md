---
slug: /note/rich-text-draft.js-basic
title: 富文本 draft.js 基础
---
# 富文本 draft.js 基础
* EditorState——核心对象，提供了一系列静态方法
	* createEmpty()——创建空的editorState对象
	* createWithContent(contentState)——根据contentState创建EditorState
	* create()——创建空的editorState对象的核心方法，本质上是new EditorState()
- Editor——React组件
	- 初始化时，将创建的空editorState 作为props传给Editor组件，当状态发生变化后，一个全新的editorState会作为onChange 的实参回调回来；

- editorState——EditorState的实例对象，本质上是个immutable类型数据
	* getCurrentContent——获取当前光标所在的位置块对象
	* getSelection——获取当前选中内容对象
	* getCurrentInlineStyle——获取当前光标所在位置行内样式
	* currentContent：  ContentState 对象，存放的是当前编辑器中的内容，称为内容描述对象
	* selection： SelectionState 对象，它是当前选中状态的描述对象
	* redoStack 和 undoStack： 就是撤销/重做栈，它是一个数组，存放的是 ContentState 类型的编辑器状态
* contentState——编辑器的整个内容状态，本质上是个immutable类型数据
	* 创建 contentState：
		* ContentState.createFromText()
		* editorState.getCurrentContent()
	* 包含的信息：
		- 文本内容 
		- 块（Blocks）结构
		- 内联样式
		- 实体（Entities）
		- 选择状态（虽然选择状态通常由 SelectionState 单独管理）
	- 主要方法：
		- `getBlockMap()`: 获取所有内容块的映射
		- `getBlockForKey(key)`: 获取特定键的内容块
		- `getFirstBlock()`, `getLastBlock()`: 获取第一个或最后一个块
		- `getPlainText()`: 获取纯文本内容
		- `getEntityMap()`: 获取实体映射
		- `createEntity()`, `getEntity()`: 创建和获取实体
	- 序列化和反序列化： 
		- 使用 `convertToRaw()` 函数将ContentState 转换为可以存储或传输的原始 JavaScript 对象
		- 使用`convertFromRaw(row)` ，将函数恢复为ContentState

- RichUtils：提供了一组用于常见**富文本编辑操作**的高级方法，直接返回新的 EditorState 对象，直接更新 EditorState。主要API：
	- `toggleInlineStyle(editorState, inlineStyle)`：切换内联样式，使用其他控制形式更改文本样式，可以绑定外部其他的事件
	- `toggleBlockType(editorState, blockType)`：切换块类型
	- `handleKeyCommand(editorState, command)`：监听和处理快捷键命令并且可以在`RichUtils`中进行关联，以应用或者删除期望的样式
	- `onTab(event, editorState, maxDepth)`：处理Tab键事件
	- `getCurrentBlockType(editorState)`：获取当前块类型
	- `toggleLink(editorState, selection, entityKey)`：切换链接
	- `handleNewLine(editorState, event)`：处理换行
	- `insertSoftNewline(editorState)`：插入软换行
	- `tryToRemoveBlockStyle(editorState)`：尝试移除块样式
- Modifier：提供了一系列用于直接修改 **ContentState** 的底层方法，返回新的 ContentState 对象，通常需要与 EditorState.push() 一起使用来更新编辑器状态。主要API：
	- `insertText(contentState, selection, text, ...)`：插入文本
	- `replaceText(contentState, selection, text, ...)`：替换文本
	- `moveText(contentState, removalRange, targetRange)`：移动文本
	- `removeRange(contentState, selectionState, ...)`：删除范围内的内容
	- `splitBlock(contentState, selectionState)`：分割文本块
	- `applyInlineStyle(contentState, selectionState, style)`：应用内联样式
	- `removeInlineStyle(contentState, selectionState, style)`：移除内联样式
	- `setBlockType(contentState, selectionState, blockType)`：设置块类型
	- `applyEntity(contentState, selectionState, entityKey)`：应用实体
