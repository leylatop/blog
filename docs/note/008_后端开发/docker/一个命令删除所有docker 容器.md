```sh
# 先查找所有容器的id，再删除
sudo docker container rm `sudo docker container ps -a -q`
```