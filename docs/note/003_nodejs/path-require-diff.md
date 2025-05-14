---
slug: /note/path-require-diff
title: path-require-diff
---

# path.resolve 与require.resolve的共同点与区别
## 共同点
path 和 require 都是node中的很重要的部分；
path通常用来处理和操作文件和目录，提供跨平台的路径操作方法；
requre是node中用来加载并执行其他文件的方法；

path.resolve 和require.resolve 都是用来【获取文件的绝对路径】的，这在模块解析中非常重要。因为模块解析的前提是需要找到模块在磁盘上的绝对路径，下一步才能解析。


## 区别
### path.resolve
- path的方法更多的是偏向路径拼接
- 不会检查文件是否存在
```js
// 基于当前工作目录（process.cwd()）进行解析
// 当前在哪个目录下运行命令，就是哪个目录+loaders/css-loader.js
path.resolve('loaders/css-loader.js')

// 基于当前文件所在的目录（__dirname）进行解析
// 代码写在哪个文件，就是哪个文件的目录
path.resolve(__dirname, 'loaders/css-loader.js')
```

### require.resolve
- require.resolve 更多的是用来查找模块
- 会实际检查文件是否存在，如果文件不存在会抛出错误
```js
require.resolve('./loaders/css-loader.js')
```
