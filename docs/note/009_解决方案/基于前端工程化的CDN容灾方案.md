## 资源重载
在html标签上面添加错误回调（onerror）捕获异常，如果获取异常，则依次切换服务商，直到找到可用的资源，或返回空字符串。

## 实现思路
使用webpack plugin，修改打包后的代码
详细实现略


## 参考地址
- [# 前端CDN容灾（资源重载）方案](https://juejin.cn/post/7275943600772644883#heading-7)
- [从0到1：美团端侧CDN容灾解决方案](https://tech.meituan.com/2022/01/13/phoenix-cdn.html)