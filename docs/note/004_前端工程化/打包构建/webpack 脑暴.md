webpack
- entry
  - entry 的格式支持字符串、数组、对象
  - 不指定entry，默认是src/index
- output
  - path: 输出文件的目录
  - filename: 输出文件的名称
  - publicPath: 输出文件的公共路径
  - chunkFilename: 非入口文件的输出文件的名称
  - 不指定输出，默认是dist/main

- loader：module-rules
  - js
    - babel-loader
      - @babel/preset-env
      - @babel/preset-react
      - @babel/preset-typescript
    - 
  - css
    - css-loader: 负责将css文件转为字符串，再输出一个js模块
    - style-loader: 负责将js模块动态插入到html中

- loader
	- 本质上是一个函数，接收输入内容，return输出内容

- plugin
	- 内置插件
	- 非内置插件
	- html-template-plugin: 负责定义html模板
	- mini-css-extract-plugin: 负责将css文件抽离为单独的文件
	- 本质上是一个class 类，需要提供apply

- sourcemap: 源代码和编译后的代码的映射关系
  - devtool: 定义生成什么样的sourcemap、关键字有eval、source-map、cheap、inline、hidden
  - 涉及到的编码：VLQ编码、base64 VLQ编码
  - VLQ编码的原理：
    - 转换前的行号、列号、文件名、转换后的行号、列

- 模块
  - cjs：commonjs
  - esm：es module
  - 动态加载esm：import()，原理利用了jsonp

- jsonp的原理是：
  - 利用script标签的src属性，可以跨域请求资源

- 联邦模块
  - host
  - remote
  - 每个仓库都是一个独立的模块
  - 联邦模块的目的是为了复用
  - 涉及plugin：webpack-module-federation-plugin
  - 涉及到的配置：
    - remotes: 远程模块的地址
    - exposes: 暴露的模块
    - shared: 共享的模块

- ast
	- 词法解析：最终得到token
	- 语法解析：最终得到ast树
- babel
	- @babel/core
	- @babel/type
	- @babel/parser
	- @babel/traverse
	- @babel/generator
- babel插件开发：
	- 插件是一个方法；
	- 方法的参数接收babel传给插件的配置；
	- 方法返回一个对象，对象中常用的是visitor对象，对象中还可以pre和post的方法。可以在visitor中拦截重写需要的ast节点，并提供对应方法；拦截时使用大写开头的ast节点作为方法名，生成新的节点使用@babel/type中提供的方法；
	- 可以通过编写插件，实现以下：
		- 把es6转成es5
		- 箭头函数转成普通函数
		- 在方法中调用logger实现自动埋点
		- 删除代码中的console
		- 检查代码中的typescript语法是否合格
		- 按需加载三方依赖包 => import \{xx\} from 'lodash' => import xx from 'lodash/xx'(babel-plugin-import)
- css-loader
	- postcss：解析css代码，处理css节点，并返回css代码，和babel类似，只不过babel是处理js的，postcss是处理css的
	- postcss插件：和babel插件类似，可以自定义postcss的功能，传递给postcss
