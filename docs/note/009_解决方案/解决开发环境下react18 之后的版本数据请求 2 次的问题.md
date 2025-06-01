react 18 版本之后，在本地开发环境的严格模式下，页面初始化流程会执行 2 次，即先挂载卸载，再挂载。如果数据请求放在 useEffect 中，就会导致请求会初始化 2 次。这是 react 精心设计的，可以让我们在开发环境下能及时发现未及时清除的副作用。

网上有方法推荐关闭严格模式，但是我个人是极其不推荐的，除非你能保证写的代码万无一失，否则官方提供的这个策略可以有效缓解内存泄漏等问题。


所以我封装了一下 useEffectOnce，使用 ref 标识一下请求已经发送过了，再次进入到 useEffect 时，就不会再次发送请求，但是这也严格杜绝了依赖更新导致的二次发送请求，所以使用场景非常有限，只适合用于首次初始化页面。

```js
import { useEffect, useRef, useState } from 'react'

export const useEffectOnce = (effect: () => void) => {
  const initRef = useRef(false)
  const [isInitDone, setIsInitDone] = useState(false)

  useEffect(() => {
    (async () => {
      // react 18 的 useEffect 会重复执行，确保只初始化一次, 所以需要使用 ref 来确保只初始化一次
      if (initRef.current) return
      initRef.current = true
      await effect()
      setIsInitDone(true)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isInitDone
}


// isInitDone 标识请求完毕，可以继续后续流程
const isInitDone = useEffectOnce(async () => {
    //TODO
})

```