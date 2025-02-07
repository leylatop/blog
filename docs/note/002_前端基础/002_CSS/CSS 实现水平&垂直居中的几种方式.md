实现水平居中和垂直居中在CSS中是一个常见的任务，有多种方法可以实现。以下是一些常用的方法：

### 1. Flexbox方法
这是最简单和最灵活的方法之一。

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### 2. Grid方法
CSS Grid同样提供了简单的居中方式。

```css
.container {
  display: grid;
  place-items: center;
}
```

### 3. 绝对定位 + 负边距
这是一个传统方法，适用于较老的浏览器。

```css
.container {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

### 4. 表格单元格方法
使用`display: table-cell`和垂直对齐。

```css
.container {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
```

### 5. 使用margin:auto
这种方法适用于块级元素。

```css
.child {
  margin: auto;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
```

### 6. 使用line-height
当内容是单行文本时，可以使用`line-height`。

```css
.container {
  text-align: center;
  line-height: [container height];
}
```

### 7. 使用视口单位
结合视口单位（vh, vw）和transform。

```css
.child {
  position: absolute;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
}
```

### 注意事项
- 选择合适的方法取决于你的项目需求和兼容性考虑。
- 使用Flexbox和Grid时需要注意浏览器的兼容性。
- 使用`transform: translate(-50%, -50%)`时，元素的尺寸会影响其定位。

这些方法涵盖了大部分用例，但CSS布局是一个深入且广泛的话题，可能还有其他更特定的方法适用于某些情境。