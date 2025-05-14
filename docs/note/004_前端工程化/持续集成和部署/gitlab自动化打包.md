---
slug: /note/gitlab-automated-packaging
title: gitlab自动化打包
---
# gitlab自动化打包
## gitlab 怎么实现自动打包
想要实现敏捷开发，提升开发效率，我们可以通过配置gitlab的CI CD，在将代码推送到gitlab时，触发自动化打包流程。在 GitLab CI/CD 中：

1. `.gitlab-ci.yml` 是**必须**的配置文件：
- 必须放在项目的根目录
- 必须使用这个确切的文件名
- 必须是 YAML 格式

2. **不支持**其他文件名或格式，但你可以：
- 使用 `include` 指令引入其他 YAML 文件
- 使用模板文件

引入其他配置文件的写法：
```yaml:.gitlab-ci.yml
include:
  - local: '/path/to/other-config.yml'
  - remote: 'https://gitlab.com/example/template.yml'
```

如果项目根目录没有 `.gitlab-ci.yml` 文件，GitLab 就不会触发任何 CI/CD 流程。这是 GitLab 的规范要求，类似于：
- GitHub Actions 使用 `.github/workflows/*.yml`
- Jenkins 使用 `Jenkinsfile`

