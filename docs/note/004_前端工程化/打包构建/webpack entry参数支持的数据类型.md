# webpack entry参数支持的类型

## 默认值

如果entry没有指定，则默认值为./src/index.js。

## 字符串

```javascript
entry: './src/index.js'
```

如果entry是字符串，则表示单入口，webpack会从entry指定的文件开始打包。

## 数组

```javascript
entry: ['./src/index.js', './src/main.js']
```

如果entry 是数组，则表示多入口，webpack会从数组中的每个文件开始打包，如果没有特殊配置，最终会打包到main.js中。

## 对象

```javascript
entry: {
  main: './src/index.js',
  sub: './src/main.js'
}
```

如果entry 是对象，则表示多入口，webpack会从数组中的每个文件开始打包，如果没有特殊配置，最终会打包至各自对应的文件中。

entry是对象方式还可以更精细地控制入口的各种配置属性

```javascript
entry: {
  main: {
    import: './src/index.js',
    filename: 'main.js',
    dependOn: ['sub'],
    runtime: 'main.js',
    publicPath: '/assets/'
  }
}
```

- import: 入口模块的路径
- filename: 指定输出文件名
- dependOn: 当前入口所依赖的其他入口
- runtime: 运行时 chunk 的名字，默认是main.js
- publicPath: 针对该入口的publicPath配置

## 函数

```javascript
entry: () => './src/index.js'
entry: () => ['./src/index.js', './src/main.js']
entry: () => ({
  main: './src/index.js',
  sub: './src/main.js'
})
// 返回一个promise
entry: () => new Promise((resolve) => resolve('./src/index.js'))
```
如果entry是函数，则表示异步入口，webpack会从函数返回的值中获取入口文件，支持返回任意entry类型(字符串、数组、对象等)



