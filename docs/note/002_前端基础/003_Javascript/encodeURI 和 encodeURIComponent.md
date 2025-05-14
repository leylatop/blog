---
slug: /note/encodeuri-and-encodeuricomponent
title: encodeURI 和 encodeURIComponent
---
网页的 URL 只能包含合法的字符。合法字符分成两类，除了这两类，其他字符出现在 URL 之中都必须转义：
```markdown
- URL 元字符：分号（;），逗号（,），斜杠（/），问号（?），冒号（:），at（@），&，等号（=），加号（+），美元符号（$），井号（#）

- 语义字符：`a-z`，`A-Z`，`0-9`，连词号（`-`），下划线（`_`），点（`.`），感叹号（`!`），波浪线（`~`），星号（`*`），单引号（`'`），圆括号（`()`）

```

- encodeURI 和 encodeURIComponent 都是 JavaScript 中的 URI 编码函数，用于将字符串编码为 URI（Uniform Resource Identifier）格式。它们的区别在于：
```markdown
1. encodeURI()函数会将元字符和语义字符之外的字符，都进行转义;
2. encodeURIComponent()函数会转码除了语义字符之外的所有字符，即元字符也会被转码；
3. encodeURIComponent 比encodeURI 编码的范围更大；
4. encodeURI 适用于将整个url进行编码；
5. encodeURIComponent 适用于将url的组件/参数编码；
```

- 当用户在浏览器中输入URL时，浏览器会自动对URL中的特殊字符进行编码，以确保URL的正确性和可访问性：
```markdown
浏览器通常使用JavaScript中的`encodeURI()`函数来对URL进行编码。这个函数会将URL中的特殊字符转换为它们的编码表示。
如果你需要对编码后的URL进行解码，可以使用JavaScript中的`decodeURI()`函数。这个函数会将编码后的URL转换回原始的URL形式。
```

 - 使用 `new URLSearchParams(location.search).get('name')` 获取到参数，不需要再进行额外的解码（其他[[JavaScript 获取 URL中参数]]的方法）：
```markdown
在 `http://example.com/?name=John%!(NOVERB)20Doe` URL 加载后的页面中，使用 `new URLSearchParams(location.search).get('name')` 获取到的 `name` 变量不需要再进行解码。

`URLSearchParams` 对象会自动解码查询参数的值。在这个例子中，`location.search` 返回的是 `?name=John%!(NOVERB)20Doe`，`URLSearchParams` 会自动将 `%!(NOVERB)20` 解码为空格，所以 `new URLSearchParams(location.search).get('name')`返回的值是 `John Doe`，已经是解码后的结果了。

如果查询参数中包含其他需要解码的特殊字符，`URLSearchParams` 也会自动解码。因此，你不需要手动对查询参数进行解码操作。
```

- [参考资料：Location 对象，URL 对象，URLSearchParams 对象](https://wangdoc.com/javascript/bom/location)
