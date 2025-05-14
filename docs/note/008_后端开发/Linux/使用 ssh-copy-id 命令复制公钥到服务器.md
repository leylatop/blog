---
slug: /note/use-ssh-copy-id-command-to-copy-public-key-to-server
title: 使用 ssh-copy-id 命令复制公钥到服务器
---
使用`ssh-copy-id`命令自动完成将生成的公钥（默认为`~/.ssh/id_rsa.pub`）复制到SSH服务器的`~/.ssh/authorized_keys`文件中

```bash
# ssh-copy-id root@101.37.171.40
ssh-copy-id 用户名@服务器地址
```
