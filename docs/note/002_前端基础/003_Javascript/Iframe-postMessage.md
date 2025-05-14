---
slug: /note/iframe-postmessage
title: Iframe-postMessage
---
- 父级页面
```html
// parent.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>parent</title>
</head>
<body>
  <iframe src="/iframeMessga/children.html" frameborder="0" width="100%" height="300"></iframe>
  <script>
    // 向子窗口发送消息，但需要等子窗口加载完毕
    document.querySelector('iframe').contentWindow.onload = function() {
      document.querySelector('iframe').contentWindow.postMessage('hello-from-parent', '*');
    }
    // 接收消息(也可以收到自己给自己发送的消息)
    window.addEventListener('message', function(e) {
      console.log(e.data);
    });
    // 如果不指名向哪个窗口发送消息，那么默认是向自己发送消息
    window.postMessage('hello-from-parent', '*');
  </script>
</body>
</html>
```

- 子页面
```html
// child.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <script>
    // postMessage 前面的窗口对象，是接收消息的窗口对象
    // window.parent.postMessage 是向父窗口发送消息
    window.parent.postMessage('hello', '*');

    // 接收消息（也可以收到自己给自己发送的消息）
    window.addEventListener('message', function(e) {
      console.log(e.data);
    });

    // 如果不指名向哪个窗口发送消息，那么默认是向自己发送消息
    window.postMessage('hello-from-children', '*');
  </script>
</body>
</html>
```

- 规则
  - 调用postMessage的窗口对象，是发送消息的窗口对象，谁发送的消息，由谁来接收消息
  - window.parent.postMessage 是父窗口发送消息，也可以说是父窗口能接收到消息
  - window.postMessage 是自己发送消息，也可以说是自己能接收到消息
