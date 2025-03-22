
### 证书认证机构CA
CA(Certificate Authority)
- CA的角色类似于现实世界中的公证机构
- 负责颁发、认证和管理证书
- CA采用多层次的分级结构，划分为根CA和从属CA
- 被广泛信任的CA，被称之为根CA，根CA可授权其他CA为其下级CA
![image.png](http://images.leyla.top/note/20250321101020668.png)

## 证书类型
### 单域 SSL 证书
单域 SSL 证书适用于一个域，而且仅适用于这一个域。它不能用于认证任何其他域，甚至不能认证为其所对应的域的子域

### 通配符 SSL 证书
通配符 SSL 证书适用于单个域及其所有子域。子域从属于主域。子域的地址通常以“www”之外的其他地址开头。
例如，www.cloudflare.com 有许多子域，如 blog.cloudflare.com、support.cloudflare.com 和 developers.cloudflare.com 等。各自都是 cloudflare.com 主域下的一个子域。

![image.png](http://images.leyla.top/note/20250321103030571.png)


### 多域 SSL 证书（MDC）
多域 SSL证书（或MDC）在一个证书上列出多个不同的域。使用 MDC，彼此不是子域的域可以共享证书。

![image.png](http://images.leyla.top/note/20250321103048924.png)



## SSL证书验证级别
SSL证书根据**验证级别**分为：
- 域名型SSL证书（DV SSL）
- 企业型SSL证书（OV SSL）
- 增强型SSL证书（EV SSL）

![image.png](http://images.leyla.top/note/20250321102427545.png)
