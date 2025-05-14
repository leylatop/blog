---
slug: /note/module-chunk-bundle-differences
title: module chunk bundle的区别
---
# module chunk bundle的区别

## module（模块）

module是webpack中最小的构建单元，一个module对应一个文件；

可以是任何类型的文件，可以是任何类型的文件，如 .js、.css、.png、.vue 等

模块之间可以互相引用（import/require）

```js
// math.js - 这是一个模块
export const add = (a, b) => a + b;

// index.js - 这也是一个模块
import { add } from './math.js';
```

## chunk（代码块）

chunk是webpack中代码块的统称，是打包过程中的中间产物，一个chunk可以包含一个或多个module。

根据配置的不同，webpack 会将模块组合成不同的 chunk

常见的 chunk 类型：
- entry chunk: 入口文件和它的依赖
- runtime chunk: webpack 的运行时代码
- async chunk: 动态导入的模块

```js
// webpack配置示例
module.exports = {
  entry: {
    main: './src/index.js',    // 会形成一个entry chunk
    admin: './src/admin.js'    // 会形成另一个entry chunk
  },
  optimization: {
    runtimeChunk: 'single'     // 会形成一个runtime chunk
  }
}

// 动态导入会形成async chunk
import('./async-module.js').then(module => {
  // 使用模块
});
```

## bundle(包)

bundle是webpack中打包后输出的文件，一个bundle对应一个文件。

bundle是chunk转换后的结果，一个chunk通常生成一个bundle

bundle 是最终给浏览器使用的文件


## 优化打包
- 使用动态导入来分割 chunk
- 通过 optimization.splitChunks 优化 chunk size
- 使用 MiniCssExtractPlugin 将 CSS 从 js bundle 中分离出来
