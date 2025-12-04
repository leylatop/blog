---
slug: /note/dockerfile-common-syntax
title: Dockerfile 常用语法
---
## Dockerfile

dockerfile 是用来构建 docker 镜像的文件，dockerfile 文件中包含了一系列的指令，每个指令都用于构建镜像。
在编写完 dockerfile 文件后，可以在dockerfile文件所在的目录下，通过 `docker build -t <镜像名称> .` 命令来构建镜像。


## Dockerfile 示例
```dockerfile
FROM node:18
COPY /app /app

WORKDIR /app

RUN npm install

CMD ["npm", "start"]
```

## 常用语法

- FROM：指定基础镜像
- COPY：将文件或目录复制到镜像中
- WORKDIR：设置工作目录
- RUN：执行命令
- CMD：指定容器启动时执行的命令

## RUN和CMD的区别

- RUN：在构建镜像时执行命令
- CMD：在容器启动时执行命令

| **特征 💡** | **RUN 指令**                                  | **CMD 指令**                                     |
| --------- | ------------------------------------------- | ---------------------------------------------- |
| **执行时机**  | **构建镜像时** (Build Time)                      | **运行容器时** (Run Time)                           |
| **目的**    | 执行一次性任务，如安装依赖、创建目录、编译代码等，结果会固化在镜像中。执行完之后会退出 | 定义容器启动时默认要执行的**主命令**，通常用于启动持续运行的服务。执行完之后可以持续进行 |
| **结果**    | 会创建一个新的 **镜像层** (Image Layer)。              | 不创建镜像层，仅作为容器的默认执行命令。                           |
