
ref的作用，创建一个变量，变量中有一个current属性，将dom或者类组件的实例保存在ref的current属性上。虽然ref看起来是在类组件的props，或dom的属性上，但是实际上在React.createElement阶段，将ref从props中删除了，赋到了虚拟dom上。
1. 将ref赋给dom的ref属性后，在虚拟dom创建完真实dom后，会将**真实dom**保存到ref.current，可以通过ref.current 直接操作dom上的方法或获取dom属性
2. 将ref赋给类组件的ref属性后，在类组件实例化后，会将**类组件的实例**保存到ref.current，可以通过ref可以获取类组件实例上的属性，或调用类组件实例的方法
3. 不能直接将ref赋给函数组件，因为函数组件本质上是一个函数，不像类组件一样有实例，也没有this指向，所以不能直接调用函数组件内部的方法或属性，必须将ref通过参数的显式传入函数组件，在函数组件内部将ref赋给dom元素。所以需要通过**forwardRef转发ref**。

## 创建ref
### 在类组件中创建ref
**React.createRef**

```js
class Sum extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }
}
```

### 在函数组件中使用hook创建ref
**useRef**

```jsx
function Sum () {
	 const ref = React.useRef()
}

```

## 将ref赋值和使用ref
### 将ref赋给dom
直接将创建好的ref赋给dom
```jsx
class Sum extends React.Component {
    aRef = React.createRef()
    bRef = React.createRef()
    resultRef = React.createRef()
    constructor(props) {
        super(props)
    }
    handleAdd = () => {
        let a = this.aRef.current.value;
        let b = this.bRef.current.value;
        this.resultRef.current.value = a + b;
    }
    render() {
        return (
            <>
                <input ref={this.aRef} />+<input ref={this.bRef} /><button onClick={this.handleAdd}>=</button><input ref={this.resultRef} />
            </>
        );
    }
}
```

### 将ref赋给类组件
如果将ref赋类组件，ref指向的是类组件的实例。
可以通过ref.current.xxx的方式，访问类组件实例内部的属性或方法，前提是类组件内部必须提供属性/方法供父组件调用。
```jsx
class Child extends React.Component {
    inputRef = React.createRef()
    // 必须提供方法，供父组件ref调用
    setFocus = () => {
        this.inputRef.current.focus()
    }
    render() {
        return <input ref={this.inputRef} />
    }
}
class Parent extends React.Component {
    childRef = React.createRef()
    constructor(props) {
        super(props)
    }
    setFocus = () => {
        this.childRef.current.setFocus()
    }
    render() {
        <div>
            <Child ref={this.childRef}/>
            <button onClick={this.setFocus}>设置焦点</button>
        </div>
    }
}
```


### 将ref赋给函数组件
使用forwordRef 将Child包裹，返回了一个**forward_ref类型虚拟dom**，。**forward_ref类型虚拟dom**中的type属性是一个对象，type内部包含两个属性，分别是 `$$typeof`、`render`
```js
{
	$$typeof: react.forword_ref, 
	render: function FunctionComponent() {}
}
```

其中 `$$typeof` 标识这是一个forwardRef转发后的函数组件，`render`存放着转发前的函数组件function方法。
在将**forward_ref类型虚拟dom**创建真实dom时，会调用 `type.render` 方法，并且将虚拟dom的props和ref传递过去，返回真实dom。所以需要被转发的函数组件，需要显式提供2个参数，分别是props和forwordRef。

**forward_ref类型虚拟dom**的type属性是一个对象，是一种特殊的类型。类组件、函数组件或dom的type属性，要么是字符串，要么是class或function。

```jsx
function Child(props, forwordRef) {
    return <input ref={forwordRef} />
}
// 使用 forwordRef 将需要设置ref的函数组件Child包裹，即为转发
const ForwordRefChild = React.forwordRef(Child)
class Parent extends React.Component {
    childRef = React.createRef()
    constructor(props) {
        super(props)
    }
    setFocus = () => {
        // 直接调用子组件赋给ref的dom上的方法
        this.childRef.current.focus()
    }
    render() {
        <div>
            <ForwordRefChild ref={this.childRef}/>
            <button onClick={this.setFocus}>设置焦点</button>
        </div>
    }
}
```


