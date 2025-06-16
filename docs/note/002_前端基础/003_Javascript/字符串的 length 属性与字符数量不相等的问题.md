在 js 中，字符串的 length 属性，不一定等于字符串的长度。原因是因为 length 属性表示的是字符串中的**码元**的数量，而非字符个数。

## 码元
**码元**是编码字符集中的最小单位，用于构建和表示字符。在不同的编码方案中，码元的大小可能不同：

- 在 UTF-8 中，码元是 8 位（1 字节）
- 在 UTF-16 中，码元是 16 位（2 字节）
- 在 UTF-32 中，码元是 32 位（4 字节）

## JavaScript 中的码元
在 js 中，使用的是 utf-16 编码来表示字符串，因此在 js 中：

- 每个码元是 16 位，也就是 2 字节
- 字符串的 `length` 属性返回的是**码元的数量**，而不是字符的数量
- 字符串的索引操作也是基于码元的
- 每个字符可以被编码为 1 个或 2 个码元（看字符在 unicode 中的范围）

### 1. 基本多文种平面 (BMP) 字符
对于 Unicode 编码值在 U+0000 到 U+FFFF 范围内的字符（称为基本多文种平面字符）：

- 每个字符只需要一个码元表示
- 例如：英文字母、数字、常见符号、中日韩基本汉字等
- 这种情况下，字符数量等于码元数量

```javascript
const str = "Hello";
console.log(str.length); // 5 (5个码元，5个字符)
```

### 2. 辅助平面字符 (Supplementary Plane Characters)
对于 Unicode 编码值在 U+10000 到 U+10FFFF 范围内的字符（称为辅助平面字符）：

- 每个字符需要两个码元表示（使用代理对/surrogate pair）
- 例如：某些不常用汉字、古文字、emoji 等
- 这种情况下，字符数量小于码元数量

```javascript
const str = "𠮷"; // 这是一个生僻汉字，不是常见的"吉"字
console.log(str.length); // 2 (2个码元，但只有1个字符)
```

### 3. 组合字符
某些字符可以由基础字符加上组合标记构成：

- 例如，带重音符号的拉丁字母可以由基本字母加上重音符号组成
- 虽然视觉上是一个字符，但在 Unicode 中可能是多个码位，对应多个码元
- 这种情况下，视觉字符数量也小于码元数量

```javascript
const str = "é"; // 可以是一个码元(é)或两个码元(e + ́ )
console.log(str.length); // 1 或 2，取决于表示方式
```

## JavaScript 中正确计算字符数量的方式
由于 `length` 属性只计算码元数量，要正确计算字符数量，可以使用以下方法：

### 使用 `Array.from()` 或展开运算符
```javascript
const str = "𠮷😊";
console.log(str.length); // 4 (4个码元)
console.log(Array.from(str).length); // 2 (2个字符)
console.log([...str].length); // 2 (2个字符)
```

### 使用 `String.prototype.codePointAt()`
```javascript
function getCharCount(str) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    const code = str.codePointAt(i);
    if (code > 0xFFFF) {
      // 如果是辅助平面字符，跳过下一个码元
      i++;
    }
    count++;
  }
  return count;
}
```