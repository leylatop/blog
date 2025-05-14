---
slug: /note/use-git-command-to-get-the-ranking-of-large-files-in-the-repository
title: 使用git命令获取仓库中已经提交的大文件排名
---
```shell
git rev-list --all | xargs -rL1 git ls-tree -r --long | sort -uk3 | sort -rnk4 | head -40
```
