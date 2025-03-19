Webpack 自带了对热模块替换（HMR）的支持。
当代码发生更改时，不刷新整个页面，而是只替换发生变化的模块，并将更新后的模块注入到运行时的应用中。

- 在开发模式下，Webpack 的 `webpack-dev-server` 被启用。
- `webpack-dev-server` 通过 WebSocket 与浏览器建立连接，实时监听文件变化。当检测到文件修改时，它会将更新的模块发送到浏览器端。
- 浏览器端的 HMR 运行时（HMR runtime）负责接收这些更新，并动态替换旧模块。
