---
slug: /note/use-js-to-implement-a-new-operator
title: 使用js实现一个new操作符
---
```javascript
// 实现一个new操作符
function customNew(constructor, ...args) {
  // 步骤1: 创建一个空对象
  const obj = {};

  // 步骤2: 将空对象的原型指向构造函数的prototype属性
  Object.setPrototypeOf(obj, constructor.prototype);

  // 步骤3: 将构造函数的this绑定到这个空对象上，并执行构造函数
  const result = constructor.apply(obj, args);

  console.log(result);
  // 步骤4: 判断构造函数执行的返回值类型（这里判断返回值的类型是防止构造函数有返回值的情况，若构造函数有返回值，则返回该返回值，否则返回obj）
  return (result !== null && (typeof result === 'object' || typeof result === 'function')) ? result : obj;
}
function Person(name, age) {
  this.name = name;
  this.age = age;

  // 构造函数有返回值，则无论调用new操作符还是调用customNew函数，都会返回该返回值
  return {
    test: 'test'
  }
}

const person = customNew(Person, 'John', 30);
console.log(person); // Person { name: 'John', age: 30 }
```
