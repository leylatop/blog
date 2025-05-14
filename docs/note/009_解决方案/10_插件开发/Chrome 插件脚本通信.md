---
slug: /note/chrome-plugin-script-communication
title: Chrome 插件脚本通信
---
在 chrome 插件的开发中，常见的脚本有3大类，分别是：
- background script
- content script
- popup script

其中：
- background script 是插件的后台脚本，它可以监听插件的生命周期事件，也可以监听浏览器的事件，比如 tab 的创建、关闭等
- content script 是插入到页面中的脚本，它可以操作页面的 DOM，也可以与 background script 通信
- popup script 是弹出窗口的脚本，它可以操作弹出窗口的 DOM，也可以与 background script 通信。

background script、content script 和 popup script 之间可以互相通信。Chrome 扩展提供了 chrome.runtime.sendMessage 和 chrome.runtime.onMessage API 来实现这种通信。

以下是一些示例：

### 1. 从 background script 发送消息到 content script：
```javascript
// background script
// 找到当前活动的 tab，然后向它发送消息
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
    console.log(response.farewell);
  });
});
```

在 content script 中接收消息：
```javascript
// content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.greeting == "hello")
    sendResponse({farewell: "goodbye"});
  }
});
```

### 2. 从 popup script 发送消息到 background script：
```javascript
// popup script
chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(response.farewell);
});
```

在 background script 中接收消息：
```javascript
// background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.greeting == "hello")
    sendResponse({farewell: "goodbye"});
  }
});
```

### 3. 从 content script 发送消息到 popup script 是不直接可能的
popup script 只有在 popup 页面被打开并且是活跃状态时才会运行；当点击网页时，popup会被关闭。
但是可以通过 background script 来中转消息。例如，content script 可以先发送消息到 background script，然后 background script 再发送消息到 popup script。以下是一个popup script和content script间接通信的步骤：

##### 3.1. Popup Script 发送消息给 Background Script
在`popup.js`中，您可以这样发送一个消息给background script：

```javascript
// popup.js
chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(response.farewell);
});
```

##### 3.2. Background Script 接收消息并转发给 Content Script

在`background.js`中（或者在Manifest V3中的service worker），您可以监听消息，并将其转发到content script：

```javascript
// background.js
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  // 判断是否是要转发给content script的消息
  if (message.greeting === "hello") {
    // 获取当前活动标签页，并发送消息给content script
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello from popup"}, function(response) {
        sendResponse({farewell: "goodbye"});
      });
    });
    // 为了使异步的sendResponse有效，需要返回true
    return true;
  }
});
```

##### 3. Content Script 接收 Background Script 的消息

在`content script`中，您可以这样监听来自background script的消息：

```javascript
// contentscript.js
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.greeting === "hello from popup") {
    // 执行某些操作
    console.log("Message received in content script");
    sendResponse({farewell: "goodbye from content"});
  }
});
```

##### 3.4. Background Script 发送 Content Script 的响应回 Popup Script

`background.js`中的`sendMessage`回调函数将处理来自content script的响应，并将其发送回popup script。


#tips 
1. `sendResponse` 函数的回应只会被发送到调用 sendMessage 时所提供的回调函数中；比如 `background.js` 向 `content script` 发送消息时，`sendResponse()` 发出的消息将会返回到 `background.js` 中 sendMessage 所提供的回调函数中。
