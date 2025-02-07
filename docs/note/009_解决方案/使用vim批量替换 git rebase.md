需求：
将除第一个commit之外的commit，全部都squash/fixup 到第一个commit之上

实现方法：
方法一：
使用vim实现批量替换，将所有的pick替换为squash，再手动调整第一个commit的注释
```shell
:%s/pick/squash/g
```

方法二：
使用vim的可视化模式，选中需要替换的行，然后执行替换操作
```shell
ctrl+v 选中需要替换的行的 pick 关键字
c 进入替换模式，所选行的 pick 关键字会被置空
输入需要替换的字符（比如f、s）
esc 连续按两次，退出
```


扩展：
使用vim的可视化模式，选中需要替换的行，在指定位置批量插入字符
```shell
ctrl+v 选中需要操作的行
shift+i 进入插入模式，光标会移动到选中行的第一个字符位置
输入需要插入的字符（比如#）
esc 连续按两次，退出
```

参考地址： https://www.bboy.app/2023/05/16/git%E5%90%88%E5%B9%B6%E5%A4%9A%E4%B8%AAcommit%E4%B8%BA%E4%B8%80%E4%B8%AAcommit/
