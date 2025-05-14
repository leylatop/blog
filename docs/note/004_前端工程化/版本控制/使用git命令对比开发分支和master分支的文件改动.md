---
slug: /note/use-git-command-to-compare-file-changes-between-development-branch-and-master-branch
title: 使用git命令对比开发分支和master分支的文件改动
---
```bash
git diff --stat master...feat/v6 | cat
```

