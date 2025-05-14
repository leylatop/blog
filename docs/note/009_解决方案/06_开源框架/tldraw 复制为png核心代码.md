---
slug: /note/tldraw-copy-as-png-core-code
title: tldraw 复制为png核心代码
---
1. copyAs: https://github.com/tldraw/tldraw/blob/7afc42a8b1efd8bdeb7f3fda92413f68ff0e0353/packages/tldraw/src/lib/utils/export/copyAs.ts#L30
2. exportToBlob: https://github.com/tldraw/tldraw/blob/7afc42a8b1efd8bdeb7f3fda92413f68ff0e0353/packages/tldraw/src/lib/utils/export/export.ts#L168
3. getSvg: https://github.com/tldraw/tldraw/blob/7afc42a8b1efd8bdeb7f3fda92413f68ff0e0353/packages/editor/src/lib/editor/Editor.ts#L8092
4. util.toSvg: https://github.com/tldraw/tldraw/blob/7afc42a8b1efd8bdeb7f3fda92413f68ff0e0353/packages/editor/src/lib/editor/Editor.ts#L8217
5. getSvgAsImage-callback: https://github.com/tldraw/tldraw/blob/7afc42a8b1efd8bdeb7f3fda92413f68ff0e0353/packages/tldraw/src/lib/utils/export/export.ts#L13

==============================
- getSvg：获取widget的svg，最终返回一个svg
- util.toSvg: getSvg的核心各个widget转变成svg => 根据widget的类型不一样，toSvg的方法也不一样，可以在实例中进行重写
- getSvgAsImage：
	- 将getSvg获取的svg作为 getSvgAsImage实参传入
	- svg => svgString => blob => svgUrl
	- 将svgUrl通过img标签渲染至canvas内
	- canvas => blob
	- blob.arrayBuffer + DataView + new Blob => blob
- navigator.clipboard.write(\[new ClipboardItem(blob)\])
