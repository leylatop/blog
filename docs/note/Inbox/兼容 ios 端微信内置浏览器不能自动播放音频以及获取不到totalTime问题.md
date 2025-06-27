``` html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <div>
    总时长：
    <span id="currentTime">00:00</span>
    /
    <span id="totalTime">00:00</span>
    <div>
      <button id="playBtn">播放</button>
      <button id="pauseBtn">暂停</button>
    </div>
  </div>
  <script>
  // 倒计时的目的是为了模拟playAudio异步/涉及 react 状态更新的情况
    setTimeout(() => {
      playAudio()
    }, 2000)

    const playAudio = () => {
      const audioData = {
        "audioSrc": "https://cdn.modao.cc/Default_audio.mp3",
        "isAutoplay": true,
        "isLoop": true,
        "isKeepAlive": true,
        "isHidden": false
      }

      const { audioSrc, isAutoplay, isLoop, isKeepAlive, isHidden } = audioData

      const audioObj = new Audio(audioSrc)
      audioObj.preload = 'metadata'
      audioObj.autoplay = true
      audioObj.loop = isLoop

      const isWechat = () => /MicroMessenger/i.test(navigator.userAgent)
      if (isWechat()) {
        const play = () => {
        // 等待微信JSBridgeReady后播放一下
          audioObj.play().then(() => {
            if (!isAutoplay) {
              audioObj.pause()
            }
          }).catch((err) => {
            console.log('err', err)
          })
        }
        // ************重点****************************
		// 检查 WeixinJSBridge 是否已经准备就绪
        if (typeof WeixinJSBridge !== 'undefined') {
          WeixinJSBridge.invoke('getNetworkType', {}, () => {
            play()
          })
        } else {
        // 如果未就绪，等待 WeixinJSBridgeReady 事件
          document.addEventListener('WeixinJSBridgeReady', () => {
            WeixinJSBridge.invoke('getNetworkType', {}, () => {
              play()
            })
          }, false)
        }
        // ************重点****************************
      }

	// 微信环境，需要等待微信JSBridgeReady后播放一下，否则获取不到duration，也无法自动播放
      audioObj.onloadedmetadata = (e) => {
        const totalTime = e.target.duration
        console.log('totalTime', totalTime)
        const totalTimeStr = formatTime(totalTime)
        document.getElementById('totalTime').textContent = totalTimeStr
      }

      audioObj.ontimeupdate = (e) => {
        const currentTime = e.target.currentTime
        const currentTimeStr = formatTime(currentTime)
        document.getElementById('currentTime').textContent = currentTimeStr
      }

      document.getElementById('playBtn').addEventListener('click', () => {
        audioObj.play()
      })
      document.getElementById('pauseBtn').addEventListener('click', () => {
        audioObj.pause()
      })

      function formatTime(time) {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      }
    }

  </script>
</body>
```