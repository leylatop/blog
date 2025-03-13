## useEffect 使用
useEffect 接收2个参数，一个是callback，一个是依赖项 dep。
callback内部方法会在dom渲染完成之后执行，如果callback有返回值，返回值只能是个函数，我们叫它销毁函数。

销毁函数，会根据依赖项参数的不同，而在不同的时机执行。

在一个事件函数中，更新多个state，会批量更新。

```js
// 1. 只打印一次“挂载”，永远也不会打印“销毁”
useEffect(()=>{
	console.log('挂载')
	return () => {
		console.log('销毁')
	}
},[])


// 2. 只有count发生变化后，才会先打印“销毁”，再打印“挂载”；其他变量发生变化，不打印
useEffect(()=>{
	console.log('挂载')
	return () => {
		console.log('销毁')
	}
},[count])

// 3. 所有变量发生变化后，都会先打印“销毁”，再打印“挂载”
useEffect(()=>{
	console.log('挂载')
	return () => {
		console.log('销毁')
	}
})
```

## useEffect源码

```js
function useEffect(callback, dependencies) {
    let currentIndex = hookIndex;
    if (hookStates[hookIndex]) {
        let [destroy, lastDeps] = hookStates[hookIndex];
        let same = dependencies && dependencies.every((item, index) => item === lastDeps[index]);
        
        // `useEffect(()=>{},[])`
        if (same) {
            hookIndex++;
        } else {
            destroy && destroy();
            setTimeout(() => {
                hookStates[currentIndex] = [callback(), dependencies];
            });
            hookIndex++;
        }
    } else {
        setTimeout(() => {
            hookStates[currentIndex] = [callback(), dependencies];
        });
        hookIndex++;
    }
}
```




[参考资料](https://juejin.cn/post/7158391177199222792)
