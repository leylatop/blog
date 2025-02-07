- 想在挂载阶段只执行一次，`useEffect(()=>{},[])`
- 想在每次挂载和依赖项更新执行：`useEffect(()=>{},[count])`
- 想在卸载阶段每次都执行：`useEffect(()=>{ return ()=>{} })` 可以每次清除上一次effect
- 想在卸载阶段执行一次：`useEffect(()=>{ return ()=>{} }，[])`



[参考资料](https://juejin.cn/post/7158391177199222792)
