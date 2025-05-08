---
tags:
  - git
---
每次基于主分支新建开发分支后，想要将开发分支推送到远端，都会提示以下内容：

```bash
> git push              
fatal: The current branch qxx/develop has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin qxx/develop

To have this happen automatically for branches without a tracking
upstream, see 'push.autoSetupRemote' in 'git help config'.
```
其中 `qxx/develop` 为新建的开发分支的 name，每次都不得不按照提示再执行这段命令`git push --set-upstream origin qxx/develop`。

为了解决重复性问题，我做了以下尝试：
1. 问 chatgpt，得到了以下脚本：
```sh
#!/bin/bash

set -e # 出现错误时退出脚本

# 获取当前分支名称
BRANCH_NAME=$(git symbolic-ref --short HEAD)

# 若当前分支为master，则不允许提交
if [[ $BRANCH_NAME = "master" ]]; then
    echo "当前分支为master，不允许提交"
    exit 1
fi

# 处理命令行参数
case $1 in
  -f|--force)
    echo "强制提交"
    git push --set-upstream origin "$BRANCH_NAME" --force
    ;;
  *)
    # 推送分支并设置为默认
    git push --set-upstream origin "$BRANCH_NAME"
    ;;
esac

```

2. 将之命名为 `git-push-current-branch.sh`，放在根目录`~`下;
3. 修改脚本的权限 `sudo chmod 777 git-push-current-branch.sh`，为其赋予最高权限；
4. 在`~/.zshrc`文件夹内，自定义缩写 `gps`
```sh
alias gps='~/git-push-current-branch.sh'
```
5. 重启 `terminal` 或 `source ~/.zshrc`，使修改的`.zshrc`文件生效；
6. 在全局任何命令下，均可使用 `gps` 命令推送当前分支到远端。
