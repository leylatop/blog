---
slug: /note/docker-image
title: docker 镜像
---
```
# 查看镜像
docker image ls

# 查看镜像详细信息
docker image inspect <image_id>

# 删除镜像
docker image rm <image_id>

# 构建镜像
docker build -t <image_name> .  

# 构建镜像并指定构建目录
docker build -t <image_name> -f <dockerfile_path> .
```
