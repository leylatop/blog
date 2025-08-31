## 背景：
1. 新同事使用了前同事未重装系统的电脑；
2. git clone 时提示无权限；

## 原因：
1. git clone 时，**系统默认使用了前同事残留的 SSH 私钥** 来连接 Git 远程仓库，但前同事已经离职了，所以自然连接不上；
2. 需要让它**用你自己的私钥**；


## 策略：
1. **判断系统连接远程仓库时用的是哪个 SSH 私钥**？
加上 `-v`（verbose）参数，就能看到具体用了哪个私钥；输出里有：`Offering public key: /Users/yourname/.ssh/id_rsa`，这就是它当前使用的私钥路径。

```bash
# git@ 后面加自己使用的环境的域名
# 输出内容：Welcome to GitLab, @qiaoxx!
ssh -T git@git.modao.ink

# 加v可以看到更多参数
ssh -vT git@git.modao.ink
```

2. **指定系统使用的 SSH 私钥**？
编辑 `~/.ssh/config` 文件，添加 git 的 host，如下, 替换 `your_private_key` 为你自己的私钥文件，比如 `id_rsa_github`。

```
Host git.modao.ink
  HostName git.modao.ink
  User git
  IdentityFile ~/.ssh/your_private_key
  IdentitiesOnly yes
```


3. 怎么**指定某个 SSH 私钥** 来看看连接远程 Git 服务（如 GitHub、GitLab）后，对方认为你是谁（即用哪个账号）？
```bash
ssh -i ~/.ssh/your_private_key -T git@git.modao.ink
# 返回内容：Welcome to GitLab, @your_username!
```


