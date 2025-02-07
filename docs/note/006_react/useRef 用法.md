1. useRef方法接收一个空值或一个对象，返回一个对象，返回的对象中包含 current 属性
2. 修改属性 current 的值，不会引起组件重新渲染

```
const {current} = useRef()
```

3. 使用场景
	1. 将ref 给到 原生元素的ref元素
	2. 将ref.current进行赋值&清除赋值，作一个常量进行使用