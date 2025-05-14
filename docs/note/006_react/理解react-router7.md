---
slug: /note/understand-react-router7
title: 理解react-router7
---
## 常用的配置方法
使用官方脚手架生成的项目中，可以在`app/routes.ts`配置路由，整体是一个数组，支持嵌套。可以使用的方法有： index、route、layout、prefix：
```ts
import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("./home.tsx"), // 默认路径
  route("about", "./about.tsx"), // /about

  layout("./auth/layout.tsx", [ // 使用auth布局
    route("login", "./auth/login.tsx"), // /login
    route("register", "./auth/register.tsx"), /register
  ]),

  ...prefix("concerts", [
    index("./concerts/home.tsx"), // /concerts/
    route(":city", "./concerts/city.tsx"), // /concerts/:city
    route("trending", "./concerts/trending.tsx"), // /concerts/trending
  ]),
] satisfies RouteConfig;

```

## 分包
在 `app/routes.ts`中配置的路由及其module，在打包后会生成一个单独的文件。

## hook
在react-router7中，对hook支持的更好，常用的hook有以下

```js
useParams
useSearchParams
useLocation
useNavigation
useMatch
useMatches

useSubmit
useFetcher
useFetchers
```

## 路由模块
在 `routes.ts` 中引用的文件称为路由模块（route module）。

在每个module中，都可以定义一些变量，用于数据加载、操作、重新验证、错误边界等等；
module定义的变量只会在本module及本module的子module中生效；
如果该module没有定义该变量，则会向上递归查找，直到找到变量；
需要将这些变量export出去，才会被react-router使用。
```
loader/clientLoader: 函数，返回的值可以为组件提供数据(loaderData)
action/clientAction: 函数
headers：headers 函数，返回的内容会在服务器渲染时，放到response header中
ErrorBoundary： 错误边界组件
HydrateFallback: Loading组件
links: 函数，返回数组，会被渲染成html的link元素
meta: 函数，返回数组， 会被渲染成html的meta元素
```

在`root.tsx`中定义了的变量，是默认的要加到页面中的变量
-  Layout：React组件，全局默认布局

## OutLet
可以理解为是占位符、children
```js
import { Outlet } from "react-router"

export default function SomeParent() {
  return (
    <div>
      <h1>Parent Content</h1>
      <Outlet />
    </div>
  );
}
```
