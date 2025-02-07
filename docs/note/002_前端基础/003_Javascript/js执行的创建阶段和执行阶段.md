
**创建阶段（Creation Phase）**
这个阶段对应js引擎中的的"预编译"步骤，具体做了以下工作：

1. 创建执行上下文（Execution Context）
- 创建变量对象(Variable Object)/活动对象(Activation Object)
- 函数声明提升：将函数声明整个提升到作用域顶部（声明+赋值）
- 变量声明提升：将变量声明提升到作用域顶部，但不提升赋值
- 函数提升优先级高于变量提升，即如果变量名称跟已经声明的形式参数或函数相同，变量声明不会覆盖已经存在的这类属性；但是在执行阶段，变量赋值，会覆盖掉函数。
```js
function str() {};  
var str = 'local';  
// 最终 str 为'local'；  
  
var str = 'local';  
function str() {};  
// 最终 str依然 为'local'；
```
- 初始化变量为 undefined

2. 建立作用域链（Scope Chain）
- 确定当前上下文可以访问的变量范围
- 创建 [[scope]] 属性，指向父级变量对象

3. 确定 this 指向
- 全局执行上下文中，this 指向全局对象（浏览器中是 window）
- 函数执行上下文中，this 取决于函数的调用方式

**执行阶段（Execution Phase）**
这个阶段对应js引擎中的"解释/编译执行"和"优化执行"步骤，具体做了：

1. 变量赋值
- 按照代码顺序，逐行执行变量赋值
- 开始真正运行代码中的可执行语句

2. 函数调用
- 遇到函数调用时，为该函数创建一个新的执行上下文
- 将这个新的执行上下文压入调用栈
- 完成函数调用后，将其执行上下文从调用栈中弹出

举个例子来说明这两个阶段：

```javascript
console.log(name); // undefined
console.log(sayHi); // function sayHi()...
var name = "John";
function sayHi() {
    console.log("Hi");
}
```

创建阶段：
```javascript
// 创建变量对象
VO = {
    name: undefined,  // 变量声明提升
    sayHi: function() {...}  // 函数声明提升
}
```

执行阶段：
```javascript
// 逐行执行代码
console.log(name);  // undefined，因为只提升了声明，还未赋值
console.log(sayHi); // 输出完整函数，因为函数声明完整提升
name = "John";      // 变量赋值
```


创建和执行的两阶段过程，会在代码执行的每个上下文（全局上下文、函数上下文、eval上下文）中重复发生。每次遇到函数调用，就会创建新的函数执行上下文，并重复这个两阶段过程。