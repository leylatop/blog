---
slug: /note/outer-marker
title: outer 标记
---
```javascript
outer: for(let i = 0; i < 10; i++) {
	console.log(i)
	if(i > 8) {
		break outer // 跳出循环，不再执行后续循环
	}
}
```

- outer 是一个标签（label），用于标识代码块或循环的起始位置，通常与break 和 continue 结合使用
- 在上面这个例子中，outer 标签用于标识 for循环代码块，以便后续可以通过 `break outer` 跳出循环
- 与 c语言的goto 类似
