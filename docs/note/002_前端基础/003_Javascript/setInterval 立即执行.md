背景：每隔 5s 打印一下当前时间，页面加载完成后，需立即执行一次；`setInterval` 只会在5s后才会打印第一次；
```javascript
function getCurrentTime() {
	console.log(new Date())
}

setInterval(getCurrentTime, 5000)
```

改造后：
```javascript

// 改造方法一：在 setInterval 之前手动执行一次
function getCurrentTime() {
	console.log(new Date())
}
getCurrentTime()
setInterval(getCurrentTime, 5000)

// 改造方法二: 在被调用的方法中，将自身return
function getCurrentTime() {
	console.log(new Date())
	return getCurrentTime
}
setInterval(getCurrentTime(), 5000)
```
