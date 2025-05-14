---
slug: /note/use-npm-login-in-command-line
title: 在命令行中使用npm 登录
---
# 在命令行中使用npm 登录
背景：
在本地命令行登录的目的，是为了在本地对`注册表`进行读写。
常见的读命令是`npm install`安装依赖
常见的写的命令是`npm publish` 发布依赖包


## 登录命令：
```bash
npm login --registry=https://registry.modao.cc/npm/
```
注意：
最好在账户的根目录下（mac是`~`路径）进行登录。因为登录后，会往`~/.npmrc`中写入`authToken`和`注册表`。避免出现项目目录下也有`.npmrc`文件造成

```shell
# .npmrc
//registry.modao.cc/npm/:_authToken=NpmToken.72d9949a-cb79-3808-875e-4f17f3a77dfa
registry=https://registry.modao.cc/npm/
```


## 登出命令
```bash
npm logout
```


## 查看当前本地登录的npm 账号
```bash
npm who
```


## 补充：
在本地的命令行中使用npm adduser，可以在`注册表`中创建/注册账号


参考：[npm adduser命令](https://nodejs.cn/npm/cli/v7/commands/npm-adduser/)
