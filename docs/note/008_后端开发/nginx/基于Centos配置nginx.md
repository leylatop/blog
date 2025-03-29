## 环境
阿里云购买的CentOS 7.9 64位 


## 配置流程
### 1. 关闭防火墙
检查防火墙的状态时：
- 如果回显中出现`Active: inactive (dead)`信息，说明防火墙处于关闭状态，无需再进行任何操作。
    
- 如果回显中出现`Active: active (running)`信息，说明防火墙已开启，请继续执行步骤[3](https://help.aliyun.com/zh/ecs/user-guide/check-whether-tcp-port-80-is-available#8611ce6002zy8)。
```shell
# 检查防火墙的状态
systemctl status firewalld

systemctl stop firewalld.service


# 或查看防火墙中已开放的端口
firewall-cmd --list-all
FirewallD is not running
```

-
```



### 2. 确认停用 selinux
```sh
getenforce
```
如果是Disabled 就不需要任何处理了

### 3. 安装需要的依赖
```sh
yum  -y install gcc gcc-c++ autoconf pcre pcre-devel make automake openssl openssl-devel
```

### 4. 配置nginx下载仓库
编辑文件`vi /etc/yum.repos.d/nginx.repo`，下面是文件内容：

```sh
# /etc/yum.repos.d/nginx.repo
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/7/$basearch/
gpgcheck=0
enabled=1
```

### 5. 安装nginx
nginx 安装在 `/etc/nginx`目录下：
```sh
yum install nginx -y //安装nginx
nginx -v //查看安装的版本
nginx -V //查看编译时的参数
```

### 6. 查看nginx安装的配置文件和目录
```sh
rpm -ql nginx
```

### 7. 切割日志及查看日志
- 查看日志是否切割：cat /etc/logrotate.d/nginx
```sh
/var/log/nginx/*.log { 
	daily 
}
```

- 查看日志目录下的日志
```sh
ls /var/log/nginx/*.log 
/var/log/nginx/access.log /var/log/nginx/error.log
```

### 8. 查看配置文件路径
| 路径                             | 用途            |
| ------------------------------ | ------------- |
| /etc/nginx/nginx.conf          | 核心配置文件        |
| /etc/nginx/conf.d/default.conf | 默认http服务器配置文件 |

### 9. 启动nginx服务
```sh
systemctl restart nginx.service
```

后续改完配置文件，需要重启nginx
```
systemctl reload nginx.service
```

### 10. 打开安全组的80端口
如果要配置ssl，同样需要打开443端口

![image.png](http://images.leyla.top/blog/20250324231046942.png)


至此，可以通过云服务器的公网ip