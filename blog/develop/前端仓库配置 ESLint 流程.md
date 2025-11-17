---
slug: /note/eslint-flow
title: 前端仓库配置 ESLint 流程
date: 2025-11-17
authors: leyla
tags: [前端, ESLint, 流程]
keywords: [前端, ESLint, 流程]
---


## eslint-flow 仓库
[leylatop/eslint-flow](https://github.com/leylatop/eslint-flow)

<!-- truncate -->
## 设计配置与技术实现

以下操作基于代码仓库实现。

### 安装 ESLint

ESLint 负责**代码质量检查**和发现潜在错误。

使用官方的初始化命令，在项目根目录下运行：

```bash
npm init @eslint/config@latest
```

在安装过程中，ESLint 会通过一系列的问题，帮助用户生成基础配置。

完成和 ESLint 的问题后，会自动安装 ESLint 所需的 npm 包（如 `eslint`、`eslint-plugin-react` 等），并自动生成一个 `eslint.config.js`（老的版本叫 `.eslintrc.js`）。

根据项目需求，修改 `eslint.config.js` 的 rule 使 lint 发生变化。

#### 常见 rule

```javascript
rules: {
  'quotes': ['error', 'single'], // 使用单引号
  'semi': [2, 'never'], // 禁用分号结尾
  'comma-spacing': ['error', { before: false, after: true }], // 逗号后面添加空格，前面不加空格
  'arrow-spacing': ['error', { before: true, after: true }], // 箭头函数前面添加空格，后面添加空格
  'camelcase': ['error', { properties: 'never', ignoreDestructuring: false }], // 强制使用驼峰命名
  'eqeqeq': ['error', 'always', { null: 'ignore' }], // 强制使用全等运算符
  'comma-dangle': ['error', { arrays: 'never', objects: 'never', imports: 'never', exports: 'never', functions: 'never' }], // 禁止在数组、对象、导入、导出、函数后面添加逗号
  'indent': ['error', 2, { // 强制使用 2 个空格缩进
    SwitchCase: 1, // switch 语句后面添加空格
    VariableDeclarator: 1, // 变量声明后面添加空格
    outerIIFEBody: 1, // 外层 IIFE 体后面添加空格
    MemberExpression: 1, // 成员表达式后面添加空格
    FunctionDeclaration: { parameters: 1, body: 1 }, // 函数声明后面添加 1 个空格
    FunctionExpression: { parameters: 1, body: 1 }, // 函数表达式后面添加 1 个空格
    CallExpression: { arguments: 1 }, // 调用表达式后面添加 1 个空格
    ArrayExpression: 1, // 数组表达式后面添加 1 个空格
    ObjectExpression: 1, // 对象表达式后面添加 1 个空格
    ImportDeclaration: 1, // 导入声明后面添加 1 个空格
    flatTernaryExpressions: false, // 扁平三元表达式后面添加 1 个空格
    ignoreComments: false // 忽略注释
  }],
  'key-spacing': ['error', { beforeColon: false, afterColon: true }], // 强制使用冒号后面添加空格，前面不加空格
  'keyword-spacing': ['error', { before: true, after: true }], // 强制使用关键字后面添加空格，前面不加空格
}
```



## 集成到开发流程

### 在编辑器中安装 ESLint 插件

在 VS Code 的扩展商店中搜索并安装 `ESLint` 插件，这样在编码过程中，有触发 lint 限制，编辑器会报红提醒。

如需**每次保存文件时，使用 ESLint 进行自动修复**，可以在 VSCode 中配置 settings.json：

```json
{
  // .vscode/settings.json
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit",
    "source.fixAll.eslint": "explicit"
  }
}
```

### 在 package.json 增加 lint 检测

在 `package.json` 的 `scripts` 中添加命令，方便手动检查整个项目。

（也可以在 CI/CD 打包过程中加入 `npm run lint` 的检测）

```json
{
  "scripts": {
    // ... 其他脚本
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx"
  }
}
```

### 在 git 提交过程中增加 lint 检测

为了从源头杜绝不规范的代码被提交到仓库，可以使用 `husky` 和 `lint-staged` 在提交代码前自动进行检查。

安装 `husky` 和 `lint-staged` 依赖：

```bash
npm install --save-dev husky lint-staged
```

**配置 `husky` 和 `lint-staged`：**

1. 运行 `npx husky init` 来初始化 husky，此步骤自动生成 `.husky/pre-commit` 文件，并且在 `package.json` 的 `scripts` 中新增 `"prepare": "husky"`
2. 在 `package.json` 中添加 `lint-staged` 配置：

```json
// package.json
{
  // ... 其他配置
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint"
    ]
  }
}
```

3. 编辑生成的 `.husky/pre-commit` 文件，确保其内容为：

```sh
#!/bin/sh

npx lint-staged
```

现在，每当尝试 `git commit` 时，`lint-staged` 会自动对您本次修改并暂存（staged）的文件运行 `eslint`。如果有错误，提交将会被阻止。


## 常见问题

### 编辑器未按照 ESLint 规则进行检测和报错

**问题描述：**

已经在仓库中安装 ESLint 相关依赖，并在仓库根目录下存在 `eslint.config.js` 或 `.eslintrc.js` 配置文件。在编辑器修改代码后，编辑器未按照 ESLint 规则进行检测和报错。

**解决方案：**

1. 检查编辑器是否安装 VSCode 插件，如果未安装，则自行安装
2. 检查根目录下是 `eslint.config.js` 还是 `.eslintrc.js`
   - 如果是 `.eslintrc.js`，则需要在根目录下创建 `.vscode/settings.json` 文件，告诉编辑器要使用 `.eslintrc.js`
   - 如果不配置 settings.json，就需要将 `.eslintrc.js` 升级成 `eslint.config.js`

```json
{
  "eslint.useFlatConfig": false // 使用 ESLint 的'传统'配置系统（.eslintrc.js），而不是'扁平化'的新配置系统（eslint.config.js）
}
```
