基于mac系统，每分钟执行一次同步笔记的命令
关键字：`crontab`、`cron`

相关命令：`crontab -l`, `crontab -e`

```
*/1 * * * * /Users/modao/Desktop/GitHub/note/.ci/sync-note.sh >> /Users/modao/Desktop/GitHub/note/.ci/sync-note.log 2>&1
```


目前尚存在的问题记录：

我使用 `sudo crontab -e`基于mac操作系统的root用户创建了一条自动执行的命令，内容为 `*/1 * * * * /Users/modao/Desktop/GitHub/note/.ci/sync-note.sh >> /Users/modao/Desktop/GitHub/note/.ci/sync-note.log 2>&1`，希望每分钟执行一次 `/Users/modao/Desktop/GitHub/note/.ci/sync-note.sh`脚本将我的blog推送到远端。脚本内容为：
```sh
#!/bin/bash
NPM_PATH=/usr/local/bin/npm

/usr/local/bin/npm run upload-note

# Path: .ci/sync-note.sh

```

结果是，每次都未能执行成功，且会向我制定的目录记录一条日志，日志内容均为 `/bin/bash: /Users/modao/Desktop/GitHub/note/.ci/sync-note.sh: Operation not permitted`。