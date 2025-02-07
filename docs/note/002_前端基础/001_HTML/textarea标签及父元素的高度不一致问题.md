遇到的问题: 给textarea 设置的高度为60，渲染后其真实高度也是60，且60包含其内容和边框，但是其父元素的高度为64
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    textarea {
      height: 60px;
    }
  </style>
</head>
<body>
  <div>
    <textarea></textarea>
  </div>
</body>
</html>
```

解决方式：
1. 将60px的告诉添加到父级的div上，textarea 高度设置为 100%，这样其本身和父元素的高度均为 60px
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    div {
      height: 60px;
    }
    textarea {
      height: 100%;
    }
  </style>
</head>
<body>
  <div>
    <textarea></textarea>
  </div>
</body>
</html>
```

2. 给 textarea 元素设置display为 block，textarea 默认的display为inline-block。textarea 元素行高和外部轮廓的计算方式可能会因为 display 属性的变化而有所不同，导致父元素的高度不同。这是因为不显式设置 display 默认情况下是 inline-block，而显式设置为 block 后，它在布局中会完整地以块级元素进行呈现，其默认样式和计算方式会因此有差异。
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    textarea {
      height: 60px;
      display: block;
    }
  </style>
</head>
<body>
  <div>
    <textarea></textarea>
  </div>
</body>
</html>
```