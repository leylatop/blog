---
slug: /note/js-character-encoding
title: js字符编码
---
Unicode字符集：
- Unicode 是一种旨在统一过去和现在的所有人类语言，使其能够在计算机上使用的标准。
- 在实践中，Unicode 标准落实的方式为，将不同字符分配给唯一编号。
- 例如：
	- 拉丁字母 `A` 被分配了数字 `65`。
	- 阿拉伯字母 Seen `س` 是 `1587`。
	- 片假名字母 Tu `ツ` 是 `12484`
	- 音乐记号中的高音谱号（G 谱号）`𝄞` 是 `119070`。
	- `💩` 是 `128169`。
- Unicode 将这些编号/数字 称之为`码位`
编码：
- 编码是我们在内存中存储码位的方式，编码最终目的是将码位作为字节进行编码。
- Unicode 字符集有多种编码方式，具体的编码方式有 UTF-8,UTF-16,UTF-32 等等。
- 例如：
	- UTF-32：是将码位存储为 32 位整数。因此，`U+1F4A9` 变为 `00 01 F4 A9`，占用四个字节。
	- UTF-8：是一种变长编码，码位的长度从 1 到 4 字节不等。`U+1F4A9` 变为 `F0 9F 92 A9`，占用四个字节。
	- UTF-16：是一种变长编码，码位的长度从 2 到 4 字节不等。`U+1F4A9` 变为 `D8 3D DCA9`，占用四个字节。

javascript 字符编码
- JavaScript 采用的是Unicode 字符集
- javascript 采用的编码方式为：UTF-16
- JavaScript 语言采用 Unicode 字符集，但是只支持一种编码方法，就是UTF-16。所有 JavaScript 代码在计算机中都是以 UTF-16 的 2 或 4 字节方式存储

参考地址
- [# 关于 Unicode 的最基本的知识](https://blog.xinshijiededa.men/unicode/)
