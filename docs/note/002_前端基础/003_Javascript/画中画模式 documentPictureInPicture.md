---
slug: /note/picture-in-picture-mode-documentpictureinpicture
title: 画中画模式 documentPictureInPicture
---
https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651621742&idx=1&sn=46c0a939f76be131285ab374a6caf3da&chksm=80225eafb755d7b995bbdf538bf26ed530b66aec729ba4be47937e52c4f91d91edb71631e5d4#rd

画中画模式
即在当前网页再打开一个新的网页，这个网页可以悬浮在桌面上

## api
documentPictureInPicture
api 有兼容性，使用的时候要注意兼容性

## 创建窗口
- 创建使用的的api是documentPictureInPicture。requestWindow
- 创建的过程是异步的

```js
// 获取将要放入 PiP 窗口的 DOM 元素
const pipContent = document.createElement("div");

// 请求创建一个 PiP 窗口
const pipWindow = await window.documentPictureInPicture.requestWindow({
	width: 200,  // 设置窗口的宽度
	height: 300  // 设置窗口的高度
});

// 将原始元素添加到 PiP 窗口中
pipWindow.document.body.appendChild(pipContent);
```

## 设置窗口的样式

1. 可以获取主窗口的样式，并且赋给画中画窗口
```js
// 1. document.styleSheets获取所有的css样式信息
[...document.styleSheets].forEach((styleSheet) => {
    try {
        // 转成字符串方便赋值
        const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join('');
        // 创建style标签
        const style = document.createElement('style');
        // 设置为之前页面中的css信息
        style.textContent = cssRules;
        console.log('style', style);
        // 把style标签放到画中画的<head><head/>标签中
        pipWindow.document.head.appendChild(style);
    } catch (e) {
        // 通过 link 引入样式，如果有跨域，访问styleSheet.cssRules时会报错。没有跨域则不会报错
        const link = document.createElement('link');
        /**
         * rel = stylesheet 导入样式表
         * type: 对应的格式
         * media: 媒体查询（如 screen and (max-width: 600px)）
         *  href: 外部样式表的 URL
         */
        link.rel = 'stylesheet';
        link.type = styleSheet.type;
        link.media = styleSheet.media;
        link.href = styleSheet.href ?? '';
        console.log('error: link', link);
        pipWindow.document.head.appendChild(link);
    }
});
```


2. 创建`link`元素，使用 `link` 引入外部 CSS 文件
```js
// 其他不变
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = './pip.css';  // 引入外部 CSS 文件
pipWindow.document.head.appendChild(link);
pipWindow.document.body.appendChild(pipContent);
```

3. 可以在主窗口中使用媒体查询 `@media (display-mode: picture-in-picture)`，为画中画窗口设置样式
```html
<style>
    #pipContent {
        width: 600px;
        height: 300px;
        background: pink;
        font-size: 20px;
    }
    
    <!-- 普通网页中会忽略 -->
    @media (display-mode: picture-in-picture) {
        #pipContent {
            background: lightgreen;
        }
    }
</style>
```

## 事件监听

1. 可以为 `PiP 窗口` 添加`事件监听`，监控画中画模式的 **进入** 和 **退出**。这样，你就可以在用户操作时，做出相应的反馈，比如显示提示或执行其他操作。

```js
// 进入 PIP 事件
documentPictureInPicture.addEventListener("enter", (event) => {
    console.log("已进入 PIP 窗口");
});

const pipWindow = await window.documentPictureInPicture.requestWindow({
    width: 200,
    height: 300
});
// 退出 PIP 事件
pipWindow.addEventListener("pagehide", (event) => {
    console.log("已退出 PIP 窗口");
});
```

2. 监听焦点和失焦事件

```js
const pipWindow = await window.documentPictureInPicture.requestWindow({
    width: 200,
    height: 300
});

pipWindow.addEventListener('focus', () => {
    console.log("PiP 窗口进入了焦点状态");
});

pipWindow.addEventListener('blur', () => {
    console.log("PiP 窗口失去了焦点");
});
```


## 克隆节点
我们会发现我们把原始元素传入到PIP窗口后，原来窗口中的元素就不见了。  
我们可以把原始元素克隆后再传入给PIP窗口，这样原始窗口中的元素就不会消失了

```js
const pipContent = document.getElementById("pipContent");
const pipWindow = await window.documentPictureInPicture.requestWindow({
    width: 200,
    height: 300
});
// 核心代码：pipContent.cloneNode(true)
pipWindow.document.body.appendChild(pipContent.cloneNode(true));
```


[参考地址](https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651621742&idx=1&sn=46c0a939f76be131285ab374a6caf3da&chksm=80225eafb755d7b995bbdf538bf26ed530b66aec729ba4be47937e52c4f91d91edb71631e5d4#rd)
