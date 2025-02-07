## 组件
数据组件，关键字为 `COMPONENTSTART`，请求接口，获取数据
```
<COMPONENTSTART object_id='8'>{% model article::lists cat_id="10013369" num="1000" order="asc" return="art_lists" sort="sort" site_id="{-site_id-}"%}</COMPONENTSTART>
```


块组件，关键字为 BLOCKSTART，请求文件
```
<BLOCKSTART object_id='10012001' file='online-use.html'{% model block::block_detail file='online-use.html' %}</BLOCKSTART>
```

## 开发环境
通过接口获取最新的数据或文件，直接替换掉数据组件或块组件。

## 生产环境
在生成block时，会单独生成一个html。

在生成线上页面时，会将block块语法转为ssi指令。

在客户端请求网页时，使用web服务器的ssi技术，将block块对应的file插入到网页中。保证每次更新时，只更新block。


## 三方包
- 开发环境：jsdom

- 生成环境：htmlparser2