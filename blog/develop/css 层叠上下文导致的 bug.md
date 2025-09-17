---
slug: /css-layer-context-bug
title: css 层叠上下文导致的 hover 抓不到子元素的 bug
date: 2025-09-17
tags:
  - css
  - 层叠上下文
---

parent 的 opacity < 1，使 parent 形成了上下文，child-container 的 z-index 相对于的是parent上下文，不参与全局的上下文。会被后面的文档流覆盖掉。所以会出现 hover 抓不到子元素的现象。

<!-- truncate -->

代码如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div class="container">
    <ol>
      <li>hover toggle child, 展示 child-container</li>
      <li>hover child-container, 会出现“抓不到”的现象</li>
    </ol>
    <div class="grand-parent">
      <div class="parent">
        toggle child
        <div class="child-container">
          <div class="child">1</div>
          <div class="child">2</div>
          <div class="child">3</div>
        </div>
      </div>
      
    </div>
    <div class="sibling">
      <p>1</p>
      <p>2</p>
      <p>3</p>
      <p>4</p>
      <p>5</p>
    </div>
  </div>
  <style>
    .grand-parent {
      position: relative;
    }
    /* parent 的 opacity < 1, 使 parent 形成了上下文 */
    .parent {
      position: relative;
      opacity: 0.8; 
      cursor: not-allowed;
    }
    
    .child-container {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background-color: aqua;
      z-index: 100;  /* z-index 相对于的是parent上下文 */

    }
    
    .parent:hover .child-container {
      display: block;
    }

    /* 普通定位元素，位于 grand-parent 之后，所以会覆盖掉 grand-parent 内的元素 */
    .sibling {
      position: relative;
    }
  </style>
</body>
</html>
```

## 解决方法
将 opacity 分别给 parent 的子元素，即 child-container 及child-container 的兄弟元素。

原因是：在 parent 设置 `opacity < 1`, 使 parent 形成了上下文，此时 .child-container 的 z-index 相对于的是parent上下文，不参与全局的上下文。会被后面的文档流覆盖掉。

## 层叠上下文绘制顺序
- 层叠上下文的背景和边框
- 负z-index的子层叠上下文
- 块级盒子（block-level boxes） ← 普通元素在这里！
- 浮动元素（floated elements）
- 内联元素（inline elements）
- z-index: 0的子层叠上下文 / 定位元素（z-index: auto）
- 正z-index的子层叠上下文

## 其他变形
### 使元素变为层叠上下文的 css 属性
 1. display 为 flex（flex ｜ inline-flex），同时 z-index 不是 auto；
 2. opacity < 1；
 3. transform 不为 none；
 4. filter 不为 none；
 5. mix-blend-mode 不是 normal；
 6. isolation 是 isolate;
 7. will-change 属性为上面 2~6 的任意一个（will-change： transform、will-change：opacity）
 8. -webkit-overflow-scrolling 为 touch

### 使 grand-parent 形成层叠上下文
在 grand-parent 形成了层叠上下文；sibling 的 z-index 为 auto，不形成层叠上下文；

1. grand-parent 的 **z-index 为 0**;
	- hover child-container **会**出现“抓不到”的现象
	- grand-parent 的 z-index 为 0；sibling 的 z-index auto 在层级比较中，相当于 0；所以 grand-parent 会被后来的 sibling 覆盖；
2. grand-parent 的 **z-index 为 1**;
	- hover child-container **不会**出现“抓不到”的现象
	- grand-parent 的 z-index 为 1，比 sibling 的 z-index auto 层级高，所以 grand-parent 会覆盖 sibling；

3. grand-parent 的 **transform** 为 translateX(0);
	- hover child-container **会**出现“抓不到”的现象；
	- grand-parent 被文档流中的 sibling 覆盖；

### 使grand-parent 不形成层叠上下文

在 grand-parent 不形成层叠上下文；设置 **sibling 的 z-index 为 0**；
- hover child-container **不会**出现“抓不到”的现象；
- child-container 此时的 z-index 相对于根元素；与 sibling 一起 pk，child-container 会覆盖 sibling；

在 grand-parent 不形成层叠上下文；设置 **sibling 的 z-index 为 101**；
- hover child-container **会**出现“抓不到”的现象；
- child-container 此时的 z-index 相对于根元素；与 sibling 一起 pk，sibling 会覆盖 child-container；


## 总结

1. 当父级元素中，若哪一层级形成了层叠上下文，元素的 z-index 就会相对于该层叠上下文；否则是相对于根层叠上下文。

2. z-index 会在同一级的上下文中，与其他有 z-index 的元素去 pk，z-index 值较大的元素会覆盖z-index 值较小的元素。

3. 若 z-index 相对于非根层叠上下文；且该层叠上下文被后续文档流，或被后续层级更高的层叠上下文覆盖，则该元素会被覆盖。