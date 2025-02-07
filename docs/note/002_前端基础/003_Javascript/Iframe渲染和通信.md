- 背景
  - 将gpt返回的html内容，通过iframe嵌入到页面中，实现渲染
  - 希望能在页面中hover、点击iframe内部元素时，能够高亮显示、选中元素
  - 但不希望在iframe内部可以获取到父级页面的元素和信息，保证安全性
- 策略
  - 通过iframe的srcdoc属性，将html内容渲染到iframe中
  - 将iframe的sandbox属性设置为 `allow-script`，运行运行script，保证iframe内部无法获取到父级页面的信息
  - 将希望给iframe内部元素添加事件监听的需求，通过iframe的postMessage方法，将事件传递给iframe内部
  - iframe内部监听事件，根据事件类型，添加对应的事件监听
  - 具体实现如下：
- 实现
  - 父级页面
```javascript
  const iframe = document.createElement('iframe
  iframe.srcdoc = htmlContent
  iframe.sandbox = 'allow-scripts'
  document.body.appendChild(iframe)
  iframe.contentWindow.postMessage({type: 'addEvent', eventType: 'click'}, '*')
  ```
  - iframe内部
```javascript
window.addEventListener('message', (event) => {
  const {type, eventType} = event.data
  if (type === 'addEvent') {
	document.body.addEventListener(eventType, (e) => {
	  console.log('click', e.target)
	})
  }
})
```
- 总结
- 通过iframe的srcdoc属性，将html内容渲染到iframe中，通过sandbox属性，保证iframe内部无法获取到父级页面的信息，通过postMessage方法，将事件传递给iframe内部，实现了在iframe内部添加事件监听的需求