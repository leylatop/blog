npm 会在npm install之前，执行 npm run preinstall 命令。
如果在package.json 的scripts中定义了 `preinstall` 命令，则会执行定义的 `preinstall`命令。
一般用于安装包之前的检测。