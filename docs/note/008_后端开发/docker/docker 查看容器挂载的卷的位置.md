要查看 Docker 容器中的文件对应的卷（Volume）的位置，你可以按照以下步骤操作：

1. **查看容器详情**：首先，你需要查看容器的详细信息，包括其挂载的卷。这可以通过 `docker inspect` 命令实现。你需要替换 `<container_id_or_name>` 为你的容器ID或名称。
```bash
docker inspect <container_id_or_name>
```

2. **查找挂载信息**：在 `docker inspect` 命令的输出中，找到 `"Mounts"` 部分。这部分包含了容器内部路径与宿主机上卷的映射信息。
    
3. **查看卷位置**：在 `"Mounts"` 部分，找到你关心的文件或目录对应的挂载点。`"Source"` 字段会显示宿主机上的路径，而 `"Destination"` 字段则显示容器内的路径。
    

例如，如果你看到如下的输出：
```json
"Mounts": [
    {
        "Type": "bind",
        "Source": "/var/lib/docker/volumes/my_volume/_data",
        "Destination": "/app/data",
        "Mode": "",
        "RW": true,
        "Propagation": "rprivate"
    }
]
```

这意味着，容器内的 `/app/data` 目录实际上映射到了宿主机的 `/var/lib/docker/volumes/my_volume/_data` 目录。

请注意，如果你使用的是 Docker 管理的卷（而不是绑定挂载），卷的物理位置可能位于 Docker 的数据目录下（如 `/var/lib/docker/volumes/`），具体位置可能会因 Docker 的配置和操作系统而异。