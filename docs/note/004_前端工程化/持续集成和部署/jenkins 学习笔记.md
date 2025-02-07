## Jenkins是什么？

Jenkins是一个持续集成工具，用户持续的构建和部署。

## Jenkins的工作原理

将代码服务器（git服务器）上的代码拉取下来，通过执行自定义的脚本，实现构建和部署。


## Jenkins环境安装

1. 准备一台linux服务器作为打包机
2. 安装`jdk`和`jenkins`
3. `jenkins`装好之后，登录。然后就可以在 `jenkins` 中新建任务，在任务中配置git仓库的地址和账户密码，以实现拉取代码的目的（登录`jenkins`时，默认名为admin，默认密码很长，在`var/lib/jenkins/secrets/initialAdminPassword`文件夹下存放着）

## 自动构建和部署

怎么才能实现git push到git 服务器后，jenkins自动执行构建和部署任务呢？
1. 在 jenkins 中安装插件（generic webhook trigger、nvm-wrapper、Publish Over SSH）
2. 在git服务器的仓库中的配置中的webhook中增加一个webhook，增加的目的是，在该仓库有更新时，git会向webhook中配置的地址发送一个post请求，告知jenkins，jenkins收到通知后会开始构建，在这一步中需要使用generic webhook trigger插件
3. 在jenkins构建前端项目时，会使用到nvm-wrapper插件
4. 构建完成后，需要ssh连上目标服务器，将打包好的文件，部署到目标服务器上，这一步使用的是 Publish Over SSH 插件。

## 总结

理解jenkins是怎么运行的，需要记住的关键字：任务、插件
