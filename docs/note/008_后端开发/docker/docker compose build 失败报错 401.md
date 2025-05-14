---
slug: /note/docker-compose-build-failed-with-401-error
title: docker compose build 失败报错 401
---
错误代码
```bash
docker-compose up -d --build

[+] Building 1.9s (8/8) FINISHED
 => [backend internal] load .dockerignore                                                   0.0s
 => => transferring context: 2B                                                             0.0s
 => [backend internal] load build definition from Dockerfile                                0.0s
 => => transferring dockerfile: 512B                                                        0.0s
 => ERROR [backend internal] load metadata for docker.io/library/python:3.12-slim-bullseye  1.8s
 => [frontend internal] load build definition from Dockerfile                               0.0s
 => => transferring dockerfile: 535B                                                        0.0s
 => [frontend internal] load .dockerignore                                                  0.0s
 => => transferring context: 2B                                                             0.0s
 => ERROR [frontend internal] load metadata for docker.io/library/node:22-bullseye-slim     1.8s
 => [backend auth] library/python:pull token for registry-1.docker.io                       0.0s
 => [frontend auth] library/node:pull token for registry-1.docker.io                        0.0s
------
 > [backend internal] load metadata for docker.io/library/python:3.12-slim-bullseye:
------
------
 > [frontend internal] load metadata for docker.io/library/node:22-bullseye-slim:
------
failed to solve: python:3.12-slim-bullseye: failed to authorize: failed to fetch oauth token: unexpected status: 401 Unauthorized
```

原因：本地docker 登录态掉了
解决方法：在命令行重新登录
```bash
docker login
```
