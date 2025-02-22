2025年2月14号，react官方blog发出一篇最新的推送，react 将停止 create react app的维护，也就是说，在未来将不再能使用`create-react-app`命令创建新的react项目，react官方解释说，creact react app 虽然可以创建开箱即用的 react 项目，但是创建出来的项目并不适用于真正的生产环境。并且从以下几个方面进行了举证：

## 路由
在生产环境，如果只使用`create-react-app`创建出来的项目，在我们希望渲染不同的组件时，需要动态的改变状态，再去渲染组件。
但是，一般单页面应用是需要一个路由库，为项目配置路由，比如`react-router`。这样当输入不同的url时，`react-router` 会根据router的不同，渲染不同的组件，减少使用状态判断再渲染的情况。

## 数据获取
在`create-react-app`创建出来的项目的组件中获取数据时，一般会在`useEffect`中获取数据，但是`useEffect`的执行时机，是在组件渲染完之后，也就是说在获取数据时，组件已经渲染过了，会导致渲染较慢。
但是，有了react query 和react router之后，就可以使用**loader加载器** 提前获取数据，并且将loaderData作为组件的props传给组件，减少在组件中获取数据的情况，一方面可以使数据请求前置，另一方面可以使请求与UI分离。

## 代码分割
create react app打包出来的文件是一个大文件，也就是没有分割的概念。但是在做生产环境构建时，我们一般会将chunk分割，这样就可以减少第一个js下载的时间，从而加快页面显示速度。比如react router就提供了lazy选项，用于分割不同的路由对应的组件。


## 其他
create react app还缺少很多开箱即用的功能，比如 导航、服务端渲染、ssg等。而在create react app 解决每个问题很艰难，需要用户有很深厚的专业知识，再加上creact react app开源氛围一般，而且现在已经有很多框架实现了开箱即用的功能，所以react 团队放弃了维护 creact react app，并推荐大家使用其他框架，比如react-router框架、next-js框架，或使用其他的构建工具，如vite、parcel、rsbuild。