今天在掘金前端推送的内容中看到了这一条：cookie能否跨域名共享呢？带着这个疑问，我们来往下分析一下。

## 首先回答：什么是跨域名？

跨域名，也就是跨域。跨域指的是在一个域名下的网页或脚本，试图获取另外一个域名下的资源，这种行为就叫跨域。这里的“域”包括协议、域名和端口。例如，从 `http://modao.cc` 访问 `http://leyla.modao.cc`就是跨域。跨域是一种浏览器的安全策略，一般情况下不允许跨域访问资源，但可以通过一些方法设置允许跨域访问资源。

## 其次回答：cookie能否跨域名共享？

可以，但是只能在当前域名及其子域名之间共享cookie。比如可以实现`http://modao.cc` 和 `http://leyla.modao.cc`之间的cookie共享。设置方法如下：

- 设置合适的Domain：
在 `modao.cc` 设置cookie时，将domain属性设置为 `.modao.cc`，这样可以让cookie在`modao.cc`及其所有的子域名中共享。
```js
document.cookie="sessionId=abc123; domain=.modao.cc; path=/"
```

- 使用cookie的SameSite属性，将其设置为`none` ，并确保使用HTTPS
```js
document.cookie = "sessionId=abc123; domain=.modao.cc; path=/; SameSite=None; Secure";
```

## 如需在完全不同的域名间共享该如何？

- 使用服务器端会话
- 实现单点登录（SSO）系统
- 使用基于 token 的认证机制
