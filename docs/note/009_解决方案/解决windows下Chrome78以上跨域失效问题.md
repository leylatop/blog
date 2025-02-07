#### 1. 为什么需要解决chrome浏览器跨域的问题？

基于Hybird App的H5部分，可以直接打包进apk或者ipa包中，在开发过程中也不需要放置到临时搭建的服务器上，直接在本地打开html静态页面，打开后会页面的域名是file

file域名下的文件发送http或https也是需要跨域的（跨域这里不细说）

#### 2. 解决Chrome78以上跨域失效问题

Chrome 46版本后，解决跨域问题需要修改快捷方式的目标（修改方式百度），在快捷方式目标路径后面添加

```
-args --disable-web-security 
```

但是78版本之后 必须 添加跨域后放置用户数据的文件夹路径，在快捷方式目标路径后面添加

```
-args --disable-web-security --user-data-dir=C:\Users\xiaoxin.qiao\AppData\Local\Google\Chrome\MyChromeDevUserData --ignore-certificate-errors
```

全部的为：

```
C:\Users\xiaoxin.qiao\AppData\Local\Google\Chrome\Application\chrome.exe -args --disable-web-security --user-data-dir=C:\Users\xiaoxin.qiao\AppData\Local\Google\Chrome\MyChromeDevUserData --ignore-certificate-errors  --allow-file-access-from-files
```