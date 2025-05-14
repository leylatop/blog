---
slug: /note/how-to-rewrite-the-command-line-in-node-as-a-sh-file
title: 将node中的命令行改写成.sh文件的步骤
---
1. 创建 `.ssh` 脚本文件
2. 将 `node` 命令行内容改写成 `.sh` 文件内容
3. 给 `.sh` 文件添加执行权限
```bash
chmod +x xxx.sh
```
4. 在终端执行 `.sh` 文件
```bash
./xxx.sh
```
