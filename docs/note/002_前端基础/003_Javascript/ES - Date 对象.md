---
slug: /note/es-date-object
title: ES - Date 对象
---
- 获取年/月/日/时/分/秒/毫秒
```javascript
// 获取年/月/日/时/分/秒/毫秒
const date = new Date('2023-11-01 14:01:01')

// 获取年份
console.log(date.getFullYear()) // 2023

// 获取月份，从0开始计算
console.log(date.getMonth()) // 10

// 获取日期
console.log(date.getDate()) // 1

// 获取星期，从0开始计算
console.log(date.getDay()) // 3

// 获取小时
console.log(date.getHours()) // 14

// 获取分钟
console.log(date.getMinutes()) // 1

// 获取秒
console.log(date.getSeconds()) // 1

// 获取毫秒
console.log(date.getMilliseconds()) // 0

// 获取时间戳
console.log(date.getTime()) // 1672569661000
```


- 设置年/月/日/时/分/秒/毫秒/时间戳
```javascript
// 设置年/月/日/时/分/秒/毫秒/时间戳
const date = new Date('2023-11-01 14:01:01')

// 设置年份，函数可接收多个参数，参数从左到右依次为：年、月、日
console.log(date.setFullYear(2022)) // 2022-11-01 14:01:01

// 设置月份，函数可接收多个参数，参数从左到右依次为：月、日
console.log(date.setMonth(11)) // 2022-12-01 14:01:01

// 设置日期
console.log(date.setDate(11)) // 2022-12-11 14:01:01

// 设置小时，函数可接收多个参数，参数从左到右依次为：时、分、秒、毫秒
console.log(date.setHours(11)) // 2022-12-11 11:01:01

// 设置分钟，函数可接收多个参数，参数从左到右依次为：分、秒、毫秒
console.log(date.setMinutes(11)) // 2022-12-11 11:11:01

// 设置秒，函数可接收多个参数，参数从左到右依次为：秒、毫秒
console.log(date.setSeconds(11)) // 2022-12-11 11:11:11

// 设置毫秒
console.log(date.setMilliseconds(11)) // 2022-12-11 11:11:11

// 设置时间戳
console.log(date.setTime(1672569661000)) // 2023-11-01 14:01:01
```


- 获取日期/时间字符串
```javascript

const date = new Date('2023-11-01')

// 字符串：以本地时区表示
console.log(date.toString()) // Wed Nov 01 2023 08:00:00 GMT+0800 (China Standard Time)

// 字符串：指定语言，指定时区的字符串
console.log(date.toLocaleString('zh-CN', { timeZone: 'UTC' })); // 2023/11/1 00:00:00

// 字符串：美式英语和人类易读的形式表示[日期部分]的字符串
console.log(date.toDateString()) // Wed Nov 01 2023

// 字符串：指定语言的[日期部分]的字符串，options可配置
console.log(date.toLocaleDateString('zh-CN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })); // 2023年11月1日星期三

// 字符串：以本地时区表示[时间部分]的字符串
console.log(date.toTimeString()) // "08:00:00 GMT+0800 (China Standard Time)"

// 字符串：指定语言的[时间部分]的字符串，参数可选
console.log(date.toLocaleTimeString('zh-CN')) // "08:00:00"

// 字符串：ISO 格式[YYYY-MM-DDTHH:mm:ss.sssZ]的字符串，时区为 UTC时区，后缀为Z
console.log(date.toISOString()) // 2023-11-01T00:00:00.000Z

// 字符串：UTC 时区，后缀为GTM
console.log(date.toUTCString()) // "Wed, 01 Nov 2023 00:00:00 GMT"

// 字符串：JSON 格式字符串, 字符串可以被 Date.parse() 调用，返回毫秒字符串
console.log(date.toJSON()) // 2023-11-01T00:00:00.000Z
```

- Date 静态方法
```javascript
// Date.now() 返回当前时间戳
console.log(Date.now()) // 1635737649795

// Date.parse() 将时间字符串转换为时间戳
console.log(Date.parse('2023-11-01 14:01:01')) // 1672569661000

// Date.UTC() 将时间字符串转换为时间戳
console.log(Date.UTC(2023, 10, 1, 14, 1, 1)) // 1672569661000
```





- 参考资料
	- toLocaleDateString() [options 参数说明](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options)
	- 
