---
slug: /note/react-router-upgrade-troubleshooting-record
title: react-router升级踩坑记录
---
## 背景
由于最近我们项目在做功能上的大版本升级，在后续测试时，势必会对所有功能的回归测试。而且本次修改，改动了项目的路由，所以内部沟通决定趁机升级一下react-router的版本，从官网查询后react router最新的版本是 v7，所以就开始了升级v7的踩坑之路。

## 升级之路
- 当前版本：react@5.3.x
- 目标版本：react router@7.x

### react 升级
从官方文档查阅，要想升级到react router v7版本，与之匹配的react 版本必须在 18以上。所以我们先升级了react 版本，由于项目没有使用react 高端api，所以升级react 18只非常顺利。
- react 升级之react 18版本
- react-dom升级之react 18版本
- 修改项目各个页面的entry module，将`ReactDOM.render`替换成 `createRoot`即可，伪代码如下：
```jsx
// old
import ReactDOM from 'react-dom'
ReactDOM.render(vdom, container) 

// new
import { createRoot } from 'react-dom/client'
createRoot(container).render(vdom)
```

### react router 升级
react router5和react router7之间跨越了2个大版本，所以不敢贸然升级。所以我根据官方的指引，先将react router5升级到了react router6，又将react router6升级到了react 7。

#### react router v5 ->  react router v6
在原来的代码中有我们使用react router时，有分为以下2步骤：
- 使用 `routes.js` 配置路由数组，使用`Root.tsx`，深度遍历routes，渲染成 Router的 children；
- 使用 history 库的`createBrowserHistory`api 创建独立维护的history对象，在需要跳转的地方，使用history.push() 进行路由跳转。无论是组件内，还是组件外。

```jsx
// routes.js
const routes = [
	path: '',
	component: <Component />,
	childrenRoutes
]
const renderRoutes = (routes) => {
	return <Switch>
	{
		routes.map(route => {
			if(route.childrenRoutes) return renderRoutes(childrenRoutes)
			return <Route path={path} render={<Component />} />
		})
	}
	</Switch>
} 
const history = createBrowserHistory()
const RouterRoot = () => {
	return <Router history={history}>{renderRoutes(routes)}</Router>
}

function initPage() {
 history.push('/')
}

function App() {
	useEffect(() => {
		initPage()
	}, [])
	return <div>home</div>
}
```

在 react router 6中，官方不推荐直接使用 Router，在 react router v7版本中，甚至不再向外暴露Router组件。另外，官方也不推荐直接使用history进行路由的跳转，而是使用官方推荐的useNavigate进行路由跳转，react router v6也对外提供了很多hooks，如 `useNavigate`、`useNavigation`、`useParams`等。

通过查询资料，我在[stackoverflow](https://stackoverflow.com/questions/69871987/react-router-v6-navigate-outside-of-components)查到一个简单快捷的解决方案，即使用 `createBrowserRouter` + `RouterProvider`的方式，对现有代码实现最小的改动。并且可以使用 `createBrowserRouter` 创建出来的 `router.navigate()`进行组件内和组件外的路由跳转。

于是我轰轰烈烈的开始大面积替换`history.push`的地方，将其改为`router.navigate()`，改完之后，信心满满的重新运行本地开发环境，发现提示 **不能在 `xxxx`变量没有创建之前使用它**，但是我并未改动这个变量任何相关的代码。我就开始一个一个文件的排查，最终发现是一个文件使用 `router.navigate()` 时，代码中存在循环引用，导致的崩溃。后来我仔细看了一下[stackoverflow](https://stackoverflow.com/questions/69871987/react-router-v6-navigate-outside-of-components)，发现一个外国老哥遇到了和我一样的问题，我整个人也有点崩溃，像是膝盖中了一枪（外国老哥的原话）。

但是我已经改到这个程度了，就一定会找个解决方案，一开始想到的是全局变量，再同时的提醒下，新建了一个`localRouter` module，用作 `localRouter.navigate()`，截止到目前已经改的差不多了。

其他修改：
- Switch 替换成 Routes
- children 替换成 Outlet
- 不再支持 withRoutes


#### react router v6 ->  react router v7
react router v6到v7非常顺利，没有遇到麻烦。


## 其他配置
- react router 使用lazy支持懒加载
- 在类组件中使用useNavigate进行跳转
- 标识 `localRouter` 为 `@deprecated`，后续逐渐替换...

