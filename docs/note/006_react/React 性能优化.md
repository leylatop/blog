性能优化一般省略的是更新阶段的步骤，即不需要刷新的时候，不刷新。即如果父组件传过来的props没有更新就不再进行本组件的更新流程。

## 类组件

- shouldComponentUpdate
- PureCompomponent：与shouldComponentUpdate 原理一致，只不过内置了 shouldComponentUpdate，对 nextProps与props 进行了浅比较

## 函数组件
- React.memo：对原组件包裹，返回一个memo类型的function组件，在更新时候，对function组件的新旧props进行浅比较。
- useMemo：将创建好的变量，放到hooksState中，下次执行函数组件时，从hooksState中获取，避免重新创建变量，而该变量又是要传入到子组件中时，造成子组件不必要的更新。
- useCallback：将创建好的函数，放到hooksState中，下次执行函数组件时，从hooksState中获取，避免重新创建函数，而该函数又是要传入到子组件中时，造成子组件不必要的更新。