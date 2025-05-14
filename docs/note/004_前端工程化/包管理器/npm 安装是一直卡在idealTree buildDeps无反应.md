---
slug: /note/npm-installation-is-stuck-at-ideal-tree-build-deps-no-response
title: npm 安装是一直卡在idealTree buildDeps无反应
---

如果npm install，一直卡在idealTree buildDeps，最后出现报错：
```shell
npm ERR! code CERT_HAS_EXPIRED
npm ERR! errno CERT_HAS_EXPIRED
npm ERR! request to https://registry.npm.taobao.org/@babel%2fcore failed, reason: certificate has expired
```

## 解决办法
1. 看npm 镜像：

```shell
npm config get registry
```

2. 执行 `curl https://registry.npm.taobao.org` 也没有返回内容；

3. 所以是镜像不能用，我们通过换镜像的方式解决一下；

4. 设置镜像源，我的设置成这个镜像源有用，也可以在网上找其他可用的镜像源；判断镜像源是否可用的方式 `curl https://registry.npmmirror.com` 看是否有内容返回：
```
npm config set registry https://registry.npmmirror.com
```

5. 查看最新镜像源是否生效：
```shell
npm config get registry
```
　

6. 运行npm install安装依赖即可


## 改回官方镜像
如果有一天，自己有条件（有条件的情况自行领悟）可以使用官方镜像了，也可以改回去，改成官方镜像的命令如下：
```shell
npm config set registry https://registry.npmjs.org/
```



参考地址： https://developer.aliyun.com/mirror/NPM
