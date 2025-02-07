react-router-dom由2部分组成，分别是history和react-router。react-router是react-router-dom的核心，history是react-router-dom的依赖。

- history
	- createBrowserHistory
		* 创建一个浏览器history， 本质上是对window.history进行了二次封装，拦截了其原有方法，增加location属性进行存储location信息，并返回history对象
		* 增加了 listen 方法，当setState（push、replace、go） 时触发listener的更新
		* parsePath 解析 传入的pathname（用? 解析search，用#解析hash），返回自定义的location对象
		* push方法：解析path，创建 location，调用 history.pushState() 更新浏览器显示的url，调用setState() 更新从而触发listener更新队列，然后触发Route监听事件，根据最新的location信息匹配更新对应组件
		* history.pushState() 不会造成页面重刷，新的 URL 和之前的 URL 只是锚的数据不同
	- createHashHistory
		* 创建一个hashHistory， 本质上是对window.location.hash进行的二次封装
		* 自定义了一个stack数组，用于存储location信息
		* 在执行push、replace、go方法中，会修改stack数组，并修改栈顶的location信息和栈的指针
		* 监听hashchange事件，当hashchange事件触发时，会更新栈顶的location信息和栈的指针，并触发listener更新队列

- react-router
  - Router组件
  	* 接收一个history作为props，并对history进行监听，当listener 更新时，就更新location
  	* Router 将history/location/match(解析pathname)作为上下文信息传递下去（Provider）
  	* Route 组件接收context传下来的信息进行更新（match匹配）相关组件，组件 component 作为props传进来（Consumer）
  	* useParams 方法，获取上下文中的match.params
  	* BrowserRouter 和 HashRouter 是Router的子组件，基于不同的history创建不同的Router
  - Route组件
  	* 接收context传下来的信息进行更新（match匹配）相关组件，组件 component 作为props传进来（Consumer）
  	* useParams 方法，获取上下文中的match.params
  - Link组件
  	* 接收to作为props，并调用history.push()方法，将to作为参数传入
  - Switch组件
  	* 接收children作为props，并遍历children，当匹配到第一个符合条件的Route时，就停止遍历，并返回该Route的component
  - Redirect组件
  	* 接收to作为props，并调用history.push()方法，将to作为参数传入
  
