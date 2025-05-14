---
slug: /note/markdown-list-syntax
title: markdown-list 语法
---
```markdown
[//]: # (哈哈我是最强注释，不会在浏览器中显示。)
[^_^]: # (哈哈我是最萌注释，不会在浏览器中显示。)
[//]: <> (哈哈我是注释，不会在浏览器中显示。) 
[comment]: <> (哈哈我是注释，不会在浏览器中显示。)
- [ ] 任务一 未做任务 `- + 空格 + [ ]` 
- [x] 任务二 已做任务 `- + 空格 + [x]`



TABLE without id file.inlinks AS "Links from", file.outlinks AS "Links to"
WHERE file.path = this.file.path

*斜体*或_斜体_
**粗体**
***加粗斜体***
~~删除线~~
<u>下划线</u>
==背景高亮==



我经常去的几个网站[Google][1]、[Leanote][2]。
[1]:http://www.google.com 
[2]:http://www.leanote.com



使用 Markdown[^2]可以效率的书写文档, 直接转换成 HTML[^3]。
[^2]:Markdown是一种纯文本标记语言
[^3]:HyperText Markup Language 超文本标记语言


>>> 请问 Markdwon 怎么用？ - 小白
>> 自己看教程！ - 愤青
> 教程在哪？ - 小白


## 字体
<font face="黑体">我是黑体字</font> 
<font face="微软雅黑">我是微软雅黑</font>
<font face="STCAIYUN">我是华文彩云</font>
<font color=#0099ff size=12 face="黑体">黑体</font>
<font color=gray size=5>gray</font>
<font color=#00ffff size=3>null</font>



[TOC]


质能守恒方程可以用一个很简洁的方程式 `$E = mc^2 $`来表达。


```bash
质能守恒方程可以用一个很简洁的方程式 `$E = mc^2 $`来表达。
```

## <span id="1">一、概述</span> 
跳转到[概述](#1)

```

```markdown
*斜体*或_斜体_
**粗体**
***加粗斜体***
~~删除线~~
<u>下划线</u>
==背景高亮==
```
## Basic
- [ ] to-do
- [/] incomplete
- [x] done
- [-] canceled
- [>] forwarded
- [\<] scheduling

## Extras
- [?] question
- [!] important
- [*] star
- ["] quote
- [l] location
- [b] bookmark
- [i] information
- [S] savings
- [I] idea
- [p] pros
- [c] cons
- [f] fire
- [k] key
- [w] win
- [u] up
- [d] down
- [D] draft pull request
- [P] open pull request
- [M] merged pull request
```
