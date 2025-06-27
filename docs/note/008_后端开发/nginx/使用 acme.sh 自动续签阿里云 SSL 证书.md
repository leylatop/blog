---
slug: /note/use-acme.sh-to-automatically-renew-aliyun-ssl-certificate
title: 使用 acme.sh 自动续签阿里云 SSL 证书
---
个人免费证书只能用90天，所以每90天需要更换一次，要么手动，要么自动：

## 1. 在服务器上安装 `acme.sh`：
```shell
curl https://get.acme.sh | sh -s email=my@example.com
```

- `acme.sh`会自动安装在登录用户的根目录`~`下，比如`/root/.acme.sh`；
- 安装时，会自动在`.bashrc`中添加alias，这样就可以在全局任何地方使用 `acme.sh`命令；
- 安装后，会自动创建 cronjob， 每天 0:00 点自动检测所有的证书，如果快过期了，需要更新，则会自动更新证书。

**注意**：如果安装完成后提示 `-bash: acme.sh: command not found`，需要手动执行 `source ~/.bashrc`

如果通过以上方式安装不成功，且服务器架在国内，就用下面[这种方式](https://github.com/acmesh-official/acme.sh/wiki/Install-in-China)：

```sh
git clone https://gitee.com/neilpang/acme.sh.git
cd acme.sh
./acme.sh --install -m my@example.com
```


如果没有安装 `git`, 需要先使用 yum 安装`git`:
```sh
sudo yum update
sudo yum install git
```



## 2. DNS 验证方式生成证书
- 在[阿里云的RAM访问控制台](https://ram.console.aliyun.com/users)，生成RAM级的`Ali_Key` 和 `Ali_Secret`，并且为其分配 **`AliyunDNSFullAccess` 和 `AliyunDomainFullAccess`权限**
![image.png](http://images.leyla.top/note/20250627153110.png)

![image.png](http://images.leyla.top/note/20250627153157.png)

![image.png](http://images.leyla.top/note/20250627153238.png)


- 编辑`~/.acme.sh/account.conf`文件，新增`Ali_Key`和`Ali_Secret`的值
```sh
SAVED_Ali_Key='<Ali_Key>'
SAVED_Ali_Secret='<Ali_Secret>'
```

- 生成证书，其中 `leyla.top` 为要生成证书的域名，`*.leyla.top`为其所有的二级域名，生成大概需要 1 分钟时间：
```sh
acme.sh --issue --dns dns_ali -d leyla.top -d *.leyla.top
```

**注意**：如果生成证书过程中报错了，请检查`account.conf` 文件中 `Ali_Key`和`Ali_Secret`的值是否与在RAM中设置的一致、检查RAM中为该用户设置的权限是否正确；

## 3.安装证书
- 默认生成的证书都放在 ~/.acme.sh/\<DOMAIN\>/ 目录下（如 `leyla.top`目录），使用 `–install-cert` 命令，证书将会复制到相应的位置，并重启Web服务。

```sh
acme.sh --install-cert -d leyla.top --key-file /etc/nginx/ssl/leyla.top.key --fullchain-file /etc/nginx/ssl/leyla.top.pem --reloadcmd "systemctl reload nginx.service"
```

- `/etc/nginx/ssl/` 为该服务器之前存储证书的目录
- `systemctl reload nginx.service` 为重启nginx服务的命令

## 4. 检查是否生效
访问网站，检查证书的创建时间和过期时间。创建时间为生成证书的时间、过期时间为90天后。
```
Issued On Monday, February 10, 2025 at 8:00:00 AM
Expires On Monday, May 12, 2025 at 7:59:59 AM
```

⚠️ 注意：如果是在证书过期后，重新生成新的证书。刷新网站后，可能展示如下报错。这个问题很常见，特别是在证书更新后。Chrome的安全策略比较严格，会记住网站的历史安全状态。按照下述步骤清除缓存后，问题应该就解决了：
1. 清除Chrome的安全状态缓存
```
方法一：
1. 在Chrome地址栏输入：chrome://settings/content/all
2. 搜索 "leyla.top"
3. 删除所有相关的站点数据和权限

方法二：
1. 点击地址栏左侧的锁图标或"不安全"标识
2. 选择"站点设置"
3. 点击"重置权限"
4. 点击"清除数据"

```

2. 强制刷新SSL状态
```
# 在Chrome地址栏输入并访问
chrome://net-internals/#hsts

# 在 "Delete domain security policies" 部分
# 输入: leyla.top
# 点击 "Delete"

```

3. 重启浏览器并重新访问
![image.png](http://images.leyla.top/note/20250627163106.png)


参考地址：
[acme.sh/wiki/说明](https://github.com/acmesh-official/acme.sh/wiki/%E8%AF%B4%E6%98%8E)
[## Use Aliyun domain API to automatically issue cert](https://github.com/acmesh-official/acme.sh/wiki/dnsapi#11-use-aliyun-domain-api-to-automatically-issue-cert)



