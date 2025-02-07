1. 前端JavaScript设置：
```js
document.cookie = "username=John Doe; expires=Thu, 18 Dec 2025 12:00:00 UTC; path=/";
```

2. 服务端设置：
- 以 Node.js 和 Express 为例：
```js
res.cookie('username', 'John Doe', { maxAge: 900000, httpOnly: true });
```

- PHP设置：
```php
setcookie("username", "John Doe", time() + (86400 * 30), "/");
```


3. 使用HTTP响应头设置（服务器端）：
```http
Set-Cookie: username=John Doe; Expires=Thu, 18 Dec 2025 12:00:00 GMT; Path=/
```