---
slug: /note/vscode-html-code-snippet-basic-version-react-vue-jquery
title: VSCode HTML代码片段（基础版，react、vue、jquery）
---
起因是最近在学习前端，看的网上的demo也是在react、vue、jquery之间穿插，为了方便一键生成html模板（懒）写demo，有了以下折腾。

本人使用的前端编辑工具是vscode（方便、懒），可配置成中文界面，很友好，丰富的第三方插件，真香。以下是基于vscode设置的html代码片段：

1. 文件->首选项->用户代码片段

![](https://img2020.cnblogs.com/blog/1695251/202004/1695251-20200423112244508-1397875198.png)

2. 输入html，打开第一个html.json文件

![](https://img2020.cnblogs.com/blog/1695251/202004/1695251-20200423112347715-1702175982.png)

3.编辑json文件，内容如下。unpkg被墙，这里使用的是cdn镜像（[https://cdnjs.com/](https://cdnjs.com/)）

```json
{
    "!": {
        "prefix": "!", // 触发的关键字 输入!按下tab键
        "body": [
            "<!DOCTYPE html>",
            "<html lang=\"en\">",
            "",
            "<head>",
            "    <meta charset=\"UTF-8\">",
            "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
            "    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">",
            "    <title>Document</title>",
            "    <style>",
            "    #app{",
            "",
            "    }",
            "    </style>",
            "</head>",
            "",
            "<body>",
            "    <div id=\"app\"></div>",
            "    <script>",
            "    </script>",
            "</body>",
            "",
            "</html>",
        ],
        "description": "common components"
    },
    "jh": {
        "prefix": "jh", // 触发的关键字 输入jh按下tab键
        "body": [
            "<!DOCTYPE html>",
            "<html lang=\"en\">",
            "",
            "<head>",
            "    <meta charset=\"UTF-8\">",
            "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
            "    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">",
            "    <title>Document</title>",
            "    <style>",
            "    #app{",
            "",
            "    }",
            "    </style>",
            "</head>",
            "",
            "<body>",
            "    <div id=\"app\"></div>",
            "    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min.js\"></script>",
            "    <script>",
            "    </script>",
            "</body>",
            "",
            "</html>",
        ],
        "description": "jquery components"
    },
    "vh": {
        "prefix": "vh", // 触发的关键字 输入vh按下tab键
        "body": [
            "<!DOCTYPE html>",
            "<html lang=\"en\">",
            "",
            "<head>",
            "    <meta charset=\"UTF-8\">",
            "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
            "    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">",
            "    <title>Document</title>",
            "</head>",
            "",
            "<body>",
            "    <div id=\"app\"></div>",
            "    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js\"></script>",
            "    <script>",
            "        var vm=new Vue({",
            "            el:'#app',",
            "            template:`<div></div>`,",
            "            data(){",
            "                return {",
            "",
            "                }",
            "            },",
            "            methods:{",
            "",
            "            }",
            "        });",
            "    </script>",
            "</body>",
            "",
            "</html>",
        ],
        "description": "vh components"
    },
    "rh": {
        "prefix": "rh", // 触发的关键字 输入rh按下tab键
        "body": [
            "<!DOCTYPE html>",
            "<html lang=\"en\">",
            "",
            "<head>",
            "    <meta charset=\"UTF-8\">",
            "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
            "    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">",
            "    <title>Document</title>",
            "    <style>",
            "    #app{",
            "",
            "    }",
            "    </style>",
            "</head>",
            "",
            "<body>",
            "    <div id=\"app\"></div>",
            "    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/react/16.13.1/umd/react.production.min.js\"></script>",
            "    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.13.1/umd/react-dom.production.min.js\"></script>",
            "    <script>",
            "    ReactDOM.render(<div>hello,react</div>, document.getElementById('app'))",
            "    </script>",
            "</body>",
            "",
            "</html>",
        ],
        "description": "react components"
    },
}
```

4. 保存，新建一个html文件，输入（!/jh/vh/rh），敲tab键，自动生成模板。

亲测可用，完结。
