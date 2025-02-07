- npm list 查看该路径已经安装的npm包

- npm list -g 查看全局安装的软件包

* npm view webpack version 查看 webpack包在npm 上最新的可用版本

* npm view webpack versions 查看webpack 所有可用的版本

* npm install webpack@5.0.0 制定安装版本

* npm list -g --depth 0 查看全局安装的包

* npm 更新包
```bash
# 查看最新可用的包
npm outdated

# 更新具体的某个依赖的在package-lock.json版本，前提是这个依赖的版本没有被锁死，查看依赖版本是否被锁死的
npm update [package-name]
```