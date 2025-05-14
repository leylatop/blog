---
slug: /note/webpack-building-complication-modulegraph-process
title: webpack-构建Complication 的 ModuleGraph流程
---
1. 定义 moduleGraph,一个Complication保存一个，即每编译一次，创建一个。
```js
const moduleGraph = new ModuleGraph()
```

  
2. 根据入口的路径，创建入口依赖
```js
const indexEntryDenpendency = new EntryDenpendency('src/index.js')
```


3. 根据入口的路径，创建入口模块
```js
const indexModule = new NormalModule('src/index.js')
```

  

4. 根据入口模块的关系对象（每当创建一个新的模块，就会为它创建一个关系对象）
```js
// 参数分别是：父module，当前module,当前依赖
const indexModuleConnection = new ModuleGraphConnection(null, indexModule, indexEntryDenpendency)
```

  
  

5. 向moduleGraph的`_denpendencyMap` 和 `_moduleMap`属性中添加值
```js
moduleGraph._denpendencyMap.set(indexEntryDebpendency, indexModuleConnection) // dependency => 模块的connection

const indexModuleGraphModule = new ModuleGraphModule(indexModule) // moduleGraphModule对象中有 incomingConnections和outgoingConnections，用于记录当前模块被哪些模块引用，当前模块引入了哪些模块

moduleGraph._moduleMap = (indexModule, indexModuleGraphModule) // module => moduleGraphModule
```

6. parser编译indexModule，将其转化成ast，获取其引入的所有外部依赖
7. 创建当前模块的外部依赖，并保存
```js
// esmodule导入一个模块产生的依赖
const harmonyImportSideEffectDenpency = new HarmoneyImportSideEffectDependency('./src/xxx')

indexModule.addDenpendency(harmonyImportSideEffectDenpency)
```

8. 循环当前模块的依赖，重复3-7步骤
```js
const subModule = new NormalModule('./src/xxx')
const subModuleGraphConnection = new ModuleGraphConnection(indexModule, subModule, harmonyImportSideEffectDenpency)

module._dependency.set(harmonyImportSideEffectDenpency, subModuleGraphConnection)
const subModuleGraphModule = new ModuleGraphModule(subModule)
module._moduleMap(subModule, subModuleGraphModule)

// 找subModule的依赖...

```
9. 更新moduleGraphModule
	- `subModuleGraphConnection` 是由 `indexModule` 、`subModule` 、`subModuleDependency` 共同创建出的一个对象，表示一种关系
	- 将 `subModuleGraphConnection`关系放到 `subModuleGraphModule.incomingConnections`中，表示这段关系在`subModuleGraphModule`中，是从外往里走，subModule是被引用的一方
	- 将 `subModuleGraphConnection`放到`indexModuleGraphModule.outgoingConnections`中，表示这段关系在 `indexModuleGrapgModule`中是从里往外走，indexModule是引用他人的一方
```js
indexModuleGrapgModule.outgoingConnections.add(subModuleGraphConnection)
subModuleGraphModule.incomingConnections.add(subModuleGraphConnection)
```


关键词：module、moduleGraphModule、dependency、connection、moduleGraph
