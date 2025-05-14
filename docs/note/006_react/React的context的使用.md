---
slug: /note/react-context-usage
title: React的context的使用
---
如果一个变量是全局性的，如i18n或theme，那通过props自上而下的传递就非常笨重了。react 提供了一个  context api，可以通过创建一个上下文，在 `Provider` 中提供值以及修改值的方式，在 `Consumer`中消耗值即修改值的方式。通过context的方式减少，值通过props层层传递的情况。

## 创建Context
使用 `React.createContext` api 创建一个context上下文；context是一个`react.context`的对象，对象中包含`Provider`和`Consumer` key。

其中 `Provider` 和 `Consumer`中有一个`_context` 属性，循环引用了context。

在挂载 `Provider` 组件时，会将Provider 组件的**props.value** 赋给 `Provider._context._currentValue`，这样会同时更新 `context._currentValue` 和  `Consumer._context._currentValue`，最终达到同一上下文的目的。

```jsx
// context.js
export const ThemeContext = React.createContext({})
// Context 值如下：
// {
//   $$typeof: Symbol(react.context),
//   Consumer: {$$typeof: Symbol(react.context), _context: {…}, …},
//   Provider: {$$typeof: Symbol(react.provider), _context: {…}},
//   _currentRenderer: null,
//   _currentRenderer2: null,
//   _currentValue: {},
//   _currentValue2: {},
//   _defaultValue: null,
//   _globalName: null,
//   _threadCount: 0
// }
```

## 提供：使用Provider提供value
在使用`Provider`时，为 `Provider` 增加一个 `value` props。
```jsx
import {ThemeContext} from 'context.js'
import Header from 'Header'
import Main from 'Main'

const App = () => {
	const [theme, setTheme] = useState('black')
	const toggleTheme = () => {
		setTheme(theme === 'black' ? 'white' : 'black')
	}
	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<Header />
			<Main />
		</ThemeContext.Provider>
	)
}
```

## 消耗：在上下文中消耗value
### 在class 组件中使用Consumer
第一步：需要在 class 组件中定义 `contextType` 静态变量，在渲染class 组件时，如果类组件的构造函数中包含 contextType 属性，就会将其属性值赋给实例的context，下面是伪代码：

```
if(类组件) {
	// 组件实例
	const instance = new 组件()
	if(组件.constructor.contextType) {
		instance.context = 组件.constructor.contextType
	}
}
```

第二步：通过 **this.context.x** 使用上下文的值。
```jsx
import {ThemeContext} from 'context.js'

class Header extends React.Component {
	static contextType = ThemeContext
	
	render() {
		return <div style={{ background: this.context.theme }}>Header</div>
	}
}
```

### 在function 组件中使用Consumer
因为function组件没有实例，所以不能像类组件一样挂载context（与ref类似）

在使用`Consumer`组件时，需要在`Consumer` 内部包裹一个函数，函数的返回值即是真正要渲染的内容。
react在挂载`Consumer`组件时，会获取其children，也就是内部包裹的这个函数，调用这个函数，然后将 `Consumer._context._currentValue`作为参数，传给函数。
```jsx
import {ThemeContext} from 'context.js'
const Main = () => {
	return <ThemeContext.Consumer>{
		(contextValue) => {
			return <div style={{ background: contextValue.theme }}>
				Main
				<button onClick={contextValue.toggleTheme}>切换主题</button>
			</div>
		}
	}</ThemeContext.Consumer>
}
```

### 在function 组件中，使用useContext
```jsx
import {ThemeContext} from 'context.js'
import { useContext } from 'React'

const MainChild = () => {
	const context = useContext(ThemeContext)
	
	return <div style={{ background: context.theme }}>
		MainChild
		<button onClick={contextValue.toggleTheme}>切换主题</button>
	</div>
}
```

## 嵌套用法
```jsx
const ThemeContext = React.createContext({})
const StoreContext = React.createContext({})

// ...供应
<ThemeContext.Provider value={{color: 'red'}}>
	<StoreContext.Provider value={{uid: 'xxxxxx'}}>
		<Children />
	</StoreContext.Provider>
</ThemeContext.Provider>

// ...消耗
<ThemeContext.Consumer>
{
	(themeContextValue) => {
		return <ThemeContext.Consumer>
		{
			(storeContextValue) => {
				return <div style={{ color: themeContextValue.color}}>
					{storeContextValue.uid}
				</div>	
			}
		}
		</ThemeContext.Consumer>
	}
}
</ThemeContext.Consumer>
```
