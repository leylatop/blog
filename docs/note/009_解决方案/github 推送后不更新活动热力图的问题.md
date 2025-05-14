---
slug: /note/github-push-after-not-updating-activity-heat-map-problem
title: github 推送后不更新活动热力图的问题
---
问题：
我在本地更改了代码仓库，并且git add、git commit、git push推送到github仓库后，github仓库的贡献值未刷新，也就是绿方块没有点亮。但是点到具体的项目内部，是可以看到commit的记录的，这是怎么回事？

回复：
这种情况通常与 Git 提交时使用的邮箱地址有关。GitHub 的贡献图（活动热力图）只会统计与你的 GitHub 账号关联的邮箱地址所做的提交。让我帮你检查几个常见的原因：

1. 检查本地 Git 配置的邮箱：
```bash
git config user.email
```
将输出的邮箱地址与你 GitHub 账号中的邮箱进行对比。

2. 检查 GitHub 账号设置：
- 登录 GitHub
- 进入 Settings → Emails
- 查看已验证的邮箱列表

如果本地 Git 配置的邮箱与 GitHub 账号中的邮箱不匹配，你可以：

方案一：修改本地 Git 配置
```bash
git config --global user.email "你的GitHub邮箱"
```

方案二：在 GitHub 中添加新邮箱
- 在 GitHub Settings → Emails 中添加你当前使用的邮箱
- 验证新添加的邮箱

对于已经提交的记录，你可以通过修改提交历史来更正邮箱地址：
```bash
git rebase -i HEAD~n  # n是要修改的提交数量
git commit --amend --author="Your Name <your@github.email>" --no-edit
git push -f origin main  # 注意：强制推送要谨慎使用
```

需要注意的是，GitHub 的贡献图可能需要一些时间来更新，通常不会立即刷新。如果确认邮箱配置正确，可以等待几分钟后再查看。
