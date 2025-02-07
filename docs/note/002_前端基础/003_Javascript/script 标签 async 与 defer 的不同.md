`script`标签的`async` 和 `defer`属性，允许加载外部脚本时，不阻止html解析器进行解析。
不同之处：
- 使用 `async` 的脚本，会在下载后立即解析和执行
- 使用 `defer` 的脚本，会在html解析完成时执行（与浏览器的 `DOMContentLoaded` 事件同时发生
- `async` 脚本可能不会按照顺序执行
- `defer` 脚本会按照它们在html中出现的顺序执行