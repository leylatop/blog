---
slug: /note/html-input-box-prohibit-copy-function
title: HTML-输入框禁止使用复制功能
---
使用 oncopy 事件禁止复制粘贴功能

```html
  <input type="text" oncopy="return false" onpaste="return false" oncut="return false">
```

```jsx
  <input type="text" onCopy={(e) => e.preventDefault()} onPaste={(e) => e.preventDefault()} onCut={(e) => e.preventDefault()} />
```

```vue
  <input type="text" @copy.prevent @paste.prevent @cut.prevent />
```
