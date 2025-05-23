---
slug: /note/axios-adapter
title: axios 适配器以及适配器选择逻辑
date: 2025-05-23
tags:
  - axios
  - axios 底层实现
  - 计算机网络
---

## axios是什么
axios 是一个基于 promise 的 HTTP 库，可以用于浏览器和 node.js 中。关键词：跨端、基于 promise

<!-- truncate -->

:::tip
因为本文主要介绍 axios 的适配器，所以不会介绍 axios 的用法和优点。
:::

## axios底层适配器
在 [axios 源码](https://github.com/axios/axios/blob/5064b108de336ff34862650709761b8a96d26be0/lib/adapters/adapters.js#L7)中定义了3 个 adapters，分别是 http、xhr、fetch。

```js
const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter,
  fetch: fetchAdapter
}
```

### [httpAdapter 底层实现](https://github.com/axios/axios/blob/5064b108de336ff34862650709761b8a96d26be0/lib/adapters/http.js)

httpAdapter 是 axios 的默认适配器，适用于 node 环境，它的底层实现分为2种：
- 默认使用 Node.js 的 `http` 模块来发送请求；
- 当 `config.maxRedirects` 大于 0 时，引入了一个 `follow-redirects`库进行重定向，使用[该库](https://github.com/axios/axios/blob/5064b108de336ff34862650709761b8a96d26be0/lib/adapters/http.js#L464)的 `http.request` 或 `https.request` 方法来发送请求。


### [xhrAdapter 底层实现](https://github.com/axios/axios/blob/5064b108de336ff34862650709761b8a96d26be0/lib/adapters/xhr.js#L33)

xhrAdapter 是 axios 的另一个适配器，适用于浏览器端请求，它直接调用了浏览器原生的 `XMLHttpRequest` 对象来发送请求。


### [fetchAdapter 底层实现](https://github.com/axios/axios/blob/5064b108de336ff34862650709761b8a96d26be0/lib/adapters/fetch.js#L1)

fetchAdapter 适用于浏览器请求，它直接[调用了 `fetch` 方法](https://github.com/axios/axios/blob/5064b108de336ff34862650709761b8a96d26be0/lib/adapters/fetch.js#L170)来发送请求。

在调用 `fetch` 方法之前，使用原生的 new Request 方法创建了一个 Request 对象，在请求发送后，调用原生的 Response 对象来处理响应。


## 适配器的选择逻辑

axios 选择适配器的逻辑是按照一个优先级顺序进行的。通常情况下，axios 会优先尝试使用在当前环境中可用的、更现代的适配器。具体的选择逻辑可能略有不同，但大致遵循以下原则：

1. 用户指定的适配器: 如果用户在请求配置中明确指定了 adapter 选项，axios 会优先使用用户指定的适配器。
2. 环境检测和默认适配器: 如果用户没有指定适配器，axios 会检测当前环境。
   - 在支持 fetch 的浏览器环境中: axios 可能会优先尝试使用 fetch 适配器。
   - 在不支持 fetch 的浏览器环境中 (例如一些旧版浏览器): axios 会回退到使用 xhr 适配器。
   - 在 node 环境中: axios 会使用 http 适配器。
