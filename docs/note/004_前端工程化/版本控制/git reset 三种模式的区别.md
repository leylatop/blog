---
slug: /note/git-reset-three-modes-differences
title: git reset 三种模式的区别
---
- git reset --sort commitid 将指定commit之后的改动回撤，并放到暂存区(stated change：无需git add. 使用git commit 即可重新提交)
- git reset --mixed commitid 将指定commit 之后的改动回撤，并放到非暂存区（unstatged change：需要git add.）
- git reset --hard commitid 将指定commit 之后的改动回撤，并丢掉
