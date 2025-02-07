- cli 调试步骤
1. 创建软链接：在根目录下执行 sudo npm link，可以将当前项目链接到全局，这样就可以在任何地方使用
2. 调试 CLI：早终端运行命令 test-cli，即可看到输出 Hello Node CLI


- 发布 CLI 工具
1. 登录 npm：npm login
2. 发布 CLI：npm publish

- Node CLI 生态库
1. 注册解析命令 [commander](https://github.com/tj/commander.js)
2. 交互式命令工具 [inquirer](https://github.com/SBoudrias/Inquirer.js)
3. 命令行提示图标 [Ora](https://github.com/sindresorhus/ora)
4. 命令行字符颜色 [chalk](https://github.com/chalk/chalk)
5. 命令行进度条 [progress](https://github.com/visionmedia/node-progress)
6. 命令行可视化组件[blessed-contrib](https://github.com/yaronn/blessed-contrib)
7. 终端持久化存储 [configstore](https://www.npmjs.com/package/configstore)、[conf](https://www.npmjs.com/package/conf)
8. JS 中执行 Shell 脚本
   1. 方案一：Node 子进程 child_process
   2. 方案二：工具库 shell.js
   3. 方案三：工具库 [zx](https://github.com/google/zx)


[参考文档](https://juejin.cn/post/7178666619135066170?searchId=20240425164257D131991B6B4F3E085D69)