---
slug: /note/npm-packages.json-dependency-version-number-rules
title: npm packages.json依赖版本号规则
---
## npm 版本控制机制
npm的版本号，使用语义化版本

```
主版本号.次版本号.修订号（Major.Minor.Patch）
4    .  17   .  21
```


## npm 版本前缀
常见的版本前缀有
1. `^`：匹配最新的大版本依赖包，根据大版本号是否为0，能匹配的版本不一致。
```json
"lodash": "^4.17.21" // 匹配 >=4.17.21 <5.0.0
"lodash": "^0.2.3" //匹配 >=0.2.3 <0.3.0
```
- 大版本号为0，则插入号的行为与波浪号相同，
- 因为此时处于开发阶段，即使是次要版本号变动，也可能带来程序的不兼容。(主版本)


2. `~`： 匹配最近的版本依赖包，根据`~` 后的版本号形态确定运行更新的版本。
```json
"lodash": "~4.17.21" //表示 >=4.17.21 且 <4.18.0
"lodash": "~4.17" //表示 >=4.17.0 且 <4.18.0
"lodash": "~4" //表示 >=4.0.0 且 <5.0.0
```


3. `> >= < <=`: 大于、大于等于、小于、小于等于指定的版本
```json
"lodash": ">4.17.21"
"lodash": ">=4.17.21"
"lodash": "<4.17.21"
"lodash": "<=4.17.21"
```

4. `x`: x的位置可以为任意版本。
```json
"lodash": "4.x" // 4.任意版本.任意版本
"lodash": "4.17.x" // 4.17.任意版本
"lodash": "*" // 任意版本
"lodash": "" // 任意版本
```

5. `-`： 表示版本范围，表示大于等于version1，小于等于version2。
```json
"lodash": "4.17.21 - 4.17.22" // 4.17.21 <= 版本 <= 4.17.22
```

6. `||`： 表示或，满足任意一个版本即可
```json
"lodash": "4.17.21 || 4.17.22 || 4.17.23" // 4.17.21 或者 4.17.22 或者 4.17.23
"lodash": "4.17.21 - 4.17.22 || 4.17.23 - 4.17.24" // 4.17.21 <= 版本 <= 4.17.22 或者 4.17.23 <= 版本 <= 4.17.24
```



## 最佳实践### 最佳实践

1. **开发依赖推荐使用 ^**
- 可以获得 bug 修复和新特性
- 保证不会有破坏性更新

2. **核心依赖推荐使用确切版本**
- 避免意外的更新导致应用出问题
- 特别是框架类依赖

3. **使用 package-lock.json**
- 锁定具体版本
- 确保所有环境使用相同版本

4. **定期更新依赖**
- 使用 `npm outdated` 检查过时的包
- 使用 `npm update` 更新到新版本


参考地址：
[# npm依赖包的版本锁定原理](https://juejin.cn/post/7163150684747989005)
[# pacakge.json 中依赖版本的记忆技巧](https://taxodium.ink/package-json-version-remember-trick.html)

