---
slug: /note/use-url-createobjecturl-to-convert-file-to-url
title: 使用URL.createObjectURL 将文件转为 url
---
## 基本语法
```js
const url = URL.createObjectURL(blob)
```
将 blob 或 file 转为 url，url 可以作为 html 元素的 src 属性值使用

- 当不再需要 url 时，使用 `URL.revokeObjectURL(url)` 将其释放； 
- 创建出的 url 会在 document 卸载后自动释放（所以如果需要在另一个页面使用该 url，则当前页面不能关闭）；
- 创建为url 的文件，不能直接从由 URL.createObjectURL() 创建的 URL“转换回”原始文件对象，因为该 URL 只是一个临时引用指针，而不是文件数据本身的转换。

## 场景
### 场景一
从服务器下载文件，并将其转为url后，渲染在img 元素中
```js
fetch("flowers.jpg")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    return response.blob();
  })
  .then((myBlob) => {
    myImage.src = URL.createObjectURL(myBlob);
  })
  .catch((error) => {
    console.error("There has been a problem with your fetch operation:", error);
  });
```

### 场景二
用户从本地上传 img 图片到服务器前，使用 img 元素回显用户选中的图片
```js
// html代码
<input type="file" id="file">
<img id="img1" style="width: 200px;height: auto" />

// js代码
document.querySelector('#file').onchange = function (e) {
	const file = e.target.files[0]
	
	const URL1 = URL.createObjectURL(file)
	console.log(URL1)
	document.querySelector('#img1').src = URL1
}

```

### 场景三
从 url 中解析成blob文件，但是 blob 文件不是file文件，没有保存 file 文件的文件名、文件类型等信息
如果一定要解析为 file 文件，则再将 blob 转为 file
```js
// 获取 blob
function getFileFromObjectURL(url) {
  return fetch(url)
    .then(response => response.blob())
    .then(blob => {
      return blob
    })
}
// 将 blob 转为 file（file 文件有文件名、文件类型等信息）
function blobToFile(blob, fileName, lastModified = Date.now()) {
  return new File([blob], fileName, {
    type: blob.type,
    lastModified: lastModified
  });
}

const blob = await getFileFromObjectURL(url);
const file = blobToFile(blob, 'filename.ext');
```