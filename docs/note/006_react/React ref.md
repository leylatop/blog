
ref的作用：将dom节点保存到当前组件或暴露给父组件，可以通过dom直接操作dom上的方法
- 类组件：
	- 创建ref：
		- this.ref = React.createRef
		-  `<div ref={this.ref} />`
	- 向父组件暴露ref，通过回调函数的方式，父组件体统一个函数作为props传给子组件：
```jsx
componentDidMount() {
// 将DOM节点传递给父组件
this.props.onRef(this.myRef.current);
}
```
- 函数组件：
	- 创建ref：
		- const ref = useRef(null)
		-  `<div ref={this.ref} />`
	- 向父组件暴露ref

在子组件创建ref：
1. 需要在子组件中访问自己的DOM节点或组件实例
2. 子组件就可以通过ref来访问自己的DOM节点或组件实例
在子组件中创建ref
在父组件创建ref
1. 需要在父组件中访问子组件的DOM节点或组件实例
2. 在父组件中创建ref，并将其传递给子组件

ref的创建位置：ref可以在父组件中创建，也可以在子组件中创建
创建ref时，有方式：
1. this.ref = React.createRef
