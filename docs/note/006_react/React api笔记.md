- React.Children：
	- React.Children.only(children) ：验证 children 是否只包含单个 React 元素，并返回该元素。如果 children 不是单个 React 元素，则会抛出错误。
	- React.Children.map(children, function(child, index) {}):对 children 中的每个直接子元素进行映射处理，并返回一个新的数组。
	- React.Children.forEach(children, function(child, index) {})：对 children 中的每个直接子元素进行遍历，执行回调函数。
	- React.Children.count(children)：返回 children 中直接子元素的数量。
	- React.Children.toArray(children)：将 children 转换为一个数组。

- ReactServerRendering：
  - ReactDOMServer.renderToString(element)：将 React 元素渲染为初始 HTML 字符串。
  - ReactDOMServer.renderToStaticMarkup(element)：将 React 元素渲染为 HTML 字符串，不包含额外的 DOM 属性，如 data-reactid。