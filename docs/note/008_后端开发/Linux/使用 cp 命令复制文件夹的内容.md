在使用cp命令进行复制文件夹的时候，会根据目标文件夹是否存在，有不同的复制结果

```sh
mkdir a
cd a
touch a.txt

mkdir b

# b文件夹存在，此时的效果是将a文件夹复制到b文件夹下面
# b/a/a.txt
cp -R a b


# c文件夹不存在，此时的效果是复制a目录，并且将复制的副本改为c
# c/a.txt
cp -R a c
```