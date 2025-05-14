---
slug: /note/docker-container
title: docker 容器
---
# docker 命令
docker 命令是由docker + 二级命令 + 三级命令 + 参数组成
常用的二级命令有：
- container
- image
- network
- volume
其中，container比较特殊，container可以省略，直接使用docker ps即可查看所有容器

常用的三级命令有：
- ls
- ps
- inspect
- create
- start
- restart
- stop
- kill
- rm
- logs
- exec
- attach

## 容器命令
```
# 查看容器
docker ps

# 查看容器详细信息
docker inspect <container_id>

# 查看所有容器
docker ps -a

# 查看所有容器ID
docker ps -a -q

# 创建并启动容器
docker run <image_name>

# 创建并启动容器并指定端口
docker run -d -p 8080:80 nginx

# 创建并启动容器并指定名称
docker run --name nginx_container nginx

# 创建并启动容器并指定端口和名称，并且在后台运行
# docker run -d -p 8080:80 --name nginx_container nginx

# 创建不启动容器
docker create <image_name>

# 停止容器（优雅的停止）
docker stop <container_id>

# 强制停止容器（暴力停止）
docker kill <container_id>

# 删除容器
docker rm <container_id>
```
