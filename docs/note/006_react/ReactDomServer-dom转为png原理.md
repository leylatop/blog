---
slug: /note/reactdomserver-dom-to-png-principle
title: ReactDomServer-dom转为png原理
---
- ReactDOMServer.renderToString() 方法已经将 React 组件渲染成了 HTML 字符串；
```js
const str = ReactDOMServer.renderToString(<ItemPngExportable item={item} isWithDeviceFrame={isWithDeviceFrame} scale={scale} hasWatermark={hasWatermark} isExportSticky={isExportSticky} isIncludeCanvasName={isIncludeCanvasName} sdk={sdk} />)
```

- 创建一个div元素，将第一步的 html 字符串，设置成 div 的 innerHTML；
```js
const element = document.createElement('div')
element.innerHTML = str
```

- 使用 XMLSerializer 来将这个已经填充了渲染后HTML内容的 div 元素，转化为字符串形式（serializeToString 的作用是将element 转换为一个序列化的字符串，以便于可以作为一个整体对其进行操作或传输；例如，你可能希望将这个HTML字符串保存到数据库中，或者通过网络发送到其他系统中。）
```js
const htmlSourceList = [ new XMLSerializer().serializeToString(element) ]
```

- 使用 `collectNameSetConf` 收集 `htmlSourceList` 中dom元素的id和class

- 解析 cssLink和style标签代码`createCSSFragCollector` | `prepareCSSStringList`（第三方插件：stylis）

- 解析 html 代码 `createHTMLFragCollector` | `prepareHTMLStringList`

- 将html代码和css代码塞到svg中，生成一个数组，数组的每一项是一个svg字符串
```js
const prepareSVGStringList = ({ domStringList, width, height }): string[] => [
  `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="${width}" height="${height}"><switch>`,
  `<foreignObject width="${width}" height="${height}"><body xmlns="http://www.w3.org/1999/xhtml" style="font-size:16px">`, ...domStringList, '</body></foreignObject>',
  `<text font-size="24"><tspan x="${width / 2}" y="${height / 2}" text-anchor="middle">Feature not supported</tspan></text>`,
  '</switch></svg>'
]
```

- 将svg字符串数组遍历调用 `encodeURIComponent` 方法，生成一个数组，再调用 `join` 方法，生成一个已经编码的svg字符串。在字符串前面加上 `data:image/svg+xml;charset=utf-8,`，生成一个完整的svg字符串，可以直接用于img标签的src属性。
```js
const imageSrc = [ 'data:image/svg+xml;charset=UTF-8,', ...svgStringList.map((v) => encodeURIComponent(v)) ].join('')
```

- 使用 `prepareImageElement`, 将 `imageSrc` 作为 `img` 标签的 `src` 属性，创建一个 `img` 元素。
```js
const prepareImageElement = ({ imageSrc, width, height }): Promise<HTMLImageElement> => new Promise((resolve, reject) => {
  const imageElement = document.createElement('img')
  imageElement.addEventListener('error', reject)
  imageElement.addEventListener('load', () => resolve(imageElement))
  imageElement.crossOrigin = 'anonymous'
  imageElement.width = width
  imageElement.height = height
  imageElement.src = imageSrc
})
```

- 使用 `prepareCanvasElement`, 创建一个 `canvas` 元素，将 `img` 元素绘制到 `canvas` 上。
```js
const prepareCanvasElement = ({ imageElement, width, height }): Promise<HTMLCanvasElement> => new Promise((resolve) => {
  const canvasElement = document.createElement('canvas')
  canvasElement.width = width
  canvasElement.height = height
  setTimeout(() => { // TODO: HACK: if direct return, Chrome in Linux will crash (but not Firefox)
    canvasElement.getContext('2d').drawImage(imageElement, 0, 0)
    resolve(canvasElement)
  }, 0)
})
```

- 使用 `prepareBlob`, 将 `canvas` 元素转化为 `blob` 对象，得到最终的 `blob` 对象。
```js
const prepareBlob = ({ canvasElement }): Promise<Blob> => new Promise((resolve) => {
  canvasElement.toBlob(resolve)
})
```

- 将 `blob` 对象转化为 `file` 对象。
```js
const file = new File([ pngBlob ], `${_getFileNameIE()}.png`, { type: pngBlob.type })

```

- 使用 `saveAs` 方法，将 `file` 对象保存到本地（第三方插件：file-saver）
```js
const saveAs = (file, fileName) => {
  const a = document.createElement
  a('a')
  a.href = URL.createObjectURL(file)
  a.download = fileName
  a.click()
  URL.revokeObjectURL(a.href)
}
```

- 使用 `navigator.clipboard.write` 方法，将 `file` 对象保存到剪贴板。
```js
navigator.clipboard.write([ new ClipboardItem({ 'image/png': pngBlob }) ])
```
