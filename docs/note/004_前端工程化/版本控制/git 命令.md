- 将本地仓库链到远程仓库上
```bash
git remote add origin + sshurl
```

- 创建分支，并切换过去
```bash
# 基于当前分支/当前节点/当前tag，创建一个 qxx/test 分支，并切换过去
git checkout -b qxx/test

# 基于qxx/aio分支， 创建一个 qxx/test1，并切换过去
git checkout qxx/aio -b qxx/test1

# 基于v12.1.1版本，创建一个 qxx/test2，并切换过去
git checkout v12.1.1 -b qxx/test2

# 基于7b168402d commit节点，创建一个 qxx/test3，并切换过去
git checkout 7b168402d -b qxx/test3
```

- git cherry-pick 某些commit
```bash
git cherry-pick commit1…commit2
# 其中commit1-commit2中间的commit是我们要pick的内容
# commit1 是较早的节点 commit2 是较新的节点
# 被pick的范围，包括commit2，但不包括commit1
```

- 修改commit的作者
```bash
# 修改commit作者为我本人
git commit --amend --reset-author

#修改commit作者为他人
git commit --amend --author="zhangza <zhangza@300624.cn>"
```