
- 修改nginx 配置文件后，需重启nginx
```bash
# 1. 修改nginx配置文件
vim /usr/local/nginx/conf/nginx.conf

# 2. 重新加载文件
/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
 
 # 3. 重新加载并启动Nginx
/usr/local/nginx/sbin/nginx -s reload
```

- 小知识
查找是否安装过nginx及nginx的安装位置：whereis nginx
查看当前目录的位置：pwd
nginx/conf文件：/usr/local/nginx/conf/nginx.conf


- nginx 相关命令
其中 `./nginx` 为在`/usr/local/nginx/sbin/`目录下操作时的相对位置，如果不在 `/usr/local/nginx/sbin/`目录下，可以使用 ` /usr/local/nginx/sbin/nginx` 代替：
```bash
./nginx -s reload # 重新加载nginx配置文件并重启nginx

./nginx # 启动nginx

./nginx -s stop # 强制停止nginx

./nginx -s reopen # 重启nginx

./nginx -s quit # 优雅的停止nginx

nginx -v # 查看nginx的版本

killall nginx # 杀死所有nginx进程

ps -ef | grep nginx # 查看nginx是否启动
```


- 参考地址
够买完服务器后，参考下面这个地址，配置nginx服务器
[# 3分钟搞懂阿里云服务器安装Nginx并配置静态访问页面](https://developer.aliyun.com/article/933711)