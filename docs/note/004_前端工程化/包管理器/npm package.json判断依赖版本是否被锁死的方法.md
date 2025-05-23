---
slug: /note/npm-package.json-determine-if-a-dependency-version-is-locked-in-package.json
title: npm package.json判断依赖版本是否被锁死的方法
---
在package.json文件中，如果某个依赖被锁死了，它的版本号会以精确的形式出现在dependencies或devDependencies字段中，例如：

```
"dependencies": {
  "react": "16.13.1",
  "react-dom": "16.13.1"
},
```

在这个例子中，react和react-dom的版本号都被锁死在16.13.1，因此npm会安装这个版本的依赖，并在package-lock.json文件中记录下来，以便在后续安装时锁定相同的版本。

如果某个依赖没有被锁死，它的版本号可能是一个范围或一个通配符，例如：

```
"dependencies": {
  "lodash": "^4.17.20",
  "axios": "~0.21.1"
},
```

在这个例子中，lodash的版本号是一个范围，表示可以安装任何4.x.x版本的依赖，但不包括5.x.x版本。axios的版本号是一个波浪线，表示可以安装0.21.x版本的依赖，但不包括0.22.x版本。

其他版本号的写法见[[npm packages.json依赖版本号规则]]

总结：如果你想查看某个依赖是否被锁死，可以在package.json文件中查找该依赖的版本号。如果版本号是一个精确的数字，那么这个依赖就被锁死了；如果版本号是一个范围或一个通配符，那么这个依赖就没有被锁死。
