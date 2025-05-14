---
slug: /note/use-regex-to-match-a-class-of-characters-in-vscode
title: 在vscode 中使用正则匹配一类字符
---
需求：写一个正则匹配 ga360location="xxxxxxxxxxxxxx"，其中ga360location=""是固定的，中间的字符可以是任意个数字、字母、下划线，正则用于在vscode中全局筛选到这些字符 `ga360location="xxxxxxxxxxxx"`，并且删掉。


正则：
```shell
ga360location="[a-zA-Z0-9_]+"
```

---


需求：在vscode中  
怎么把全局的 `https://mockitt.wondershare.com/xxx.html`改为`/xxx.html`,  
把全局的 `https://mockitt.wondershare.com/xxx/`改为`/xxx/`,  
把全局的`https://mockitt.wondershare.com/xxx/xxx.html` 改为`/xxx/xxx.html`,中间的xxx/可以是任意个数字、字母、下划线、横线。即去掉 `https://mockitt.wondershare.com`，目的是为了省略域名，更简洁和通用。

回复：

查找框中输入：
```regex
https:\/\/mockitt\.wondershare\.com((?:\/[\w-]+)*(?:\/[\w-]+\.html)?)
```

替换框中输入：
```regex
$1
```

解释：
- 正则表达式中的括号 `()` 创建了一个捕获组
- `$1` 表示引用第一个捕获组的内容，也就是域名后面的所有路径部分
- 这样就会保留所有的路径部分（包括斜杠和.html），只删除域名部分

这样就能把：
- `https://mockitt.wondershare.com/xxx.html` 改为 `/xxx.html`
- `https://mockitt.wondershare.com/xxx/` 改为 `/xxx/`
- `https://mockitt.wondershare.com/xxx/xxx.html` 改为 `/xxx/xxx.html`

