---
slug: /note/parcel-application-packaging-tool
title: Parcel 应用打包工具
---
Parcel 是一个零配置的 Web 应用打包工具，它在构建过程中使用了 Web Worker 来提高构建速度。

**Parcel** 和 **Webpack** 都是现代前端开发中常用的模块打包器，它们有一些共同点，但也有一些关键的区别。

1. **配置**：Parcel 的主要卖点是零配置，即开箱即用。你不需要创建任何配置文件就可以开始使用 Parcel。而 Webpack 则以其高度可配置性而闅名，你可以通过 webpack.config.js 文件来详细控制其行为。
    
2. **速度**：Parcel 宣称其比其他打包器（包括 Webpack）更快，因为它利用了多核处理和文件系统缓存。然而，Webpack 也有各种插件和优化可以提高其速度。
    
3. **转换器（Transformers）**：Parcel 内置了对许多文件类型的支持，如 JS、CSS、HTML、文件资源等，而且可以自动安装需要的转换器。Webpack 则需要手动安装和配置 loader 来处理不同类型的文件。
    
4. **代码拆分**：Webpack 和 Parcel 都支持代码拆分，但 Parcel 提供了更简单的 API 来实现这一点。
    
5. **热模块替换**：Webpack 和 Parcel 都支持热模块替换（HMR），但在 Parcel 中，这是开箱即用的，而在 Webpack 中，你需要进行一些配置。
    
6. **社区和插件生态**：Webpack 的社区和插件生态更加成熟，有大量的插件和 loader 可供选择。Parcel 的社区和插件生态相对较小，但正在快速发展。
    

Parcel 更适合那些希望快速开始项目，不想花太多时间在配置上的开发者。而 Webpack 则更适合那些需要高度自定义打包过程的大型项目。
