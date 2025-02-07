- 流式传输
	- 借鉴`流媒体技术`，在数据传输中实现持续可用，不间断的传输效果
	- 流式传输可以依赖：http、rtmp、rtcp、udp...等网络协议
- HTTP流式传输：
	- 依赖http网络协议的流式传输
	- http协议：基于TCP的无状态的一次性使用的连接协议
- 前端如何解析流式请求的response？
	- body 就是一个流
	- 异步迭代解析
```javascript
const response = await fetch('url')
const reader = response.body.getReader()
const decoder = new TextDecoder('utf-8')

// while (true) {
//   const { done, value } = await reader.read()
//   const chunk = decoder.decode(value, { stream: true })
//   console.log(chunk)
//   if (done) {
//     break
//   }
// }

const processor = async () => {
    const { done, value } = await reader.read();
    if (done) {
        return;
    }
    const chunk = decoder.decode(value, { stream: true });
    console.log(chunk);
    await processor();
}
processor()

```


- response header
HTTP 服务器会自动为响应头添加一个 `Transfer-Encoding: chunked` 这样的响应头信息。这个响应可以理解为：「我是服务器的响应，我并不清楚响应体中有多少内容，所以我会分块（chunk）发送数据」


- 关键字
#流式传输  #流媒体技术