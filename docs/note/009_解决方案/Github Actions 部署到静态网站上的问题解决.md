---
slug: /note/github-actions-deploy-to-static-website-problem-solving
title: Github Actions 部署到静态网站上的问题解决
---
- [npm ERR! Cannot read properties of null (reading 'pickAlgorithm')](https://stackoverflow.com/questions/70019872/npm-err-cannot-read-properties-of-null-reading-pickalgorithm)
	- 这个问题的原因是node版本不匹配，找不到对应的包
	- 解决思路：更改 yaml 脚本中的node 版本，使之与本地node版本匹配

-  [Node version upgrade npm ERR! Unable to authenticate, need: BASIC realm="Sonatype Nexus Repository Manager"](https://stackoverflow.com/questions/60910172/node-version-upgrade-npm-err-unable-to-authenticate-need-basic-realm-sonatyp)
	- 这个问题的原因是因为，我们在本地的.npmrc中设置了私服的地址，所有的依赖默认会从私服去拉取；但github 是拿不到私服的授权的，所以这里会失败；
	- 将本地的.npmrc 的私服地址和账号删掉（可以理解为清除）
	- 将仓库的 `package-lock.json` 删掉
	- `npm cache clear --force`  会生成一份新的 `package-lock.json`
	- 将最新改动推送到远程


```
/usr/bin/git push origin gh-pages 
remote: Permission to leylatop/i18n-translate-flow.git denied to leylatop. fatal: unable to access 'https://github.com/leylatop/i18n-translate-flow.git/': The requested URL returned 
error: 403 Error: Action failed with "The process '/usr/bin/git' failed with exit code 128"
```
- 这个原因是因为设置里面创建的开发者key的权限不够，需要去设置页面提升一下key的权限，参考[这个回答](https://stackoverflow.com/questions/76023778/action-failed-with-the-process-usr-bin-git-failed-with-exit-code-128)
- 
