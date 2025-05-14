---
slug: /note/react-high-order-components
title: React的高阶组件
---
高阶组件一般有2个应用：
## 属性代理
为原有的组件增加额外的属性
```jsx
function withComponent(OldComponent) {
	return class NewComponent extends React.Component {
		// 为OldComponent 额外增加了name属性
		return <OldComponent {...this.props} name={'xxxx'}/>
	}
}
```

## 反向继承
在不改变原组件的前提下，改变组件的渲染内容
```jsx
function withComponent(OldComponent) {
	// 继承原有组件
	return class NewComponent extends OldComponent {
		constructor(props) {
			super(props)
		}
		componentDidMount() {
			// 调用原组件的componentDidMount
			super.componentDidMount()
		}
		onClick = () => {
			console.log('xxxx')
		}
		render() {
			const vdom = super.render()
			const newProps = {
				...vdom.props,
				name: 'xx',
				onClick: this.onClick
				
			}
			// 修改原组件的props和children
			return React.createElement(vdom, newProps, 'hello')
		}
	}
}
```
