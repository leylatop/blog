1. redux-thunk 是redux的中间件

2. redux-thunk 中间件允许 action creator返回对象或者返回一个函数

3. redux-thunk 中间件可以被用来延缓分发action，或者实现满足某个条件的时候才触发action；返回的函数以 dispatch 和 getState 作为参数；

4. thunk：中文意思为形实转换程序，本质上是一个函数；当一个操作被delay的时候我们可以称之为thunk；

- 杂记
	- 主要思想：帮助异步的action传入dispatch，这样就不需要通过别的地方手动传入dispatch，从而实现了调用的地方和使用的地方解耦
	* dispatch 可以接收普通的action对象，也可以接收一个函数；如果接收的是一个函数，则会将函数的执行结果通过dispatch方法 return出去
	* redux中间件范式
	* applyMiddleware 的原理，接收一个中间方法，并返回一个新的方法，在新的方法内部调用接收的中间方法