---
slug: /note/use-git-command-to-view-remote-branch-files
title: 使用git 命令查看远程分支的文件
---
```bash
git show origin/master:package.json | cat
```

查看远程 `master`分支的`package.json` 文件
如果查看本地的则是：
```
git show master:package.json
```
