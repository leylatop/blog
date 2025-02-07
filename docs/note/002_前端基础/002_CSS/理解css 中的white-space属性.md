
white-space：怎么控制和处理元素中的空白符号。
whitespace characters：空白字符，通常指在文本中不显示的字符，如空格、制表符、换行符

## 常见属性值
常见的值有：normal、nowrap、pre、pre-wrap、pre-line、break-spaces


## 属性值对比
以下表格是white-space不同属性值对应的处理方式，其中：
- 换行符处理：怎么处理用户在元素中手动敲的回车键
- 制表符处理：怎么处理用户在元素中手动敲的tab键
- 空格符处理：怎么处理用户在元素中手动敲的空格键
- 自动换行：由文本的长度控制，默认情况下，太长了会自动换行，设置禁止换行就不会换行

| 属性值              | 空格符处理 | 制表符处理 | 换行符处理 | 自动换行 | 备注                                                                                                                                            |
| ---------------- | ----- | ----- | ----- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **normal**       | 合并    | 忽略    | 忽略    | 是    | 默认行为，适用于大多数文本内容                                                                                                                               |
| **nowrap**       | 合并    | 忽略    | 忽略    | 否    | 与normal的区别在于，是否自动换行                                                                                                                           |
| **pre-wrap**     | 保留    | 保留    | 保留    | 是    | 与nomal的区别在于，是否保留所有格式                                                                                                                          |
| **pre**          | 保留    | 保留    | 保留    | 否    | 与pre-wrap的区别在于，是否自动换行                                                                                                                         |
| **pre-line**     | 合并    | 忽略    | 保留    | 是    | 与normal的区别自安于，是否保留**换行符**的行为                                                                                                                  |
| **break-spaces** | 保留    | 保留    | 保留    | 是    | 与nomal的区别在于，是否保留所有格式；与pre-wrap的区别在于，在pre-wrap中，空格不会导致换行；在break-spaces中，空格会导致换行。如果一行文本中有足够多的空格，在pre-wrap最多只换一次行，在break-spaecs会按照空格的实际长度控制换行的次数 |


## demo

```html
<!DOCTYPE html>
<html lang="zh">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>White-space 属性示例</title>
  <style>
    .example {
      width: 200px;
      border: 1px solid #ccc;
      padding: 10px;
      margin-bottom: 10px;
      overflow: auto;
    }

    .normal {
      white-space: normal;
    }

    .nowrap {
      white-space: nowrap;
    }

    .pre {
      white-space: pre;
    }

    .pre-wrap {
      white-space: pre-wrap;
    }

    .pre-line {
      white-space: pre-line;
    }

    .break-spaces {
      white-space: break-spaces;
    }
  </style>
</head>

<body>
  <h1>White-space 属性示例</h1>
  <p class="example normal">
    normal: 这是一个                                                                                                                                    示例文本。
      包含连续空白字符、制表符\t和换行符\n。
    (连续空格键被合并、tab键的行为被忽略、换行键的行为被忽略，允许自动换行)
  </p>
  <p class="example nowrap">
    nowrap: 这是一个                                                                                                                                    示例文本。
      包含连续空白字符、制表符\t和换行符\n。
    (连续空格键被合并、tab键的行为被忽略、换行键的行为被忽略，禁止自动换行)
  </p>
  <p class="example pre-wrap">
pre-wrap: 这是一个                                                                                                                                    示例文本。
      包含连续空白字符、制表符\t和换行符\n。
    (连续空格键被保留、tab键的行为被保留、换行键的行为被保留，允许自动换行)
  </p>
  <p class="example pre">
pre: 这是一个                                                                                                                                    示例文本。
      包含连续空白字符、制表符\t和换行符\n。
    (连续空格键被保留、tab键的行为被保留、换行键的行为被保留，禁止自动换行)
  </p>

  <p class="example pre-line">
pre-line: 这是一个                                                                                                                                    示例文本。
    包含连续空白字符、制表符\t和换行符\n。
  (连续空格键被合并、tab键的行为被忽略、换行键的行为被保留，允许自动换行)
  </p>
  <p class="example break-spaces">
break-spaces: 这是一个                                                                                                                                    示例文本。
    包含连续空白字符、制表符\t和换行符\n。
  (连续空格键被保留、tab键的行为被保留、换行键的行为被保留，允许自动换行)
  </p>
</body>

</html>
```