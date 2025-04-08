# nginx 配置跨域

## 配置跨域

```bash
server {
    listen 80;
    server_name localhost;

    location / {
        # 允许跨域的源，可以是具体的域名或 *
        add_header 'Access-Control-Allow-Origin' 'http://example.com';
        
        # 允许的请求方法
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE';
        
        # 允许的请求头
        add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
        
        # 允许证书信息传递
        add_header 'Access-Control-Allow-Credentials' 'true';
        
        # 预检请求的有效期，单位为秒
        add_header 'Access-Control-Max-Age' 1728000;
        
        # 处理 OPTIONS 预检请求
        if ($request_method = 'OPTIONS') {
            return 204;
        }
        
        proxy_pass http://localhost:8080;
    }
}
```

## 建议：
- 配置 Access-Control-Allow-Origin 时，不要随意使用 *，应该明确指定允许的源

