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