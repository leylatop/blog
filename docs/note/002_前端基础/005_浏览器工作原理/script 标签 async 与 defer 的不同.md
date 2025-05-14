---
slug: /note/script-tag-async-and-defer-differences
title: script 标签 async 与 defer 的不同
---
`script`标签
浏览器在解析 HTML 的时候，遇到`script`标签，会根据标签的属性值不一样，而做出不一样的反应。

![image.png](http://images.leyla.top/note/20250228093627461.png)

## script
`script`标签没有任何属性，当遇到`script`标签，会停止解析HTML，先发送网络请求下载js，当js脚本下载完毕后，让js引擎先执行代码，js引擎执行完毕后，继续解析HTML。

![image.png](http://images.leyla.top/note/20250228090702397.png)


## async script
`script`标签带有`async`属性，当遇到`script`标签，不会停止解析HTML，而是异步请求js脚本，当js脚本下载完毕后，让js引擎先执行代码，js引擎执行完毕后，继续解析HTML。

![image.png](http://images.leyla.top/note/20250228091400261.png)

如果在js脚本下载完毕之前，html已经解析完毕，那在js引擎执行完毕后，就没有后续操作了。

如果html中存在多个async script 标签，各个js文件的<u>**执行顺序是不可控的**</u>，因为不能保证下载完毕的顺序，谁先下载完毕先执行谁，完全依赖网络传输速度及js文件的大小，所以可能出现获取dom获取不到的情况，也有可能获取其他js变量报错的情况。

## defer script
`script`标签带有`defer`属性，当遇到`script`标签，不会停止解析HTML，而是异步请求js脚本，当js脚本下载完毕后，让js引擎先执行代码，js引擎执行完毕后，如果HTML还没有解析完，浏览器也不会暂停解析，而是等html解析完毕后，再让js引擎执行js代码。

![image.png](http://images.leyla.top/note/20250228091608888.png)
如果html中存在多个defer script 标签，浏览器在解析完html之后，会按照它们在html中出现的顺序执行，<u>**可以保证执行顺序**</u>，避免因为依赖关系导致的报错。


## 总结
| script 标签        | 下载js时是否阻塞 | 执行js时是否阻塞                       | js 执行顺序     |
| ---------------- | --------- | ------------------------------- | ----------- |
| `<script>`       | 阻塞        | 阻塞                              | 在 HTML 中的顺序 |
| `<script async>` | 不阻塞       | 可能阻塞，也可能不阻塞（看下载完js时，html有没有解析完） | 网络请求返回顺序    |
| `<script defer>` | 不阻塞       | 不阻塞                             | 在 HTML 中的顺序 |

`script`标签没有任何属性时，是同步的。
`script`带`async` 和 `defer`属性，都是**异步**的，允许获取外部脚本时，不阻止浏览器解析html。
不同之处有以下2点：
- 是否立即解析js：
	- 使用 `async` 的脚本，会在下载后立即解析和执行
	- 使用 `defer` 的脚本，不会在下载后立即解析和执行会在html解析完成时执行（与浏览器的 `DOMContentLoaded` 事件同时发生
- js执行顺序：
	- `async` 脚本可能不会按照顺序执行
	- `defer` 脚本会按照它们在html中出现的顺序执行


参考：
https://juejin.cn/post/6894629999215640583
https://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html
