## z-index: auto 的含义

### 1. **默认值**
- 所有元素的 `z-index` 默认值就是 `auto`
- 不设置 `z-index` 等同于 `z-index: auto`

### 2. **不等于 z-index: 0**
这是一个常见的误解！虽然在某些情况下表现相似，但它们有本质区别：

```css
/* 这两个不完全相同！ */
.element1 { z-index: auto; }
.element2 { z-index: 0; }
```

## z-index: auto 的具体行为

### 1. **对于普通定位元素**
```css
.positioned {
  position: relative;
  /* z-index: auto; */ /* 默认值 */
}
```
- **不创建新的层叠上下文**
- 在层叠顺序中位于第6层（定位元素层）
- 按文档流顺序排列

### 2. **对于创建层叠上下文的元素**
```css
.context {
  position: relative;
  opacity: 0.5;  /* 创建层叠上下文 */
  /* z-index: auto; */ /* 默认值 */
}
```
- **创建层叠上下文**
- 在层叠顺序中相当于 `z-index: 0`
- 但仍然是 `auto`，不是 `0`

## auto 与 0 的关键区别

### 1. **层叠上下文的创建**
```css
/* 情况1：不创建层叠上下文 */
.element1 {
  position: relative;
  z-index: auto;  /* 不创建层叠上下文 */
}

/* 情况2：创建层叠上下文 */
.element2 {
  position: relative;
  z-index: 0;     /* 创建层叠上下文！ */
}
```

### 2. **实际例子**
让我用您的代码结构来说明：

```html
<div class="parent">
  <div class="child" style="z-index: 10;"></div>
</div>
<div class="sibling" style="z-index: 5;"></div>
```

**如果 parent 是 z-index: auto：**
```css
.parent { 
  position: relative; 
  /* z-index: auto; 不创建层叠上下文 */
}
```
- `child` (z-index: 10) 与 `sibling` (z-index: 5) 在同一层叠上下文中比较
- 结果：`child` 在 `sibling` 上面（10 > 5）

**如果 parent 是 z-index: 0：**
```css
.parent { 
  position: relative; 
  z-index: 0; /* 创建层叠上下文！ */
}
```
- `parent` 创建层叠上下文，`child` 被困在其中
- `parent` (z-index: 0) 与 `sibling` (z-index: 5) 比较
- 结果：`sibling` 在整个 `parent` 上下文之上（5 > 0）

## 在层叠顺序中的位置

**z-index: auto 的元素在第6层：**
```
1. 层叠上下文的背景和边框
2. 负z-index的子层叠上下文
3. 块级盒子
4. 浮动元素
5. 内联元素
6. z-index: 0 的子层叠上下文和定位元素(z-index: auto) ← 这里
7. 正z-index的子层叠上下文
```

## 回到您的代码

```css
.parent {
  position: relative;
  opacity: 0.5;  /* 创建层叠上下文 */
  /* z-index: auto; 默认值，但因为opacity创建了上下文，表现如z-index: 0 */
}

.sibling {
  position: relative;
  /* z-index: auto; 默认值，普通定位元素 */
}
```

**关键理解：**
- `.parent` 的 `z-index: auto` 因为 `opacity` 的存在而创建层叠上下文
- `.sibling` 的 `z-index: auto` 就是普通定位元素
- 文档流顺序决定 `.sibling` 覆盖 `.parent`

## 总结

**z-index: auto 意味着：**
1. **默认的层叠行为**
2. **通常不创建层叠上下文**（除非有其他属性强制创建）
3. **在第6层参与层叠排序**
4. **按文档流顺序排列**
5. **不等于 z-index: 0**（0 会强制创建层叠上下文）

这就是为什么理解 `auto` 与明确数值的区别对掌握CSS层叠如此重要！