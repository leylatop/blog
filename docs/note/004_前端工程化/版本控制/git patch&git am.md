# git patch & git am

#### 使用场景

- 多人异地协作
- 跨仓库cherry-pick commit

#### 核心命令

- git format-patch （命令依次创建补丁文件,并输出文件名）

  ```
  # 将commit-f6056b5c12754936868066f34420ad11aa11cf29 到 commit-a1569102 的所有commit patch一下，会生成很多patch文件，一个commit节点对应一个patch文件
  git format-patch f6056b5c12754936868066f34420ad11aa11cf29..a1569102

  # 将commit-f6056b5c12754936868066f34420ad11aa11cf29 到最新的commit节点patch一下
  git format-patch f6056b5c12754936868066f34420ad11aa11cf29

  # 指定某个commit进行patch
  git format-patch f6056b5c12754936868066f34420ad11aa11cf29 -1 

  # 从当前分支最新节点往前共生成 n 个补丁
  git format -n HEAD

  # 从当前分支最新节点往前共生成 1 个补丁
  git format HEAD^

  # 从当前分支最新节点往前共生成 3 个补丁
  git format HEAD^^^

  # 从当前分支最新节点往前共生成3个补丁
  git format-patch -3
  ```
  

- git am （应用patch文件）

  ```
  git am /*.patch
  ```
  

#### 使用说明

1. 发送方


   1. 在项目新建一个空白文件夹

```
mkdir patch-set
```

   2. 进入 patch-set

   
```
cd patch-set
```
   1. 执行patch命令（若需要patch的内容较多的话）

   
```
git format-patch f6056b5c12754936868066f34420ad11aa11cf29
```
   1. 将 patch-set 打包（zip之类的）
   2. 将压缩包发送给同事


2. 接收方

   1. 若发送者发送的是压缩包，接收方需要将压缩包解压
   2. 将文件夹内的patch 添加到自己的项目内

   
```
git am /*.patch
```

#### 解决冲突
1. git am （应用patch文件时有冲突）
	1. `git am *.patch`提示有冲突
	2. `git  apply --reject *.patch` 自动合入 patch 中不冲突的代码改动，同时保留冲突的部分;
	这些存在冲突的改动内容会被单独存储到目标源文件的相应目录下，以后缀为 `.rej` 的文件进行保存。比如对 `./test/someDeviceDriver.c`文件中的某些行合入代码改动失败，则会将这些发生冲突的行数及内容都保存在 `./test/someDeviceDriver.c.rej` 文件中。我们可以在执行 `git am` 命令的目录下执行 `find  -name  *.rej` 命令以查看所有存在冲突的源文件位置
	3. 依据 步骤2 中生成的 *.rej 文件内容逐个手动解决冲突，然后删除这些 `*.rej` 文件
	4. `git  status`
	5. `git add`
	6. `git am --continue`

