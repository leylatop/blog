---
slug: /note/stylis-learning-notes
title: stylis学习笔记
---
- stylis 是一个 css语法处理器
- 官方文档: [stylis](https://github.com/thysultan/stylis)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>使用 stylis 进行css预处理</title>
  <style>
    body {
      background-color: #f0f0f0;
    }
  </style>
</head>
<body>
  <button>你好</button>
  <script src="https://unpkg.com/stylis"></script>
  <script>
    const cssList = [ // 各种选择器的css语法
      `body {
        color: red;
      }`,
      `#app {
        background-color: #f0f0f0;
      }`,
      `.container {
        width: 100%;
      }`,
      `h1{all:unset}`
    ]

    const {compile, serialize, stringify, tokenize} = stylis
    // compile 用于编译css语法
    // serialize 用于序列化css语法
    // stringify 用于将css语法转换为字符串
    // tokenize 用于将css语法转换为token
    console.log(compile(cssList.join('')))
    console.log(serialize(compile(cssList.join('')), stringify))
    console.log(tokenize('h1 h2 h3 [h4 h5] fn(args) "a b c"'))
  </script>
</body>
</html>
```
