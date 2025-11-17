---
slug: what-is-npx
title: npx 是什么?
date: 2025-11-17
authors: leyla
tags: [软件, develop, 系统]
keywords: [npx, 命令, 工具]
---

## npx 是什么

`npx` 是现代 JavaScript 工具链中一个极其方便且重要的命令。简单来说，它的全称是 **N**ode **P**ackage e**X**ecute（Node 包执行器），它让你**无需在本地或全局安装一个 npm 包，就能直接运行它提供的命令。**

可以把它想象成一个“一次性”的命令运行器。

<!-- truncate -->

### `npx` 的核心作用：解决什么问题？

在没有 `npx` 的时代，如果你想使用一个命令行工具（比如 `create-react-app` 来创建 React 项目），你有两种选择，但它们都有缺点：

1.  **全局安装 (`npm install -g create-react-app`)**
    *   **缺点1: 全局污染**。你的电脑上会安装很多可能只用一次的工具，时间久了会变得混乱。
    *   **缺点2: 版本管理困难**。一旦全局安装，所有项目都共用这个版本。如果你想在新项目中使用最新版的 `create-react-app`，就必须先更新全局包，这可能会影响到依赖旧版本的旧项目。

2.  **本地安装 (`npm install create-react-app`)**
    *   **缺点**: 这会将包安装到当前项目的 `node_modules` 目录下，增加了项目体积。而且，要运行它，你必须使用很长的路径：`./node_modules/.bin/create-react-app`，非常不方便。

**`npx` 的出现完美地解决了以上所有问题。**


### `npx` 是如何工作的？

当你执行 `npx <command>` 时，它会按照以下顺序智能地寻找并执行命令：

1.  **检查本地项目**：首先，检查当前项目目录的 `node_modules/.bin` 路径下是否存在 `<command>`。如果存在，就直接执行它。
    *   *这使得 `npx prettier --write .` 可以直接使用项目依赖里安装的 Prettier 版本，非常方便。*

2.  **检查远程仓库**：如果在本地项目中找不到，`npx` 会去 npm 远程仓库查找是否存在名为 `<command>` 的包。

3.  **下载并执行**：如果找到了，`npx` 会将这个包**临时下载到一个中央缓存区**，执行完毕后，并不会在你的全局或本地项目中留下“痕迹”。

**关键点**：`npx` 自带于 npm 5.2.0 及以上版本，所以只要你的 Node.js 和 npm 版本不是太旧，你就可以直接使用它，无需额外安装。


### 三个最常见的 `npx` 使用场景

#### 1. 项目脚手架（最经典）

这是 `npx` 最广为人知的用途。你只需运行一次命令来创建项目，之后就不再需要它了。

```bash
# 创建一个新的 React 项目
npx create-react-app my-react-app

# 创建一个新的 Vue 项目
npx create-vue@latest my-vue-app

# 创建一个新的 Vite 项目
npx create-vite my-vite-project
```
在这些场景下，`npx` 会自动下载并使用最新版的脚手架工具，帮你生成项目，然后“挥一挥衣袖，不带走一片云彩”。

#### 2. 运行项目本地依赖的工具

假设你的项目开发依赖（`devDependencies`）中安装了 `prettier` 或 `tailwindcss`。

```json
// package.json
"devDependencies": {
  "prettier": "^3.0.0",
  "tailwindcss": "^3.3.3"
}
```

你可以直接用 `npx` 来调用它们，而无需在 `package.json` 的 `scripts` 中配置命令，也无需写长长的路径。

```bash
# 使用项目本地安装的 prettier 格式化所有文件
npx prettier --write .

# 使用项目本地安装的 tailwindcss 来编译你的 CSS
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```
`npx` 的这个特性保证了所有团队成员都使用 `package.json` 中锁定的、统一版本的工具。

#### 3. 尝试和运行不常用的包

想看看 `cowsay` 这个包的效果？或者临时启动一个 HTTP 服务器？

```bash
# 让一头牛说“你好”
npx cowsay "你好，世界！"

# 在当前目录下快速启动一个本地 HTTP 服务器
npx http-server
```
你不需要为了这个小小的乐趣或临时需求而去 `npm install` 任何东西。


### 总结：`npx` vs `npm`

可以做一个简单的类比：

*   **`npm install`**：像是去商店**购买**一个工具，把它放进你自己的工具箱（`node_modules`）或家里的公共储藏室（全局安装）。这个工具会一直留在那里。
*   **`npx`**：像是去工具租赁公司**租用**一个工具。你告诉 `npx` 你要用什么，它帮你拿来，用完后它就负责还回去。你家里干干净净，什么也没留下。

因此，`npx` 是一个强大的、用于提升开发体验和保持环境整洁的利器。
