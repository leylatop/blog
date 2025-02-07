- curl是什么？
- curl可以用来干什么？
- curl的使用场景是什么？


curl 全名是 client 是一个在命令行使用的命令，作用是可以发送网络请求，支持文件的上传和下载。使用场景是，在命令行中进行数据请求和文件上传/下载；

最常用的场景：
- curl [https://www.example.com/](https://www.example.com/)

- -A：指定客户端的用户代理标头，即User-Agent
	- curl -A 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36' [https://google.com](https://google.com) ---- 将 User-Agent 改为chrome 浏览器
	* curl -A '' https:google.com ---- 移除 User-Agent

- -b：向服务器发送cookie
	- curl -b 'foo=bar' [https://google.com](https://google.com) ----设置一个名为 foo 值为 bar的 cookie
	* curl -b 'foo=bar;foo2=bar2' [https://google.com](https://google.com) ---- 设置2个cookie
	* curl -b cookies.txt [https://google.com](https://google.com) ---- 读取本地文件cookies.txt 

- -c: 将服务器设置的Cookie 写入一个文件
	- curl -c cookies.txt [https://www.google.com](https://www.google.com)

- -d: 发送POST 请求的数据体
	- curl -d 'login=emma&password=123' -X POST [https://google.com/login](https://google.com/login) ---- 发送请求体的一种格式
	* curl -d 'login=emma' -d 'password=123' -X POST [https://google.com/login](https://google.com/login) ---- 发送请求体发另一种格式

* curl -d '@data.txt' [https://google.com/login](https://google.com/login) ---- 读取data.txt 文件的内容，作为数据体发给服务器

* -d参数以后，HTTP 请求会自动加上标头Content-Type : application/x-www-form-urlencoded。并且会自动将请求转为 POST 方法，因此可以省略-X POST

  

--data-urlencode：等同于-d，发送POST 请求的数据体，区别在于会自动将发送放入数据进行URL编码

* curl --data-urlencode 'comment=hello world' [https://google.com](https://google.com)

  

-e: 设置HTTP的标头Reffer

- curl -e '[https://google.com?q=example](https://google.com?q=example)' [https://www.example.com](https://www.example.com)

  

-F: 向服务器上传二进制文件

- curl -F 'file=@photo.png' [https://google.com](https://google.com) ---- HTTP请求会自动加上标头  Content-Type: multipart/form-data，然后将photo.png 作为file字段上传

* curl -F 'file=@photo.png;type=image/png' [https://google.com/profile](https://google.com/profile) ---- 指定 MIME 类型为image/png

* curl -F 'file=@photo.png;filename=me.png' [https://google.com/profile](https://google.com/profile) ---- 原始文件为photo.png 服务器接收到的文件名为me.png

  

-G: 构造URL的查询字符串

- curl -G -d 'q=kitties' -d 'count=20' [https://google.com/search](https://google.com/search) ----  GET，实际请求的 URL 为[https://google.com/search?q=kitties&count=20](https://google.com/search?q=kitties&count=20);如果省略--G，会发出一个 POST 请求

- curl -G --data-urlencode 'comment=hello world' [https://www.example.com](https://www.example.com) ---- URL 编码

  

  

-H：直接指定标头

- curl -H 'User-Agent: php/1.0' [https://google.com](https://google.com)

* curl -H 'Reffer: [https://google.com?example](https://google.com?example)' [https://www.example.com](https://www.example.com)

* curl -H 'Accept-Language: en-US' [https://google.com](https://google.com)

* curl -H 'Accept-Language: en-US' -H 'Secret-Message: xyzzy' [https://google.com](https://google.com)

* `curl -d '{"login": "emma", "pass": "123"}' -H 'Content-Type:application/json'` [https://google.com](https://google.com)

  

-i: 打印出服务器的HTTP 请求头 + 网页源码

- curl -i [https://www.example.com](https://www.example.com)

  

-I: 向服务器发出 HEAD 请求，然会将服务器返回的 HTTP 标头打印出来，--head参数等同于-I

- curl -I [https://www.example.com](https://www.example.com)

  

-k: 指定跳过 SSL 检测,不检查服务器的 SSL 证书是否正确

- curl -k [https://www.example.com](https://www.example.com)

  

-L: 让 HTTP 请求跟随服务器的重定向，默认不跟随重定向

- curl -L -d 'tweet=hi' [https://api.twitter.com/tweet](https://api.twitter.com/tweet)

  

--limit-rate：限制 HTTP 请求和回应的带宽，模拟慢网速的环境

- curl --limit-rate 200k [https://google.com](https://google.com) ---- 将带宽限制在每秒 200K 字节

  

-o: 把输出写到该文件中

- curl -o example.html [https://www.example.com](https://www.example.com) ---- 将 www.example.com保存成example.html

  

-O: 将服务器回应保存成文件，并将 URL 的最后部分当作文件名

- curl -O [https://www.example.com/foo/bar.html](https://www.example.com/foo/bar.html) ---- 将服务器回应保存成文件，文件名为bar.html

  

-s: 不输出错误和进度信息

- curl -s [https://www.example.com](https://www.example.com) ---- 发生错误，不会显示错误信息

* curl -s -o /dev/null [https://google.com](https://google.com) ---- 不产生任何输出

  

-S: 只输出错误信息，通常与 -o 一起使用

- curl -S -o /dev/null [https://google.com](https://google.com) ---- 不产生任何输出，除非发生错误

  

-u 设置服务器认证的用户名和密码

- curl -u 'bob:12345' [https://google.com/login](https://google.com/login) ---- 设置用户名为bob，密码为 12345，将其转为 HTTP 标头Authorization: Basic Ym9iOjEyMzQ1

* curl [https://bob:12345@google.com/login](https://bob:12345@google.com/login) ---- 设置用户名为bob，密码为 12345，将其转为 HTTP 标头Authorization: Basic Ym9iOjEyMzQ1

* curl -u 'bob' [https://google.com/login](https://google.com/login) ---- 只设置了用户名，执行后，curl 会提示用户输入密码

  

-v：输出通信的整个过程，用于调试

- curl -v [https://www.example.com](https://www.example.com)

* curl --trace - [https://www.example.com](https://www.example.com) ---- 输出原始的二进制数据

  

-x: 指定HTTP请求的代理

- curl -x socks5://james:cats@myproxy.com:8080 [https://www.example.com](https://www.example.com) ---- 指定HTTP 请求通过myproxy.com:8080的 socks5 代理发出

* curl -x james:cats@myproxy.com:8080 [https://www.example.com](https://www.example.com) ---- 没有指定代理，默认为HTTP

  

-X: 指定HTTP请求的方式

- curl -X POST https:xxx.example.com ---- 发出一个POST请求

  

补充 ---- 简写及其全拼：

-A/--user-agent: 模仿浏览器

-b/--cookie \<name=string\>: 使用cookie

-c/--cookie-jar \<file\>: 保存cookie到file

-e/--reffer: 设置来源地址

-o/--output: 把输出写到该文件中

-u/--user: 设置服务器的用户名和密码

-x/--proxy：指定proxy服务器及其端口

-s/--slient: 静音模式，不输出任何东西