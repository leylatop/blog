在当前目录中执行 `npm link` 命令时，会发生以下步骤：

## 创建符号链接：
- 在全局 `node_modules` 文件夹中创建一个符号链接，指向你当前项目的目录
- 全局链接通常位于：
	- Linux/Mac: `{prefix}/lib/node_modules/<package-name>`
	- Windows: `{prefix}/node_modules/<package-name>`

## 注册包名：
- 使用 `package.json` 中的 `name` 字段作为链接名称
- 这个包名将可以在其他项目中通过 `npm link package-name` 来使用

## 可执行文件链接：
如果你的包在 `package.json` 中定义了 `bin` 字段，相应的可执行文件也会被链接到全局 `bin` 文件夹中

## 举例说明
```json:change_user_npmrc/package.json
{
  "name": "change_user_npmrc",
  "bin": {
	"ly-cn": "./script.js",
	"ly-cnd": "./default.js"
  }
  // ... 其他配置 ...
}
```

1. 执行 `npm link` 后，其他项目就可以通过以下命令来链接到你的包：
```bash
# 当前目录
sudo npm link

# 其他目录
npm link change_user_npmrc
```

2. 也可以在全局任何地方使用 `ly-cn` 或 `ly-cnd` 命令
3. 卸载
```shell
# 在当前目录
sudo npm unlink

# 在其他目录
npm unlink change_user_npmrc
```

## 适用场景
- 本地包开发和测试
- 多个相关项目的并行开发
- 在发布到 npm 之前测试包的功能