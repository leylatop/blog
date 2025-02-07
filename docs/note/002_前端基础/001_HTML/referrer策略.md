- document.referrer：获取当前页面的上一个页面的url，但这个值不是一定能拿到，这取决于上一个页面中对 HTTP header 中 Referrer-Policy的设置；
- 作为上一个页面，可以设置  HTTP header 中 Referrer-Policy 的值，控制下一个页面的referrer的值是否能获取到；
```HTTP
# 任何情况下都不发送Referrer信息
Referrer-Policy: no-referrer

# 当下一个页面的协议安全等级比本页面协议安全等级低时（HTTPS => HTTP），不发送Referrer信息
# 其他情况下一个页面的 document.referrer 为当前页面完整的url
Referrer-Policy: no-referrer-when-downgrade

# 下个页面的 docuement.referrer 总是当前页面的 location.origin
Referrer-Policy: origin

# 如果发生跨域，下个页面的document.referrer 是当前页面的 location.origin；
# 如果未发生跨域，下一个页面的 document.referrer 为当前页面完整的url
Referrer-Policy: origin-when-cross-origin

# 必须域名相同，否则 Referer 信息为空；
# 域名相同时，下一个页面的 document.referrer 为当前页面完整的url
Referrer-Policy: same-origin

# 仅当安全协议不变时，发送Referer信息；
# 安全协议不变时，下一个页面的 document.referrer 为当前页面的 location.origin
Referrer-Policy: strict-origin

# 当下一个页面的域名和安全协议相同或更高的时候，下一个页面的 document.referrer 为当前页面完整的url；
# 当下一个页面发生跨域时，下一个页面的 document.referrer 为当前页面的 location.origin
# 当下一个页面的域名和安全协议更低，下一个页面的 document.referrer 为空；
Referrer-Policy: strict-origin-when-cross-origin

# 就算URL地址不安全，也发送完整的Referer信息
Referrer-Policy: unsafe-url
```

- 设置refferrer的方法
```markdown
1. meta设置(影响整个页面的)

`<meta name="referrer" content="origin" />`
`<meta name="referrer" content="no-referrer" />`

2. a标签 rel & referrerpolicy 属性设置
- ref 只支持 noreferrer 属性值
`<a href="https://www.cssworld.cn" rel="noreferrer">点击我不要钱</a>`

- 设置其他属性值，需要使用 referrerpolicy 属性
`<a href="https://www.cssworld.cn" referrerpolicy="same-origin">点击我的喂</a>`
`<a href="https://www.cssworld.cn" referrerpolicy="origin-when-cross-origin">点击我+1</a>`

```


- [参考地址](https://www.zhangxinxu.com/wordpress/2023/08/web-referer-image-policy/)