---
slug: /note/when-the-network-is-disconnected-store-data-in-cache-storage-logic
title: 断网时，将数据存储至Cache Storage 逻辑
---
- mb-flat-json：
```
source/browser/proto2sdk/setup.ts:71

source/browser/module/FlpakSyncStore.ts:135

source/browser/module/FailSafe.ts:88
```

- 断网时，将数据存储至Cache Storage 核心API
1. 先开启一块内存
2. 将内容放入
3. 不需要时，将内存内容清空

```js

// caches.__proto__ 为 CacheStorage, CacheStorage 静态方法有：
// 1. CacheStorage.open
// 2. CacheStorage.delete
// 3. CacheStorage.has
// 4. CacheStorage.keys
// 5. CacheStorage.match

const cache = new caches.open()

// cache.__proto__ 为 Cache，Cache静态方法有：
// 1. Cache.add
// 2. Cache.addAll
// 3. Cache.delete
// 4. Cache.keys
// 5. Cache.match
// 6. Cache.matchAll
// 7. Cache.put

cache.put() // 放入
cache.delete() // 删除
```


参考地址：
- https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage
