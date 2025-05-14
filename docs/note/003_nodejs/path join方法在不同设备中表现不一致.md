---
slug: /note/path-join-method-in-different-devices-displays-inconsistently
title: path join方法在不同设备中表现不一致
---
# 解决path join方法在不同设备中表现不一致问题

## 问题描述

在不同设备中，使用path.join方法拼接路径时，表现不一致。
路径1: a， 路径2: b，路径3: c
- windows: 使用\作为路径分隔符 = a\b\c
- linux/mac: 使用/作为路径分隔符 = a/b/c

## 解决方案

使用path.posix.join方法来拼接路径。

```javascript
const path = require('path');

const filePath = path.posix.join('a', 'b', 'c');
console.log(filePath); // a/b/c
```

