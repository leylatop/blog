- 转为gif
```bash
ffmpeg -i  ~/Desktop/吸顶3.mp4 -f gif output.gif
```

参数：
- `-i` 参数用于指定输入文件
- `-f` 参数用于指定输出文件的格式
- `-v` 参数用于设置日志

- 设置帧率为10，缩放宽度为460（460为proto用的尺寸
```bash
ffmpeg -i 1.mp4 -vf "fps=10,scale=460:-1,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" 1-fps10-scale460.gif
```
- `fps=10`：将输出GIF的帧率设置为每秒10帧。可以根据需要调整这个值，值越大，GIF越流畅
- `scale=320:-1`：将GIF的宽度缩放到320像素，高度按比例缩放（`-1`表示自动计算以保持原始宽高比）