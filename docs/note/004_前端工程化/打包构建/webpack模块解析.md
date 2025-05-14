---
slug: /note/webpack-module-parsing
title: webpack模块解析
---

```js
import { createBrowserHistory } from 'history'
import { getRedirectPathWithTrackSearchQuery } from 'helper/redirect'
```

在代码中，我们通常会看到这样的代码。其中 `history` 指的是`node_modules` 中的第三方依赖库，`helper/redirect` 则是项目目录下的文件，但为什么可以不加相对路径直接引入这些模块呢？又是怎么精准的定位到这些模块的呢？

贴一下`webpack.config.js` 中关于`resolve`的配置
```js
resolve: {
    // 支持的文件扩展名
    extensions: [ '...', '.ts', '.tsx', '.cjs', '.mjs' ],
    // 模块查找路径
    modules: [ 'node_modules', ...extraResolveModuleList ]  // extraResolveModuleList = [fromRoot('src/')]
}
```

这个配置的含义是:
1. 当遇到模块导入时,webpack 会按顺序在以下目录中查找模块:
- node_modules 目录
- src/ 目录 (通过 fromRoot('src/') 得到的完整路径)

2. 所以当我们写:
```js
import { createBrowserHistory } from 'history'  // 在 node_modules 中查找
import { getRedirectPathWithTrackSearchQuery } from 'helper/redirect' // 在 src/helper 中查找
```

3. webpack 的查找过程:
- 对于 history - 直接在 node_modules 中找到
- 对于 helper/redirect - 会在 src/helper/redirect 中查找

4. 这就是为什么可以:
- 直接使用包名引入第三方库
- 使用相对于 src 的路径引入项目内的模块

---
## 延展

在`webpack.config.js` 的 `resolve`配置中，还有一个`alias`配置项。

```js
// webpack.config.js
module.exports = {
  resolve: {
    alias: {
      // 设置 src 目录别名
      '@': path.resolve(__dirname, 'src'),
      // 可以直接从 src 目录开始解析
      'helper': path.resolve(__dirname, 'src/helper'),
      'utils': path.resolve(__dirname, 'src/utils')
    }
  }
}
```

`alias`配置项与`module`类似，都可以用来模块解析，但与`module`不同的是，`alias`可以用来精准的配置目录别名，即给目录取一个别的名字。以下是两种配置的不同点：
`resolve.alias` 和 `resolve.modules` 是 webpack 中两种不同的模块解析配置:
### 1. resolve.alias
- 用于创建导入路径的别名(快捷方式)
- 可以将特定的导入路径映射到另一个路径
- 更精确的路径映射,一般用于特定目录

```javascript
resolve: {
  alias: {
    '@': path.resolve(__dirname, 'src'),
    'utils': path.resolve(__dirname, 'src/utils'),
    'components': path.resolve(__dirname, 'src/components')
  }
}
```

使用示例:
```javascript
// 可以这样导入
import Button from '@/components/Button'
import { formatDate } from 'utils/date'

// 替代这样的长路径
import Button from '../../../components/Button'
import { formatDate } from '../../../utils/date'
```

### 2. resolve.modules 
- 设置模块查找的根目录列表
- webpack 会按顺序在这些目录中查找模块
- 更通用的路径查找机制

```javascript
resolve: {
  modules: [
    'node_modules',
    path.resolve(__dirname, 'src')
  ]
}
```

使用示例:
```javascript
// webpack 会依次在 node_modules 和 src 目录下查找
import { Button } from 'components/Button'
import { formatDate } from 'utils/date'
```

### 主要区别

1. 查找方式:
- `alias`: 精确匹配,直接映射到指定路径
- `modules`: 按顺序在多个根目录中查找

2. 使用场景:
- `alias`: 常用于创建简短的导入路径,避免过长的相对路径
- `modules`: 用于设置模块查找的基础目录

3. 优先级:
- `alias` 的优先级高于 `modules`
- webpack 先检查 alias 映射,如果没找到再按 modules 配置查找

4. 灵活性:
- `alias`: 更灵活,可以映射到任意路径
- `modules`: 更通用,设置查找的根目录

### 实际应用示例

```javascript
// webpack.config.js
module.exports = {
  resolve: {
    // 别名配置
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'jquery': path.resolve(__dirname, 'node_modules/jquery/dist/jquery.min.js')
    },
    // 模块查找目录
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ]
  }
}
```

这两种配置通常配合使用,以获得最佳的模块解析体验。

---
## 快捷跳转
有的小伙伴会有疑问，配置alias 别名后，在查看代码的时候，怎么跳转过去看到对应的组件代码？

在项目的根目录下，找到或创建`tsconfig.json` 或`jsconfig.json`,添加以下配置，就可以在点击文件名时跳转至对应文件啦：
```json
{
  "compilerOptions": {
    "baseUrl": "./",  // 项目的根目录
    "paths": {
      "@components/*": ["src/components/*"], // 映射alias
      "@utils/*": ["src/utils/*"]
    }
  }
}
```
