- 场景：将本地打包好的文件复制到服务器中的对应位置。所需要使用到的 `linux` 命令为 `scp`
命令及接收：

```bash
scp output-gitignore/bin.js archvm:/var/lib/docker/volumes/imock-jc_imock-volume-data/_data/imock/bin/js-hpr/bin.js
```
将本地的 `output-gitignore/bin.js` 文件复制到 `archvm` 服务器的 `/var/lib/docker/volumes/imock-jc_imock-volume-data/_data/imock/bin/js-hpr/bin.js` 位置。

- 实践中遇到的问题：
1. `archvm` 服务器的目标路径为 `docker` 的挂载路径，需要root权限才能写入。

- 改进措施：将当前用户的权限提升为 `root` 权限，再执行 `scp` 命令。
1. 复制本地用户的 `ssh` 公钥
2. 进入 `archvm` 服务器，使用 `sudo -i` 命令切换到 `root` 用户
3. 使用 `cat /root/.ssh/authorized_keys` 命令查看 `root` 用户的 `ssh` 公钥及文件是否存在
4. 如果不存在，则使用 `touch /root/.ssh/authorized_keys` 创建文件
5. 将本地用户的 `ssh` 公钥复制到 `archvm` 服务器的 `root` 用户的 `authorized_keys` 文件中
6. 使用重启命令重启 `archvm` 服务器，重启命令有多种，可以是 `reboot` 命令，也可以是 `systemctl restart sshd` 命令。
7. 退出 `archvm` 服务器，再次执行 `scp` 命令，即可成功复制文件。


- 参考地址：
[以根用户身份连接到 Linux 虚拟机](https://cloud.google.com/compute/docs/connect/root-ssh?hl=zh-cn)