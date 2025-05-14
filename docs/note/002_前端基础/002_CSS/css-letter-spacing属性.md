---
slug: /note/css-letter-spacing-property
title: css-letter-spacing属性
---
letter-spacing 属性用于设置字符之间的间距，标准值为normal，正值表示拉大字符之间的间距，负值表示缩短字符之间的间距，单位可以是 px、em


存在的问题：
1. 理想情况下，letter-spacing是在字符与字符之间设置距离，但实际上，letter-spacing也会在字符末尾也增加间距；
2. letter-spacing 在不同浏览器上表现形式不一样，对于LTR文本来说，letter-spacing会在右侧增加空白间距；但对于RTL文本来说，chrome&safari浏览器会在右侧增加空白间距，而firefox会在左侧增加空白间距；

```css
em {
  letter-spacing: 0.6rem;
}

/* Aesthetic changes */

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: clamp(10px, 1.2vw, 16px);
  font-family: arial, sans-serif;
}

body {
  padding: 20px;
}

h1 {
  width: 100%;

  color: #0009;
  font-size: 12px;
  font-weight: 400;
}

h2 {
  font-size: 16px;
}

em {
  background-color: #0ff6;
}

section {
  display: flex;
  flex-flow: row wrap;
  gap: 10px 20px;

  padding: 20px;
  border-radius: 10px;
  border: 1px solid #0005;
}

.dir-example {
  flex: 1 1 400px;

  display: flex;
  flex-flow: column;
  gap: 10px;
}

.text-example {
  flex-grow: 1;

  border-radius: 10px;
  padding: 30px;
  box-shadow: 5px 5px 20px -5px rgba(0, 0, 0, 0.67);
}

```


```html
<section>
  <h1>Normal Alignment</h1>
  <div class="dir-example" dir="ltr">
    <h2>Left to Right (LTR)</h2>

    <div class="text-example">
      <h2>Everybody (<em>loves</em>) somebody sometime</h2>
      <p>Everybody falls in (<em>love</em>) somehow</p>
    </div>
  </div>

  <div class="dir-example" dir="rtl">
    <h2>Right to Left (RTL)</h2>
    <div class="text-example">
      <h2>כולם (<em>אוהבים</em>) מישהו מתישהו</h2>
      <p>כולם מתאהבים (<em>אוהבים</em>) איכשהו</p>
    </div>
  </div>
</section>
```

- chrome
![图片](http://images.leyla.top/note/Pastedimage20240731094756.png)

- firefox
![图片](http://images.leyla.top/note/Pastedimage20240731095716.png)
