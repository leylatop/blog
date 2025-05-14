---
slug: /note/antdesign-component-trigger
title: AntDesign组件-Trigger
---
- children作为一个触发open行为的 ReactDOM
- 根据trigger的行为（hover/click）为children添加各种事件，在触发并显示popup时，获取鼠标位置（`[event.clientX, event.clientY]`），作为popup的偏移位置：
	- onClick
	- onMouseEnter
	- onPointerEnter
	- onMouseLeave
	- onPointerLeave
	- onFocus
	- onBlur
- 最后，将为children添加的各种事件与children originProps进行一个merge
- resize页面时的计算逻辑：
	- https://github.com/react-component/trigger/blob/b2a41247ed2557685e0d7549ee5402ae05dc089d/src/hooks/useAlign.ts#L163
