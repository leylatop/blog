1. 数组求和
给定一个数字数组，使用 reduce 方法计算并返回所有数字的总和。

```js
const array = [1, 2, 3]
const result = array.reduce((r, i) => (i + r), 0)
```

2. 数组对象属性求和
假设有一个对象数组，每个对象都有一个 value 属性，使用 reduce 方法计算所有对象的 value 总和。
```js
const arrayObj = [{value: 1}, {value: 2}, {value: 3}]
const resultO = arrayObj.reduce((r, i) => (i.value + r), 0)
```
3. 找出数组中的最大值
给定一个数字数组，使用 reduce 方法找出并返回数组中的最大值。
```js
const randomArray = [1,4,6,3,2]
const resultMax = randomArray.reduce((r, i) => (r > i ? r : i))
```

4. 数组去重
给定一个包含重复元素的数组，使用 reduce 方法去除重复元素，返回一个每个元素只出现一次的新数组。
```js
const repeatArray = [1,4,5,6,4,3,2]
const result = repeatArray.reduce((r, i) => {
  if(r.includes(i)) return r
  r.push(i)
  return r
}, [])
```

5. 分类统计
假设有一个字符串数组，元素可能重复。使用 reduce 方法统计数组中每个字符串出现的次数，返回一个对象，其中键是数组中的字符串，值是该字符串出现的次数。
```js
const repeatArray = [1,4,5,6,4,3,2]
const result = repeatArray.reduce((r, i) => {
  if(r[i] !== undefined) {
	  r[i] += 1
  } else {
    r[i] = 1
  }
  return r
}, {})
```

6. 数组扁平化
给定一个多层嵌套的数组（例如：[1, [2, [3, [4]], 5]]），使用 reduce 方法将其扁平化为一维数组。
```js
const array = [1, [2, [3, [4]], 5]];

const flatten = (arr) => arr.reduce((acc, val) => {
  if (Array.isArray(val)) {
    acc.push(...flatten(val)); // 使用扩展运算符简化合并逻辑
  } else {
    acc.push(val);
  }
  return acc;
}, []);

const result = flatten(array);
```

7. 将数组转换为对象
假设有一个数组，其中的元素为 `[["name", "Alice"], ["age", 30], ["country", "Wonderland"]]` 形式的键值对，使用 reduce 方法将其转换为对象。
```js
const array = [["name", "Alice"], ["age", 30], ["country", "Wonderland"]]
const resultMap = array.reduce((r, i) => {
  r[i[0]] = i[1]
  return r
}, {})
```


9. 实现 map 函数
使用 reduce 方法实现一个自定义的 map 函数，该函数接受一个数组和一个回调函数作为参数，返回一个新数组，新数组中的每个元素都是将原数组对应元素传递给回调函数的返回值。
```js
const repeatArray = [1,4,5,6,4,3,2]
const map = (array, callback) => {
  return array.reduce((r, i) => {
    r.push(callback(i))
    return r
  }, [])
}
const result = map(repeatArray, (i) => i * 2)
```

10. 实现 filter 函数
使用 reduce 方法实现一个自定义的 filter 函数，该函数接受一个数组和一个测试函数作为参数，返回一个新数组，新数组中的元素是所有通过测试函数的原数组元素。
```js
const repeatArray = [1,4,5,6,4,3,2]
const filter = (array, callback) => {
  return array.reduce((r, i) => {
	if(callback(i)) {
	  r.push(i)
	}
	return r
  }, [])
}
const result = filter(repeatArray, (i) => i > 3)
```