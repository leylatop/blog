---
slug: /note/css-stacking-context-and-stacking-order
title: css 层叠上下文和层叠顺序
---

1. 层叠上下文
	1. 是html中一个三维的概念
	2. 如果一个元素含有层叠上下文，则它在z轴上会 "高人一等"
	3. 对于包含有`position:relative`/`position:absolute`的定位元素，将元素的 css z-index 的值 设置为非auto， 哪怕是0，会创建一个层叠上下文
	4. 包含 position:fixed 的元素，本身就是一个层叠上下文
	5. 元素一旦成为定位元素，其`z-index`就会自动生效， z-index:auto 等于 z-index:0 ，层叠上下文就会自动创建
2. 层叠水平
	1. 每个元素都存在层叠水平
	2. 每个元素的层叠水平决定了自身同一个层叠上下文忠元素在z轴上的显示顺序
	3. 层叠水平的比较只有在当前层叠上下文元素中才有意义
	4. z-index 可以影响层叠水平
	5. 层叠水平的高低决定了层叠顺序
3. ** 层叠顺序** 
	1. **谁大谁上**：当具有明显的层叠水平标识的时候，如识别的z-index，在同一个层叠上下文领域，层叠水平值大的那个会在上面
	2. **后来居上**：当元素的层叠水平一致，层叠顺序相同时，在DOM流中处于后面的元素会覆盖前面的元素；
```css
.box { }

.box > div { background-color: blue; z-index: 1; width: max-content;} /* 此时该div是普通元素，z-index无效 */

.box > div > img {
	position: relative; right: -150px; z-index: -1;
	display: inline-block;width: 200px; height: 200px; background-color: red; /* 注意这里是负值z-index */
}

<div class="box">
	<div>
		<img src="./0901img/head_mob-1.png" alt="">
	</div>
</div>
```

- Tips
	1. 子元素为图片，设置：position:relative, z-index: -1，父元素设置： z-index: 1，则子元素会被父元素覆盖，因为父元素不是一个层叠上下文元素；
		- 解决方案，将父元素设置成上下文元素：
			1. 将父元素的父元素，设置 `display: flex`，且父元素设置z-index；
			2. 将父元素的 `opacity` 设置成不是 `1` 的值
			3. 将父元素的`transform`值设置成不是`none`
			4. 将父元素的 `mix-blend-mode` 设置成不是 `normal` 和 `inherit`   和 `unset` 和 `revert`
			5. 将父元素的`filter` 设置成不是 `none`
			6. 将父元素的 `isolation` 设置成不是 `isolate`
			7. 将 `will-change` 制定的属性值为以上任意一个
			8. 将父元素的 `-webkit-overflow-scrolling` 设为 `touch`
	2. a 元素在b元素前面，a元素和b元素有共同的父元素，且父元素为 position: relative;  a元素设置position: absolute，理论上来说，a元素就会展示到b元素上面，因为position为absolute时候，自动将a元素设置成了层叠上下文，a的z-index就变为了 `auto`, 就“高人一等”。但当将b设置为 opcity 不等于1，或第一个方案里其他几种设置（ `transform`  、`mix-blend-mode` 、 `filter` 等），b就同样拥有了层叠上下文，b就会渲染到a的上面（根据dom流的顺序）。
