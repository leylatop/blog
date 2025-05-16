---
slug: /note/nginx-http2
title: nginx 服务器支持 http2
keywords: [nginx, http2]
---
偶然间查看自己博客的控制台时，发现http 协议还是 1.1，最近又学习了一下 nginx 服务器，所以想着改一下通信协议，改成 http2。以下改动[参考地址](https://blog.csdn.net/wzj_110/article/details/129939657)。

## 1. 检查openssl版本
openssl的版本必须在`1.0.2e+`及以上，`e+`指的是 e 之后的版本号
```
openssl version
```

## 2. 检查 nginx 版本
nginx 版本需要大于 `1.25.1`
```
nginx -v
```

## 3. 必须开启 https加密
即网站是 `https://xxxxxx`

## 4. 修改https server 配置并保存
`vi conf.d/default.conf`

![image.png](http://images.leyla.top/note/20250516095340.png)


## 5. 重启nginx服务
我的服务器是 CentOS 系统，重启 nginx 服务后，强制刷新网址，此时版本已经变成了 http2

```
systemctl restart nginx.service
```