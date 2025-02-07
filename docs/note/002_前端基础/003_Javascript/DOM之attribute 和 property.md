## attribute

attribute 是 HTML 元素上的属性，它们是 HTML 元素的一部分，可以通过 `getAttribute` 和 `setAttribute` 方法来操作。

```html
<div id="myDiv" class="myClass"></div>
<script>
  var myDiv = document.getElementById('myDiv');
  console.log(myDiv.getAttribute('id')); // myDiv
  console.log(myDiv.getAttribute('class')); // myClass
</script>
```

## property

property 是 JavaScript 对象上的属性，它们是 JavaScript 对象的一部分，可以通过直接访问属性来操作。

```html
<div id="myDiv" class="myClass"></div>
<script>
  var myDiv = document.getElementById('myDiv');
  console.log(myDiv.id); // myDiv
  console.log(myDiv.className); // myClass
</script>
```

## 区别

1. attribute 是 HTML 元素上的属性，property 是 JavaScript 对象上的属性
2. 只有非自定义的 HTML 属性才会成为 property，如 id、className 等；
3. 若是html的自定义属性，在使用dom元素本身属性访问时，会返回undefined；若为dom元素本身设置了自定义属性，再通过 `getAttribute` 方法获取，值不会发生变化

```html
<div id="myDiv" foo="test"></div>
<script>
  var myDiv = document.getElementById('myDiv');
  myDiv.foo = 'test-change';
  console.log(myDiv.foo); // test-change
  console.log(myDiv.getAttribute('foo')); // test
</script>
```

```html
<div id="myDiv"></div>
<script>
  var myDiv = document.getElementById('myDiv');
  myDiv.foo = 'test';
  myDiv.setAttribute('foo', 'test-change');
  console.log(myDiv.foo); // test
  console.log(myDiv.getAttribute('foo')); // test-change
</script>
```

## 总结
1. 若attribute 是非自定义属性，则attribute 和 property 是同步的，一个变化会影响另一个
2. 若attribute 是自定义属性，则attribute 和 property 是异步的，一个变化不会影响另一个

## 补充：
特殊的属性：
- style：style 属性是一个对象，可以通过直接访问属性来操作，也可以通过 getAttribute 和 setAttribute 方法来操作；但 getAttribute 方法获取的是字符串（与行内样式一致），而直接访问属性获取的是对象
- class：class 属性是 className 属性的别名，使用 getAttribute 时 参数为 class，使用直接访问属性时 参数为 className；getAttribute 方法获取的是字符串，而直接访问属性获取的是对象
- onclick：onclick 属性是一个函数，可以通过直接访问属性来操作，也可以通过 getAttribute 和 setAttribute 方法来操作；但 getAttribute 方法获取的是字符串，而直接访问属性获取的是函数


[参考资料](https://jakearchibald.com/2024/attributes-vs-properties/)

