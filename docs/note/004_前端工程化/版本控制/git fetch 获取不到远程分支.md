---
slug: /note/git-fetch-cannot-pull-remote-branches
title: git fetch 获取不到远程分支
---
问题：
git fetch的时候不能拉取到远程其他分支 & tag的变化情况

解决思路：
打开根目录 `.git/config`，修改 `origin -> fetch` 为以下:
![图片](http://images.leyla.top/note/Pastedimage20230926161029.png)
