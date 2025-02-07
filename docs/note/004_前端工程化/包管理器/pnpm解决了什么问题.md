在使用npm 和yarn安装依赖包时，所有的依赖都会被安装到根目录下的 node_module 中。
在多个仓库中安装同样的依赖时，也会安装在各个仓库中。
这种行为造成了硬盘空间的浪费。

pnpm在安装依赖包时，会把三方包，安装在pnpm 全局的store中。
在使用pnpm install时，会使用软链接的方式，将全局的三方包，链到开发仓库中，这样无论多少个开发仓库，都使用同一份 node_modules。
在menorepo场景下优势更大。

官方说明：pnpm 通过使用**硬链接**和**符号链接**到全局磁盘内容可寻址存储来管理 `node_modules`。

## 解决了什么问题：
1. 一个包全局只保存一份，剩下的都是软硬连接，节省硬盘空间
2. 通过链接的方式，而不是安装或复制，会加快安装速度。
3. 使用pnpm安装依赖包时，在node_modules中创建的是非扁平的node_modules目录，避免了幽灵依赖问题(让你无法使用不是 `package.json` 中指定的模块)，同时保持 `node_modules` 的整洁。


## 兼容性
pnpm与node.js有[兼容性](https://pnpm.io/zh/installation#%E5%85%BC%E5%AE%B9%E6%80%A7)：

| Node.js    | pnpm 8 | pnpm 9 | pnpm 10 |
| ---------- | ------ | ------ | ------- |
| Node.js 14 | ❌      | ❌      | ❌       |
| Node.js 16 | ✔️     | ❌      | ❌       |
| Node.js 18 | ✔️     | ✔️     | ✔️      |
| Node.js 20 | ✔️     | ✔️     | ✔️      |
| Node.js 22 | ✔️     | ✔️     | ✔️      |
## pnpm、npm、yarn功能比较

[功能比较](https://pnpm.io/zh/feature-comparison)

