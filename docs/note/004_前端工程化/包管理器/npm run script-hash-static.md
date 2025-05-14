---
slug: /note/npm-run-script-hash-static
title: npm run script-hash-static
---
1. 删除 public/mb-dashboard/package.json 文件
2. 根据 public/mb-dashboard/ 下的文件内容，生成新的hash
	1. 拿到 public/mb-dashboard/ 下每一个文件，对文件依次进行遍历 & 递归
	
	2. 读取每个文件，创建一个可读的流(node:fs-createReadStream)，将流的内容创建一个hash 格式为 'sha1' (node:crypto- createHash)，将hash 对象 转化成 buffer数据（Buffer.concat），将buffer数据转成bash64（toString），生成每个文件单独的base64 字符串
	
	3. 将所有文件的base64字符串，拼接起来（arr.join）,得到一个新的字符串
	
	4. 将新字符串，创建一个hash 格式为 'sha1' (node:crypto- createHash)
		1. 得到hash值的base 64 字符串，截取前10位，就是 mb-dashboard/package.json 中新的版本号
3. 往 mb-dashboard/package.json 写一个新的内容


关键在于，若单个文件发生变化，则单个文件的stream -> hash -> buffer -> base64就会发生变化；若新增文件，则所有文件base64 拼起来的字符串也会发生变化，所以所有base64拼起来的字符串生成的hash值也会发生变化
