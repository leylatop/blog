在react中，所有的hook都使用一个hookState，及一个指针。
每调用一个hook，都会将传入的值缓存在hookState中，并且移动指针到下一个位置。
并且在更新时，会将指针置为0，这样做的目的是在函数组件中引入了状态的机制，且在更新函数组件的时候获取 hookState中存储的变量或函数，防止不必要的更新。

- useState
- useEffect => 宏任务
- useLayoutEffect => 微任务
- useMemo => 缓存
- useCallback => 缓存
- useRef => 缓存
- useContext
- useReducer => useState 就是useReducer的语法糖

