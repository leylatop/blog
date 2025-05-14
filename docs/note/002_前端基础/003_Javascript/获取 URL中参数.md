---
slug: /note/get-url-parameters
title: 获取 URL中参数
---
以[url](http://example.com/?name=John%20Doe&age=12)为例子，以下是几种常见的 JavaScript 获取 URL中参数`name`的方式：

1. 使用 `URLSearchParams` 对象：
   ```javascript
   const urlParams = new URLSearchParams(window.location.search);
   const name = urlParams.get('name');
   console.log(name)
   ```

2. 使用正则表达式：
   ```javascript
   const url = window.location.href;
   const regex = /[?&]name(=([^&#]*)|&|#|$)/;
   const name = decodeURIComponent(url.match(regex)[2]);
   console.log(name)
   ```

3. 使用 `split()` 方法：
   ```javascript
   const url = window.location.href;
   const params = url.split('?')[1].split('&');
   let name;
   for (let i = 0; i < params.length; i++) {
     const param = params[i].split('=');
     if (param[0] === 'name') {
       name = decodeURIComponent(param[1]);
       break;
     }
   }
   console.log(name)
   ```

4. 使用 `URL` 对象：
   ```javascript
   const url = new URL(window.location.href);
   const name = url.searchParams.get('name');
   console.log(name)
   ```

这些方法都可以用来获取 URL 中的参数值，具体选择哪种方式取决于你的需求和代码环境。其中，使用 `URLSearchParams` 对象是最简单和推荐的方式，但需要注意它的兼容性，不适用于所有浏览器。其他方式则更加灵活，适用于各种环境。



#javascript/url
