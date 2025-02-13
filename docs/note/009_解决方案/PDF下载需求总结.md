1. 最初想法,在当前页面预览pdf文件,但是因为pdf预览功能有难度,所以放弃了预览，改为下载;
2. 下载pdf文件的方式为：
```javascript
const URL = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'

// 点击按钮进行下载
document.getElementById('download').addEventListener('click', (e) => {
	e.preventDefault()
	download2(URL2, 'test.pdf')
})

// 页面加载完之后进行下载，两种方式否支持
window.onload = function() {
	download2(URL, 'test.pdf')
}

function download2(url, name) {
      fetch(url, {
        headers: new Headers({
          Origin: window.location.origin
        }),
        mode: 'cors'
      
      }).then(res => res.blob()).then(blob => {
        const a = document.createElement('a')
        a.download = name
        a.href = window.URL.createObjectURL(blob)
        a.click()
        a.remove()
        window.URL.revokeObjectURL(a.href)
      })
    }
```

3. 上述文件为前端设置下载pdf文件；
4. 若想要访问pdf文件时，就实现自动下载文件的效果，需要在nginx服务端做一些配置，[参考资料](https://developer.aliyun.com/article/481462)
5. ![图片](http://images.leyla.top/note/Pastedimage20231109150906.png)
