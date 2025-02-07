## 基本用法
在css 中，可以使用 `@import` 关键字引入其他`css`模块，方便复用其他文件的样式，其基本语法有2种方式：
```css
@import 'styles.css'
@import url('style.css')
```

## 位置要求
- `@import` 关键字必须声明在css文件的最顶部，否则会被浏览器忽略掉
- 只有`@charset` 关键字可以在 `@import` 之前

## url路径支持
`@import` 支持相对路径和绝对路径
```css
/* 相对路径 */
@import "./styles/common.css";
@import "../theme/dark.css";

/* 绝对路径 */
@import "/assets/styles/main.css";
@import "https://cdn.example.com/styles.css";
```

## 支持媒体查询
```css
/* 只在屏幕设备上应用的样式 */
@import url("print.css") screen;

/* 仅在连接实体打印机时候才会应用 */
/* 1. 用户点击浏览器的打印功能,在打印预览时*/
/* 2. 实际发送到打印机打印时*/
@import url("print.css") print;

/*仅在幻灯片时才生效（这个值已经被废弃，线代浏览器基本不再支持）*/
@import url("projection.css") projection;
```


