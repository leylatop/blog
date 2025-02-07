- `git log --pretty='%aN' --since=3.month.ago | sort | uniq -c | sort -k1 -n -r | head -n 10` --- 查看最近3个月仓库提交排名前10名

* `git log --author="qiaoxx" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -`   ---- 某人的添加/删除行数

* `git log --format='%aN' --since=3.month.ago | sort -u | while read name; do echo -en "$name\t"; git log --author="$name" --pretty=tformat: --numstat | grep "\(.html\|.js\|.jsx\|.ts\|.tsx\|.md\)$" | sort | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -; done`  --查看近3个月仓库的添加/删除行数排行

  
[https://cloud.tencent.com/developer/article/2087250](https://cloud.tencent.com/developer/article/2087250)

git-code-user-commit-stats.sh

```
#!/bin/sh

# 请在 unix 终端或 git-bash 中运行此脚本

printf "\n1. 项目成员数量："; git log --pretty='%aN' | sort -u | wc -l

printf "\n\n2. 按用户名统计代码提交次数：\n\n"
printf "%10s  %s\n" "次数" "用户名"
git log --pretty='%aN' | sort | uniq -c | sort -k1 -n -r | head -n 5
printf "\n%10s" "合计";
printf "\n%5s" ""; git log --oneline | wc -l

printf "\n3. 按用户名统计代码提交行数：\n\n"
printf "%25s +s = +s - %18s\n" "用户名" "总行数" "添加行数" "删除行数"
git log --format='%aN' | sort -u -r | while read name; do printf "%25s" "$name"; \
git log --author="$name" --pretty=tformat: --numstat | \
awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "%15s %15s %15s \n", loc, add, subs }' \
-; done

printf "\n%25s   " "总计："; git log --pretty=tformat: --numstat | \
awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "%15s %15s %15s \n", loc, add, subs }'

echo ""
# shellcheck disable=SC2162
read -n 1 -p "请按任意键继续..."
```