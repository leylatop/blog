```sh
grep '/api/' nginx.log | grep 'Firefox/128.0' | less -S +G
```

- 使用less 命令查看 nginx.log 文件
- 过滤同时包含`/api/`和 `Firefox/128.0` 的日志
-  `|` 管道符号将过滤后的结果传递给 less
-  `less -S +G` 用于查看最终结果，禁止自动换行，并跳转到最后一行