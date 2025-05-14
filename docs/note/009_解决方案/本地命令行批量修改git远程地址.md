---
slug: /note/local-command-line-batch-modify-git-remote-address
title: 本地命令行批量修改git远程地址
---
## 1. 在要批量修改的文件夹的上一级目录下新建 `change_git.sh` 脚本：

```sh
#!/bin/bash
# 旧地址
old_url="git@mdgit.300624.cn"
# 新地址
new_url="git@git.modao.ink"

changed_count=0
for file in Git/**/.git/config; do 
  # 使用old_url替换new_url
  sed -i '' "/\[remote \"origin\"\]/,/^\[.*\]/ s|url = ${old_url}|url = ${new_url}|g" "$file"
  sed -i '' "/\[remote \"origin\"\]/,/^\[.*\]/ s|url = ${old_url}|url = ${new_url}|g" "$file"
  echo "修改 $file 成功"
  changed_count=$((changed_count + 1))
done

# 使用find命令查看当前目录下的子文件夹数量
echo "当前目录下的子文件夹数量: $(find . -maxdepth 1 -type d | wc -l)"
echo "总共修改了 $changed_count 个文件"
```

## 2. 修改脚本权限
```sh
chmod +x change_git.sh
```

## 3. 使用root权限执行脚本
```sh
sudo change_git.sh
```

---

其他：
```sh
#!/bin/bash

# 旧地址
old_url="git@mdgit.300624.cn"
# 新地址
new_url="git@git.modao.ink"

old_http_url="https://mdgit.300624.cn/"
new_http_url="https://git.modao.ink/"

changed_count=0
base_dir="MockingBot"
for file in ${base_dir}/**/.git/config; do 
  # 使用old_url替换new_url
  sed -i '' "/\[remote \"origin\"\]/,/^\[.*\]/ s|url = ${old_url}|url = ${new_url}|g" "$file"
  sed -i '' "/\[remote \"origin\"\]/,/^\[.*\]/ s|url = ${old_http_url}|url = ${new_http_url}|g" "$file"
  echo "修改 $file 成功"
  changed_count=$((changed_count + 1))
done

# 使用find命令查看当前目录下的子文件夹数量
echo "当前目录下的子文件夹数量: $(find ${base_dir}/ -maxdepth 1 -type d | wc -l)"
echo "总共修改了 $changed_count 个文件"
```

```sh
#!/bin/bash

# 旧地址
old_url="https://git.modao.ink/"
# 新地址
new_url="git@git.modao.ink:"

changed_count=0
base_dir="MockingBot"
for file in ${base_dir}/**/.git/config; do 
  # 使用old_url替换new_url
  sed -i '' "/\[remote \"origin\"\]/,/^\[.*\]/ s|url = ${old_url}|url = ${new_url}|g" "$file"
  echo "修改 $file 成功"
  changed_count=$((changed_count + 1))
done

# 使用find命令查看当前目录下的子文件夹数量
echo "当前目录下的子文件夹数量: $(find ${base_dir}/ -maxdepth 1 -type d | wc -l)"
echo "总共修改了 $changed_count 个文件"

```
