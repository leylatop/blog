---
slug: configure-macbook-from-0
title: 从 0 开始配置 macbook
date: 2025-04-27
authors: leyla
tags: [软件, develop, 系统]
keywords: [软件, develop, 系统]
---

不知道是因为摔过一次，还是因为夏天到了，或者是因为 macbook pro 本身散热性能太差，于是我向公司申请了换一台笔记本电脑，但由于众所周知的原因，公司目前没有新的笔记本存活，于是我拿到了一台前人用过的 2019年的 macbook pro。让运维帮忙重装了一下系统，然后开始了我从 0 开始配置的历程。记录一下，供大家学习，也为了以后方便再次配置。

<!-- truncate -->

## 系统升级
因为拿到的是 2019年的电脑，即使系统重装了，依然是 12.x的系统，一些软件已经不再支持老版本的系统。再加上电脑是 32g 的内存，所以运行速度还算可以，所以我拿到之后，首先升级了一下系统，升级到了 15.4.1。

## 软件安装

### 梯子 🪜
首先是🪜，作用不言而喻，我使用的是[clash-verge-rev](https://github.com/clash-verge-rev/clash-verge-rev)，安装方法是普通的下载安装包，安装。

### 使用 brew 安装软件和 cli

1. 首先安装 [brew](https://brew.sh/)，使用 `brew` 安装常用的软件和 cli 。使用 brew 进行软件管理，是因为 brew 可以清晰的管理软件的安装、升级、卸载等。

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. 安装程序员常用软件

```sh
brew install —-cask google-chrome
brew install —-cask iterm2
brew install —-cask cursor
brew install --cask dingtalk
brew install --cask chatwise
brew install --cask obsidian
brew install --cask postman
brew install --cask raycast
brew install autojump
brew install git
brew install lazygit
```

3. autojump 安装后，需安装提示添加内容到 `.zshrc`，否则不生效

:::tip
brew 常用命令：
- brew search
- brew list
- brew install
- brew update
- brew uninstall
:::

### 安装 oh-my-zsh
```
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```
安装完成后，在用户根目录下会多一个 `.oh-my-zsh` 文件夹，进入该文件夹
```
cd ~/.oh-my-zsh
```


#### 安装并配置主题

```sh
cd themes
git clone git@github.com:romkatv/powerlevel10k.git
```

修改 `.zshrc`文件，修改`ZSH_THEME`为以下内容：
```
ZSH_THEME="powerlevel10k/powerlevel10k"
```

然后重启iterm2，按照自己的喜好一步步进行选择。

#### 安装并配置插件

```sh
cd plugins
git clone https://github.com/zsh-users/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-completions
git clone https://github.com/zdharma-continuum/fast-syntax-highlighting.git 
```

修改 `.zshrc`文件，增加以下内容：
```
plugins=(
  git
  zsh-autosuggestions
  zsh-completions
  fast-syntax-highlighting
)
```

:::warning
1. 修改完 `.zshrc` 文件，需要 `source .zshrc` 才能生效；
1. 如果配置完了不生效，可以检查 `~/.zshrc` 文件下，是否有这一行代码：`source $ZSH/oh-my-zsh.sh`。我在修改 `.zshrc` 文件时，不小心把这一行删掉了，导致后面的配置都不生效，耽误了很久。
:::


### Node
安装volta，用于安装node，以及管理 node 版本。安装完 node版本后，npm 版本也就有了。

```sh
curl https://get.volta.sh | bash
volta install node@22
```

### 通过安装包的方式安装其他软件
- [Bob](https://bobtranslate.com/)：通过这次安装，我感受到了Bob 有个缺点，就是没有账户系统，每次更换电脑都需要重装插件
- [微信输入法](https://z.weixin.qq.com/)：看 [cc 的blog](https://sorrycc.com/)推荐，我开始使用微信输入法，感觉比以前的搜狗好用一些，但是非常新奇的功能还待挖掘

## Git 配置
```sh
git config --global user.name "Your Name"
git config --global user.email "you@your-domain.com"
```

## SSH 生成及配置
```sh
mkdir ~/.ssh
ssh-keygen -t ed25519 -C "github"
```
将生成的公钥复制到 gitlab 或 github 的 ssh 中，才能克隆代码

## npm包安装
全局安装 [change_user_npmrc](https://www.npmjs.com/package/change_user_npmrc)，分别配置了一下 `公司` 和 `个人` 的 npm 镜像源。

（这是我自己写的工具包，目的是能在不同的网络下的方便的切换 npm 镜像。今天看了一下，每天居然有零零星星的几个人进行下载，不知道是否帮助到他人了。）

## 总结
最后，又下载了一下漂亮的静态壁纸，配置鼠标速度和方向，基本就完成了。至此，基本完成了电脑的配置，我用它已经基本可以前端开发了，后续再有不舒服的地方，再进行调整。