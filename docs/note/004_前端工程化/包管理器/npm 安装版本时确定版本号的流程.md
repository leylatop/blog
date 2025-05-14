---
slug: /note/npm-installation-version-determination-process
title: npm 安装版本时确定版本号的流程
---
# npm 安装版本时候根据依赖包的版本确定准备版本号的流程

## 流程
1. 查找`package.json` 中依赖包的版本号

2. 查找可用版本
- npm 会向 registry 查询该包的所有可用版本

3. 版本过滤
- 根据版本范围过滤出符合条件的版本，参考[[npm packages.json依赖版本号规则]]
- 例如 `^4.17.21` 会过滤出所有 4.x.x 且 ≥ 4.17.21 的版本

4. 选择最新版本
- 在符合条件的版本中选择最新的版本
- 如果有 package-lock.json，则优先使用其中锁定的版本

## 实际例子

```json
{
  "dependencies": {
    "express": "^4.0.0",     // 会安装 4.x.x 的最新版本
    "moment": "~2.29.1",     // 会安装 2.29.x 的最新版本
    "lodash": "4.17.21",     // 只会安装这个精确版本
    "react": ">=16.8.0",     // 会安装 ≥16.8.0 的最新版本
    "vue": "2.x"             // 会安装 2.x.x 的最新版本
  }
}
```
