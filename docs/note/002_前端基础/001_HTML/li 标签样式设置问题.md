今天在写li标签的样式时发现设置的list-style 无论如何也不生效，事情背景是代码全局设置了 list-style 为none，而我需要显示 list 样式，所以我手动给li标签重写了 list-style: disc，重写之后还是不生效，我又给 ul设置了 list-style: disc ，依然没生效；

一顿google，最终在css 大佬 张鑫旭博客下找到了原因，我给li标签设置了display: flex，但想要样式生效的前提是 li标签必须为 display: list-item;


以后li标签不生效的原因排查：
1. 检查ul/ol 的 list-style 是否为 none
2. 检查li标签的display 是否不为 list-item

[https://www.zhangxinxu.com/wordpress/2022/11/about-css-list-style-type-item/](https://www.zhangxinxu.com/wordpress/2022/11/about-css-list-style-type-item/)