## 一、 html + srcdoc + iframe  
1. AI 生成可以通过浏览器直接打开的 html 文件（单文件，html/css/js 写到一起）  
2. 通过 iframe 的 srcdoc 传入 html 源码预览  
3. 通过 importmap 指定依赖包的 CDN 资源。  
这种方案实现起来简单，预览效率高。  
  
## 二、react/vue + blob + iframe  
1. AI 生成 react / vue 组件代码（单文件组件，无本地 import 依赖）  
2. 通过 Babel.transform 转换 react 组件/通过 VueCompiler 编译 vue 组件  
3. 使用转换/编译后的组件，构建一个 html 文件  
4. 使用 blob 构建预览 url，传入 iframe.src 预览  
  
```js
const blob = new Blob([html], { type: 'text/html' });  
iframe.src = URL.createObjectURL(blob);  
```
  
这种方案稍微复杂一些，适合 react / vue 单文件组件预览。  
  
## 三、webcontainer  
1.  AI 生成组件代码（可以返回多个组件文件，组件可以互相 import）  
2. 构建一个最小可运行的 vite 项目骨架，把 vite 骨架包含的文件和 AI 生成的组件打包在一起，构建一个文件树  
3. 启动 webcontainer 容器，挂载文件树  
4. 通过 webcontainer 执行终端命令，安装项目依赖  
5. 通过 webcontainer 启动预览服务，得到预览地址  
6. 把预览地址传入 webcontainer 容器外的 iframe.src 实现项目预览  
  
这种方案依赖 webcontainer，可以实现多组件预览，灵活性更高，但是涉及到文件挂载，命令行安装依赖等步骤，预览速度会慢一些。  

四、总结
- 方案一适合用户不关心代码，只想快点看到效果的场景，比如用 Pagen 一句话生成 landing page，页面内容都在一个 html 文件里面。  
- 方案二适合辅助前端写组件场景。比如用 CopyWeb 截图复刻设计，生成单个 react 组件，在线预览效果，导出到本地项目使用。  
- 方案三适合一句话生成完整项目场景，比如用 bolt/v0 一句话生成 nextjs 项目骨架，可在线预览，可导出 zip 到本地修改。

参考地址：
- https://copyweb.ai/
- [原文](https://m.okjike.com/originalPosts/67b15b2de566d411e2dc8d4a)
