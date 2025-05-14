---
slug: /note/web-worker-learning-notes
title: Web Worker 学习笔记
---
JavaScript (JS) 是单线程的，但是单线程对于多核的 CPU 来说，比较浪费资源。使用 `Web Worker` 可以在主线程外，生成其他 `Worker` 线程，处理主线程之外的任务。主线程与 `Worker` 线程同时运行，互不打扰。`Worker` 线程处理完后，再将处理结果发送给主线程。Web Worker 的主要目的是为了在浏览器中进行后台处理，避免长时间运行的复杂操作阻塞 UI 线程，从而影响用户体验。通过将这些操作放在 Web Worker 中，主线程（UI 线程）可以专注于处理用户交互和渲染，而不会被阻塞。

在使用 `Web Worker` 时，需要注意的是：
1. 同源策略：`Worker` 线程的脚本文件必须与主线程的脚本文件同源。
2. DOM 限制：`Worker` 线程的全局对象和主线程的全局对象不一致，在 `Worker` 线程内部不能使用 `document`、`window` 等对象，但是可以使用 `navigator` 和 `location` 对象。
3. 通信限制：`Worker` 线程和主线程之间的通信是通过消息进行的，`Worker` 线程通过 `postMessage()` 方法向主线程发送消息，主线程通过 `onmessage` 事件监听 `Worker` 线程发送的消息。
4. 脚本限制：`Worker` 线程不能执行 `alert()` 方法和 `confirm()` 方法，但可以使用 `XMLHttpRequest` 对象发出 AJAX 请求。
5. 文件限制：`Worker` 线程无法访问本地文件，即不能打开本地文件，也无法读取本地文件。
6. 作用域限制：`Worker` 线程无法访问主线程的作用域，即无法访问主线程中定义的变量和函数，但是主线程可以向 `Worker` 线程传递数据。

浏览器原生提供了 `Worker()` 构造函数：

```javascript
// jsUrl 是脚本网址，需要遵守同源策略
// options 参数可选，可以指定 Worker 名称，用以区分多个 Worker 线程
const work = new Worker(jsUrl, options);
```

`Worker` 线程对象 API：

```javascript
work.onerror
work.onmessage // 接收 Worker 发送过来的消息
work.onmessageerror
work.postMessage() // 向 Worker 线程发送消息
work.terminate() // 终止 Worker 线程
```

`Worker` 线程内部的全局属性和方法：

```javascript
self.name // Worker 的名字
self.onmessage // 接收主线程发送过来的消息
self.onmessageerror
self.close() // 关闭 Worker 线程
self.postMessage() // 向主线程发送消息
self.importScripts() // 导入外部脚本
```

应用场景：

1. 浏览器轮询服务器状态，以便第一时间得知状态改变：

```javascript
function createWorker(f) {
  var blob = new Blob(['(' + f.toString() +')()']);
  var url = window.URL.createObjectURL(blob);
  var worker = new Worker(url);
  return worker;
}

var pollingWorker = createWorker(function (e) {
  var cache;

  function compare(new, old) { ... };

  setInterval(function () {
    fetch('/my-api-endpoint').then(function (res) {
      var data = res.json();

      if (!compare(data, cache)) {
        cache = data;
        self.postMessage(data);
      }
    })
  }, 1000)
});

pollingWorker.onmessage = function () {
  // render data
}

pollingWorker.postMessage('init');
```

2. 可以再 Worker 线程中，再创建 Worker：

```javascript
// 主线程
var worker = new Worker('worker.js');
worker.onmessage = function (event) {
  document.getElementById('result').textContent = event.data;
};
```

```javascript
// Worker 线程 worker.js
// Worker 线程内部新建了 10 个 Worker 线程，并且依次向这 10 个 Worker 发送消息，告知了计算的起点和终点
var num_workers = 10;
var items_per_worker = 1000000;

// start the workers
var result = 0;
var pending_workers = num_workers;
for (var i = 0; i < num_workers; i += 1) {
  var worker = new Worker('core.js');
  worker.postMessage(i * items_per_worker);
  worker.postMessage((i + 1) * items_per_worker);
  worker.onmessage = storeResult;
}

// handle the results
function storeResult(event) {
  result += event.data;
  pending_workers -= 1;
  if (pending_workers <= 0)
    postMessage(result); // finished!
}
```

```javascript
// 计算任务脚本 core.js
var start;
onmessage = getStart;
function getStart(event) {
  start = event.data;
  onmessage = getEnd;
}

var end;
function getEnd(event) {
  end = event.data;
  onmessage = null;
  work();
}

function work() {
  var result = 0;
  for (var i = start; i < end; i += 1) {
    // perform some complex calculation here
    result += 1;
  }
  postMessage(result);
  close();
}
```

10个 使用web worker 的场景
```markdown
1. 数据拉取：Web Workers 可以用于在后台拉取数据，而不会阻塞 UI 线程，提高用户体验。
2. 图像处理：在 Web Workers 中进行图像处理，如图像压缩、滤镜处理等，可以避免阻塞 UI。
3. 大文件上传：在 Web Workers 中处理大文件的切片和上传，可以避免阻塞 UI。
4. WebGL 计算：在 Web Workers 中进行 WebGL 相关的复杂计算，可以提高渲染性能。
5. 文本解析：对大量文本进行解析，如 Markdown 到 HTML 的转换，可以在 Web Workers 中进行。
6. 数据排序和过滤：对大量数据进行排序和过滤，可以在 Web Workers 中进行，避免阻塞 UI。
7. 本地存储操作：在 Web Workers 中进行 IndexedDB 的操作，可以避免阻塞 UI。
8. 代码语法检查：在 Web Workers 中进行代码的语法检查，如 ESLint，可以避免阻塞 UI。
9. 数据加密和解密：在 Web Workers 中进行数据的加密和解密操作，可以避免阻塞 UI。
10. 机器学习计算：在 Web Workers 中进行机器学习的计算，可以避免阻塞 UI。
```

基于 Web Workers 实现
- [[Service Worker]]
