---
slug: /note/npm-publish-package-steps
title: npm publish 发布包的步骤
---

## 前置
- 这里的发布指的是发布到公开的[npm网站](https://www.npmjs.com)
- 确保自己在npm网站拥有 `npm` 账号，如果没有请自行注册

## 查看当前镜像源
查看当前镜像源的目的是为了确保自己要发布的仓库确实是官方源，如果不是要设置成官方源。
```shell
npm config get registry
# https://registry.npmjs.org/
npm config set registry https://registry.npmjs.org/
```

## 登录
1. 查看自己有没有登录，是用哪个账号登录的。
```shell
npm who
npm whoami
```

2. 如果`npm who`提示没有登录，需要先登录一下。需要区分开注册命令是 `npm adduser` ，这里我们不使用这个命令。
```shell
npm login
```
查看自己有没有登录

## 发布
确保已经登录的情况下执行发布命令，即可发布成功。发布成功后到npm官网，自己的账号下会有一个`package` 生成。

```shell
npm publish
```

## 其他辅助命令
### 发布前本地开发与调试
```shell
# 将当前包注册到全局
sudo npm link

# 其他开发仓库使用当前包
sudo npm link change_user_npmrc

# 将当前包从全局拿掉
sudo npm unlink change_user_npmrc
```

### 检查包名是否已被使用
```shell
npm search <package-name>
```

### 查看将要发布的文件
```shell
npm pack
```

### 迭代包的版本的命令
```shell
npm version patch # 小版本更新 0.0.1 -> 0.0.2
npm version minor # 次版本更新 0.0.1 -> 0.1.0
npm version major # 主版本更新 0.0.1 -> 1.0.0
```



