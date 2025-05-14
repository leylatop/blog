---
slug: /note/python-development-environment
title: python开启开发环境
---
在任何包含html的目录下执行 `python -m http.server 8000` 都可以跑起来一个基于当前目录的开发环境。http.server是Python 内置的 HTTP 服务器。
工作流程：
浏览器 request --> Python HTTP Server --> 返回项目目录下的静态文件 --> 浏览器渲染页面

1. **工作原理**
   - `python -m http.server 8000` 会将**当前目录**作为网站的根目录
   - 服务器会自动查找以下文件作为默认页面:
     - index.html
     - index.htm
   - 如果这些文件不存在,则会显示当前目录的文件列表

2. **可以访问的内容**
   - 当前目录下的所有文件
   - 所有子目录及其文件
   - 支持的文件类型包括:
     - HTML 文件
     - CSS 文件
     - JavaScript 文件
     - 图片文件
     - 其他静态资源

3. **使用示例**
   ```bash
   # 假设有如下目录结构
   my-project/
   ├── index.html
   ├── css/
   │   └── style.css
   ├── js/
   │   └── main.js
   └── images/
       └── logo.png

   # 在 my-project 目录下执行
   cd my-project
   python -m http.server 8000

   # 现在可以通过以下方式访问:
   # http://localhost:8000            -> index.html
   # http://localhost:8000/css/style.css
   # http://localhost:8000/js/main.js
   # http://localhost:8000/images/logo.png
   ```

4. **安全提醒**
   - 这个服务器会暴露目录下的所有文件
   - 仅适用于本地开发环境
   - 不要在生产环境使用
   - 不要放置敏感文件在服务目录下
