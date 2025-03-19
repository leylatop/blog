create-react-app是react维护的官方教授级（现在已经停止维护），使用create-react-app创建出来的react项目，在开发环境下，支持热更新。

create-react-app 使用的webpack进行打包构建，使用了webpack自带的热更新的支持。但是webpack不支持react框架的热更新，那就需要再额外配置。额外的配置分两步骤：

create-react-app维护了一套react-scripts脚本，当运行`npm run start` 时，其实执行的是`react-scripts`中的脚本，最终用于webpack的配置文件是 [`packages/react-scripts/config/webpack.config.js`](https://github.com/facebook/create-react-app/blob/main/packages/react-scripts/config/webpack.config.js)。在webpack.config.js 中，通过`react-refresh`实现了react的热更新。


## react-refresh
`react-refresh` 是react官方开发的依赖，是一个专为 React 设计的轻量级热更新解决方案，取代了之前的 `react-hot-loader`。`react-refresh` 的主要特点是能够保留组件的状态（state）和上下文（context），同时只更新发生变化的部分。


### babel插件配置
`react-refresh/babel` 被用作 Babel 插件，在编译 JSX 时为组件注入标识符，确保 HMR 只重新渲染受影响的组件，而不会导致整个应用的重新挂载。
```js

// babel-loader的插件，可以在webpack.config.js 配置，也可以再babel.config.js 中配置
plugins: [
  isEnvDevelopment &&
	shouldUseReactRefresh &&
	require.resolve('react-refresh/babel'),
].filter(Boolean),

// 
```


### webpack插件配置
在 Webpack 配置中，`react-scripts` 集成了 `ReactRefreshWebpackPlugin`。这个插件负责在开发服务器运行时注入必要的 HMR 逻辑。
`@pmmmwh/react-refresh-webpack-plugin` 是具体的实现库，它通过 Babel 转换 React 组件的代码，在编译时添加必要的钩子（hooks），以支持热更新（非react官方开发，但是create-react-app采用了这个webpack插件）
虽然该插件，并非react官方开发，但是create-react-app采用了这个webpack插件。
```

// webpack 的插件
new ReactRefreshWebpackPlugin({
  overlay: false,
}),
```

### react-refresh 运行时

`ModuleScopePlugin` 的核心作用是限制模块解析到 `src/` 目录，确保项目的模块引用安全、规范.**参数:**
- 第一个参数（`appSrc`）：指定主解析范围，通常是 `src/` 目录，所有用户代码的导入都应限制在此范围内。
- 第二个参数（数组）：指定额外的允许路径，这些路径可以被解析，即使它们不在 `src/` 目录下。通常用于一些必要的外部依赖或工具模块。

`react-refresh/runtime`：运行时模块，注入到代码中以支持快刷新
`@pmmmwh/react-refresh-webpack-plugin`：负责在构建过程中协调快刷新的逻辑
这两个模块都位于 `node_modules` 中，而不是 `src/` 目录下。如果不将它们的路径加入 `ModuleScopePlugin` 的例外列表，Webpack 会因为它们超出 `src/` 范围而拒绝解析，导致快刷新功能无法工作。
通过将 `reactRefreshRuntimeEntry` 和 `reactRefreshWebpackPluginRuntimeEntry` 添加到 `ModuleScopePlugin` 的允许路径中，CRA 确保这些模块可以被正常导入和使用，而不会触发 `ModuleScopePlugin` 的限制

```js
const reactRefreshRuntimeEntry = require.resolve('react-refresh/runtime');
const reactRefreshWebpackPluginRuntimeEntry = require.resolve(
  '@pmmmwh/react-refresh-webpack-plugin'
);

// resolve 的 ModuleScopePlugin 插件的参数传入
plugins: [
	new ModuleScopePlugin(paths.appSrc, [
	  paths.appPackageJson,
	  reactRefreshRuntimeEntry,
	  reactRefreshWebpackPluginRuntimeEntry,
	  babelRuntimeEntry,
	  babelRuntimeEntryHelpers,
	  babelRuntimeRegenerator,
	])
]
```


## 具体实现流程
1. **文件变更检测**：开发者修改代码后，`webpack-dev-server` 检测到文件变化。
2. **模块编译**：Webpack 重新编译受影响的模块，并生成更新后的代码块。
3. **推送更新**：通过 WebSocket，更新后的模块被推送至浏览器。
4. **模块替换**：`react-refresh` 的运行时接管更新逻辑，识别哪些 React 组件需要重新渲染。它利用注入的钩子，确保组件状态得以保留，同时只更新修改的部分。
5. **UI 更新**：浏览器重新渲染受影响的组件，页面无需刷新即可反映最新代码。
