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

## 2. DNS 验证方式生成证书
- 在[阿里云的RAM访问控制台](https://ram.console.aliyun.com/users)，生成RAM级的`Ali_Key` 和 `Ali_Secret`，并且为其分配 **`AliyunDNSFullAccess` 和 `AliyunDomainFullAccess`权限**

- 编辑`~/.acme.sh/account.conf`文件，新增`Ali_Key`和`Ali_Secret`的值
```sh
SAVED_Ali_Key='<Ali_Key>'
SAVED_Ali_Secret='<Ali_Secret>'
```

- 生成证书，其中 `leyla.top` 为要生成证书的域名，`*.leyla.top`为其所有的二级域名
```sh
acme.sh --issue --dns dns_ali -d leyla.top -d *.leyla.top
```

**注意**：如果生成证书过程中报错了，请检查`account.conf` 文件中 `Ali_Key`和`Ali_Secret`的值是否与在RAM中设置的一致、检查RAM中为该用户设置的权限是否正确；

## 3.安装证书
- 默认生成的证书都放在 ~/.acme.sh/\<DOMAIN\>/ 目录下（如 `leyla.top_ecc`目录），使用 `–install-cert` 命令，证书将会复制到相应的位置，并重启Web服务。

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


参考地址：
[acme.sh/wiki/说明](https://github.com/acmesh-official/acme.sh/wiki/%E8%AF%B4%E6%98%8E)
[## Use Aliyun domain API to automatically issue cert](https://github.com/acmesh-official/acme.sh/wiki/dnsapi#11-use-aliyun-domain-api-to-automatically-issue-cert)



