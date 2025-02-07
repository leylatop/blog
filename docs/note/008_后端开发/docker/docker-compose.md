## docker-compose 是什么？

docker-compose 是一个容器编排器，可以通过编写docker-compose.yml，设置想要启动的很多服务即容器，指定服务镜像、端口号、数据卷、自定义网络等；创建数据卷

```bash
# 根据命令所在目录的docker-compose.yml 生成容器，生成的容器名以_1为后缀
docker-compose up
# 启动容器，并在后台运行
docker-compose up -d

# 构建镜像并启动容器（再次编译镜像）
docker-compose up --build

# 停止所有容器
docker-compose stop

# 停止所有容器并删除（stop + remove）
docker-compose down

# 跟踪容器中的日志
docker-compose logs -f
```


## docker-compose.yml 文件
- 在编写 docker-compose.yml 文件时，需要指定版本、服务、镜像、端口号、数据卷、自定义网络等；
- 一个 docker-compose.yml 文件可以包含多个服务，每个服务可以包含多个容器；
- 一个容器可以挂载多个数据卷
- 一个容器可以挂载多个自定义网络
- 两个容器挂载同一个数据卷，会共享数据卷

```yaml
version: '3.8'
services:
  frontend:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - data:/data  # 将data数据卷挂载到容器中
      - ./html:/usr/share/nginx/html  # 将宿主机的html目录挂载到容器中
      - ./conf/nginx.conf:/etc/nginx/conf.d/default.conf  # 将宿主机的conf/nginx.conf 文件挂载到容器中
    networks:
      - custom-network  # 将容器挂载到自定义网络中

  backend:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - data:/data  # 将data数据卷挂载到容器中
      - ./html:/usr/share/nginx/html  # 将宿主机的html目录挂载到容器中
      - ./conf/nginx.conf:/etc/nginx/conf.d/default.conf  # 将宿主机的conf/nginx.conf 文件挂载到容器中
    networks:
      - custom-network  # 将容器挂载到自定义网络中
volumes:
  data:  # 数据卷名称
    driver: local  # 指定数据卷的驱动类型
networks:
  custom-network:  # 自定义网络名称
    driver: bridge  # 指定网络的驱动类型
```



## docker-compose.yml 文件构建镜像

```yml
services:
  db:
    image: mysql:5.7
    volumes:
      - dbdata:/var/lib/mysql  # 将宿主机dbdata数据卷挂载到容器中
    environment:
      - MYSQL_ROOT_PASSWORD=root  # 指定mysql的root密码，会自动创建密码
      - MYSQL_DATABASE=mydb  # 指定mysql的数据库名称，会自动创建数据库
      - MYSQL_USER=myuser  # 指定mysql的用户名，会自动创建用户
      - MYSQL_PASSWORD=mypassword  # 指定mysql的密码，会自动创建密码
  node:
    build: ./node-app  # 指定构建镜像的目录
    dockerfile: Dockerfile  # 指定构建镜像的dockerfile文件
    depends_on:
      - db  # node服务依赖db服务

  web:
    image: nginx:latest
    ports:
      - "8080:80"
    depends_on:
      - node  # web服务依赖node服务
    volumes:
      - ./images/nginx/conf.d:/etc/nginx/conf.d  # 将宿主机的conf.d目录挂载到容器中,后续在/images/nginx/conf.d更改nginx配置文件后，会自动生效
      - ./images/nginx/public:/usr/share/nginx/html  # 将宿主机的public目录挂载到容器中，后续在/images/nginx/public目录下更改html文件后，会自动生效
volumes:
  dbdata:  # 数据卷名称
    driver: local  # 指定数据卷的驱动类型
```

在docker-compose.yml 文件所在的目录下，执行 `docker-compose up` 命令，会根据 docker-compose.yml 文件中的配置，构建镜像并启动容器。
