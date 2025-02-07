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
