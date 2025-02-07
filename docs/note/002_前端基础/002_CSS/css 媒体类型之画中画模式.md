可以设置媒体查询 `@media (display-mode: picture-in-picture)`。在普通页面中会自动忽略样式，在画中画模式会自动渲染样式。
在普通页面中显示为`粉色`，在画中画自动变为`浅绿色`

```html
<style>
    #pipContent {
        width: 600px;
        height: 300px;
        background: pink;
        font-size: 20px;
    }
    
    <!-- 普通网页中会忽略 -->
    @media (display-mode: picture-in-picture) {
        #pipContent {
            background: lightgreen;
        }
    }
</style>
```

