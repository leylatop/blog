---
slug: /note/one-command-to-delete-all-docker-containers
title: 一个命令删除所有docker 容器
---
```sh
# 先查找所有容器的id，再删除
sudo docker container rm `sudo docker container ps -a -q`
```
