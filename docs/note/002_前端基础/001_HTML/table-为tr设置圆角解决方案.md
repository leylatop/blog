背景：使用table实现了列表，希望能在选中行时，为行设置背景颜色和圆角。
阻碍：table不允许为tr设置圆角

解决方案：虽然table不允许为tr设置圆角，但是在`border-collapse: separate;`模式下允许为每个单元格设置样式。
1. 将table css属性`border-collapse` 设置为 `separate`;
2. 使用 `border-spacing: 0;` 消除单元格之间的间隙
3. 为每一行的第一个单元格和最后一个单元格，分别设置左侧和右侧的圆角，以此来达到为tr设置圆角的目的。

以下是为tr设置的hover时的样式（styled-component）：
```js
const trBorderRadius = `
  td:first-child {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  td:last-child {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }

`

const trHoverBackground = `
  td {
    background-color: ${THEME_COLOR.color_bg_menu_hover};
  }

  ${trBorderRadius}
`
```