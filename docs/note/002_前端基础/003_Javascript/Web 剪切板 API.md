## Clipboard API 异步剪切板 API

剪贴板允许以与 MIME 类型相关联的多种表示形式存储信息，从而为这两种用例提供服务。W3C 剪贴板规范规定，在写入和读取剪贴板时，必须支持这三种数据类型：

- `text/plain` 表示纯文本。
-  `text/html` 表示 HTML。
- `image/png` 用于 PNG 图像。

通过异步剪贴板应用程序接口的 `read` 方法读取特定表示方法：

```js
const items = await navigator.clipboard.read();

for(let item of items) {
	if (item.types.includes("text/html")) {
    const blob = await item.getType("text/html");
    const html = await blob.text();
	} else if (item.types.includes("text/plain")) {
    const blob = await item.getType("text/plain");
    const text = await blob.text();
  } else if (item.types.includes("image/png")) {
    const blob = await item.getType("image/png");
    const image = await blob.arrayBuffer();
  }
}
```

通过异步剪贴板应用程序接口的 `write` 方法写入特定表示方法：

```js
const htmlBlob = new Blob(["<h1>Hello, world!</h1>"], {type: "text/html"});
const textBlob = new Blob(["Hello, world!"], {type: "text/plain"});
const imageBlob = new Blob([new Uint8Array([0, 1, 2, 3])], {type: "image/png"});
await navigator.clipboard.write([new ClipboardItem({ "text/html": htmlBlob })]);
await navigator.clipboard.write([new ClipboardItem({ "text/plain": textBlob })]);
await navigator.clipboard.write([new ClipboardItem({ "image/png": imageBlob })]);

// const clipboardItem = new ClipboardItem({
//   "text/html": htmlBlob,
//   "text/plain": textBlob,
//   "image/png": imageBlob
// });
// await navigator.clipboard.write([clipboardItem]);
```

## Clipboard Events API 剪切板事件 API

监听 `copy` 事件，阻止默认行为，然后使用 `setData` 方法设置剪切板数据：
```js
document.addEventListener("copy", (e) => {
  e.preventDefault(); // Prevent default copy behavior

  e.clipboardData.setData("text/plain", "Hello, world");
  e.clipboardData.setData("text/html", "Hello, <em>world</em>");
  e.clipboardData.setData("image/png", new Blob([new Uint8Array([0, 1, 2, 3])]));
});
```

监听 `paste` 事件，阻止默认行为，然后使用 `getData` 方法获取剪切板数据：
```js
document.addEventListener("paste", (e) => {
  e.preventDefault(); // Prevent default paste behavior

  const text = e.clipboardData.getData("text/plain");
  const html = e.clipboardData.getData("text/html");
  const image = e.clipboardData.getData("image/png");
});
```
监听 `cut` 事件，阻止默认行为，然后使用 `setData` 方法设置剪切板数据：
```js
document.addEventListener("cut", (e) => {
  e.preventDefault(); // Prevent default cut behavior

  e.clipboardData.setData("text/plain", "Hello, world");
  e.clipboardData.setData("text/html", "Hello, <em>world</em>");
  e.clipboardData.setData("image/png", new Blob([new Uint8Array([0, 1, 2, 3])]));
});
```

## Clipboard API 和 Clipboard Events API 的区别
1. Clipboard API 是异步的，而 Clipboard Events API 是同步的。
2. Clipboard API 支持读取和写入操作，可以处理文本、图像和 HTML 数据，而 Clipboard Events API 支持复制、粘贴和剪切操作，且能处理的类型较多。
3. Clipboard API 使用 `ClipboardItem` 对象来表示剪贴板数据，而 Clipboard Events API 使用 `DataTransfer` 对象来表示剪贴板数据。
4. Clipboard API 使用Promise的异步方法，如 navigator.clipboard.readText() 或 navigator.clipboard.writeText()；而 Clipboard Events API 使用事件监听器，通常在事件处理程序中同步使用，如 event.clipboardData。
5. Clipboard API 需要用户授权或在安全上下文（如 HTTPS）中使用，而 `Clipboard Events API` 不需要用户授权。
6. Clipboard API 较新，支持性较差，而 `Clipboard Events API` 支持性较好。
7. Clipboard API 适用于需要在任何时候访问剪贴板的情况，如实现"复制到剪贴板"按钮，而 `Clipboard Events API` 适用于需要在特定事件发生时访问剪贴板的情况，如复制、粘贴和剪切操作。



https://alexharri.com/blog/clipboard