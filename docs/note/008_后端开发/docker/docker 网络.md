---
slug: /note/docker-network
title: docker 网络
---
## 查看docker网络

```bash
# 查看所有网络
docker network ls

# 查看网络详情（可以查看绑定该网络模式的所有容器）
docker network inspect bridge
```

容器与外部进行网络通信，有三种网络模式：
1. host主机模式：容器使用宿主机的ip与外界进行通信，没有自己的ip。可以进行网络请求。
2. none模式：容器不与外界进行网络通信，没有自己的ip。不能进行网络请求。
3. bridge桥联模式：容器与宿主机的ip不同，有自己的专属ip。不同的容器之间可以通过不同ip进行访问。

## 其他命令

```bash
# 创建自定义网络（不同的自定义网络之间的容器之间不能网络通信）
docker network create dev_bridge

# 把container添加到dev_bridge内（container可以添加多个自定义网络）
docker network connect dev_bridge container

#  把container与dev_bridge断开
docker network disconnect dev_bridge container

# 删除自定义网络
docker network rm dev_bridge

```

## 宿主机对docker进行的网络分配
宿主机的DHCP服务器会对docker进行自动分配网络ip地址。

## 不同宿主机下的容器之间怎么进行网络通信

已知：
A宿主机下的容器1
B宿主机下的容器1
希望A宿主机下的容器1能与B宿主机下的容器1进行通信

不同宿主机下的容器之间怎么进行网络通信，能不能通信，取决于容器使用的网络模式：
1. 如果容器使用的是none模式，则无论如何都不能进行网络通信；
2. 如果容器使用的是host模式，则使用宿主机的ip进行网络通信；
3. 如果容器使用的是bridge模式，则此时A宿主机下的容器1和B宿主机下的容器1都是由DHCP服务器分配的内网ip，是不能直接进行通信的。此时需要A和B宿主机与各自的容之间先进行端口映射，再由宿主机与宿主机之间通过ip地址+端口号进行通信，才能达到容器之间的网络通信。
