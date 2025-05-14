---
slug: /note/ssh-server-and-execute-command
title: ssh server并执行命令
---
- 场景：在本地连接远程服务器，执行远程服务器的命令
- 命令
```bash
ssh archvm P jc restart js-hpr
```

- 实践中遇到的问题：
P 命令无法执行，提示 `P: command not found` 错误

- 原因：
P 命令是自定义的命令，不是系统命令，所以无法执行。

- 改进措施：
1. 使用 `ssh` 命令连接远程服务器
2. 找到 `P` 命令所在的位置，或查看 .bashrc 文件中是否有 `P` 命令的别名
3. 查找 `P` 命令的位置
```bash
whereis P
```
4. 查找 `P` 命令的别名
```bash
alias P
# cat ~/.bashrc | grep P
```

5. 在本例子中，`P`命令是作为别名而存在的，`P`命令的原始命令为 `node /mnt/mb/deploy/platter-gitignore.js`
6. 所以，可以使用 `node /mnt/mb/deploy/platter-gitignore.js` 命令代替 `P` 命令，最终执行的命令为
```bash
ssh archvm node /mnt/mb/deploy/platter-gitignore.js restart js-hpr
```

另外，若 `P` 命令存在于 `/usr/bin/` 目录下，可以直接使用 `P` 命令，如
```bash
ssh archvm P restart js-hpr
```
