
```json
"bin": {
	"ghost": "./bin/ghost"
},
```

package.json 中的`bin`字段指定了当包被全局安装时，哪些文件会被链接到系统路径上。这样，这些文件就会被作为命令行工具在终端中使用。
在上述例子中，意味着当我使用 `npm install -g xxx` 安装 package.json 所在的npm 包后，我就以在终端中输入 `ghost` 命令，而当我运行 `ghost` 命令时，执行的是 `./bin/ghost` 文件的代码。

场景：命令行工具开发