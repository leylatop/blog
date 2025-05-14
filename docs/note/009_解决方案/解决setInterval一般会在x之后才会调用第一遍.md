---
slug: /note/solve-setinterval-will-call-the-first-time-after-x-seconds
title: 解决setInterval一般会在x之后才会调用第一遍
---
```html
<script>
  function getCurrentTime() {
    console.log(new Date())

    return getCurrentTime
  }
  
  
  // 每隔5秒打印一次当前时间
  // 页面加载完成后，需要立即执行一次，所以需要先调用一次 getCurrentTime
  setInterval(getCurrentTime(), 5000)
</script>
```
