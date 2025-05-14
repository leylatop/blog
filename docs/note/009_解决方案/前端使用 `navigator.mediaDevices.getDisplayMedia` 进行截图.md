---
slug: /note/use-navigator.mediaDevices.getDisplayMedia-to-screenshot
title: 前端使用 `navigator.mediaDevices.getDisplayMedia` 进行截图
---
重点 api: 
- navigator.mediaDevices.getDisplayMedia()

1. 创建一个新的 MediaStream 对象，其中包含来自用户屏幕的视频轨道。
2. 该方法返回一个 Promise，该 Promise 解析为一个 MediaStream 对象，其中包含来自用户屏幕的视频轨道。
3. 如果用户拒绝了请求，或者由于任何原因无法捕获屏幕内容，则 Promise 将被拒绝。

```js
navigator.mediaDevices.getDisplayMedia()
  .then(stream => {
    // stream 是一个 MediaStream 对象，其中包含来自用户屏幕的视频轨道
  })
  .catch(err => {
    // 处理错误
  });
```


说明：
1. 返回的是一个视频流，其中包含来自用户屏幕的视频轨道。
2. 如果想要实现截图的功能，需要借助 canvas 来实现；截取 video 的某一帧,然后渲染到 canvas 上面,利用 canvas.toDataURL 转换成数据 URL，然后创建一个 img 元素，将数据 URL 赋值给 img.src，最后将 img 元素添加到页面上（canvas.drawImage 在 chromium 有个内存泄露的问题）
3. 实现截图的核心代码如下：

```js
navigator.mediaDevices.getDisplayMedia()
  .then(stream => {
    const video = document.createElement('video');
    video.srcObject = stream;
    // 数据加载完后进行播放
    video.onloadedmetadata = () => {
      video.play();
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      const img = document.createElement('img');
      img.src = canvas.toDataURL('image/png');
      document.body.appendChild(img);
      stream.getTracks().forEach(track => track.stop());
    };
  })
  .catch(err => {
    console.error(err);
  });
```

延展
- 获取设备列表api: navigator.mediaDevices.enumerateDevices()
```js
// 获取设备列表
navigator.mediaDevices.enumerateDevices().then((devices) => {
  // 过滤摄像头列表
  const videoDevices = devices.filter(
    (device) => device.kind === 'videoinput'
  )
  if(!videoDevices) return console.error(`暂无摄像头`)
  deviceId = videoDevices[0].deviceId
})
```

- 获取摄像头流
```js
navigator.mediaDevices.getUserMedia({
  video: {
    deviceId: deviceId
  }
}).then((stream) => {
  // stream 是一个 MediaStream 对象，其中包含来自用户摄像头的视频轨道
  // 通过 video.srcObject = stream; 可以将视频流渲染到 video 标签上
  // 通过 stream.getTracks().forEach(track => track.stop()); 可以关闭摄像头
  const video = document.createElement('video');
  video.srcObject = stream;
  video.onloadedmetadata = () => {
    video.play();
    document.body.appendChild(video);
  };
})
```



参考资料
[# 一个 API,带你打开前端摄像头之门](https://juejin.cn/post/7382386471272218659)
 [screenshot-to-code:将截图转化为代码](https://juejin.cn/post/7350263296271122442)
 https://github.com/abi/screenshot-to-code
 
