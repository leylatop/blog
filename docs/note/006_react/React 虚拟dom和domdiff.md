在react中，引入了虚拟dom的概念，相比于传统的jquery，或js直接操作dom的方式，react通过虚拟dom diff，减少了完整的dom操作，只更新需要更新的真实dom，加快了页面的渲染。
react的虚拟dom本质上就是对象，记录了元素或组件的信息，包括type、props、ref等。

## dom diff
### 不复用的情况
1. 当虚拟dom跨了层级，真实dom不能复用
2. 当老虚拟dom和新的虚拟dom的类型不一致，真实dom不能复用

### diff 流程
根据虚拟dom的key，标识虚拟dom的唯一性

1. 如果`oldVdom`和新`newVdom`都不存在，则什么也不需要做
2. 如果`oldVdom`不存在，`newVdom`存在，则根据新虚拟dom，创建真实dom，插入到dom树中。
3. 如果`oldVdom`存在，`newVdom`不存在，则从dom树中移除`oldVdom`对应的真实dom
4. 如果`oldVdom`和新`newVdom`都存在：
	1. 新老虚拟dom类型不一样，则不进行复用，直接在dom树中移除老的真实dom，创建新的真实dom；
	2. 新老虚拟dom类型一样，更新虚拟dom的属性
	3. 虚拟dom的diff是深度优先遍历，接卸来继续递归遍历虚拟dom的后代；
	4. 在虚拟dom后代遍历时，会对同一层级的diff统一做对比；将旧的虚拟dom的children vdom所有放到一个map中，key为虚拟dom的key（根据虚拟dom的key，标识虚拟dom的唯一性），如果没有设置为key，则会使用index。遍历新的children vdom，判断child 是否在旧的虚拟dom中存在。如果存在，且在placedIndex之后，则标记元素不发生变动，只根据属性更新元素，并且更新 placedIndex 的值；如果存在，但在placedIndex之前，则标记元素可以复用，但需要发生移动。如果存在，会将map中的虚拟元素删掉，剩余没有被删掉的。如果不存在，则标记需要插入新的。然后遍历所有的patched的包，根据是需要删除，还是移动，或者是插入，对新老组件进行操作。
