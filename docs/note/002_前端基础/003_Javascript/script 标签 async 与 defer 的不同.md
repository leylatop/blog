`script`标签
浏览器在解析 HTML 的时候，遇到`script`标签，会根据标签的属性值不一样，而做出不一样的反应

- `script`标签没有任何属性：当遇到`script`标签，会停止解析HTML，先发送网络请求，获取js内容，然后让js引擎执行代码，js引擎执行完，才继续解析HTML

的`async` 和 `defer`属性，允许加载外部脚本时，不阻止html解析器进行解析。
不同之处：
- 使用 `async` 的脚本，会在下载后立即解析和执行
- 使用 `defer` 的脚本，会在html解析完成时执行（与浏览器的 `DOMContentLoaded` 事件同时发生
- `async` 脚本可能不会按照顺序执行
- `defer` 脚本会按照它们在html中出现的顺序执行


参考：
https://juejin.cn/post/6894629999215640583