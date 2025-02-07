- 可选链运算符`?.`
	- 特点：允许尝试访问可能不存在的对象的属性值，不必验证属性是否存在
```javascript
const user = {
  name: 'John',
  address: {
    street: '123 Main St',
  },
};

// 普通方式
const street = user && user.address && user.address.street;

// 使用可选链
const streetWithOptionalChaining = user?.address?.street;

console.log(street); // 输出 "123 Main St"
console.log(streetWithOptionalChaining); // 输出 "123 Main St"
```

- 空值合并运算符`??`
	- 特点：当变量的值为`undifined` 或者 `null`时，为变量设置默认值；区别于 `||` 符号
```javascript
const count = undefined
const count_1 = 0 // 0, '', false 使用 || 1, 都会打印成1，使用?? 都会打印成原值
const default_count = 1

console.log(count || default_count) // 1
console.log(count_1 || default_count) // 1
console.log(count ?? default_count) // 1
console.log(count_1 ?? default_count) // 0
```
