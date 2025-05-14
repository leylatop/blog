---
slug: /note/es6-set-and-map
title: ES6-Set 和 Map
---
#### Set()

```
const set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4]
```
##### 使用Set去重

```
// 去除数组的重复成员
[new Set(array)]
//去除字符串中的重复字符
[new Set('ababbc')].join('')
// "abc"

```
##### set实例的属性和方法

属性

```javascript
constructor
size
```

方法

```javascript
add(value)
delete(value)
has(value)
clear()
```

遍历

```javascript
keys()
values()
entries()
forEach()
...（扩展运算符）
map()（先把set使用...转化成Array）
filter()（先把set使用...转化成Array）
```

set数据转换

```javascript
// set转数组
Array.from(set);
[...set];

// 数组转set
new Set(array)
```

应用：使用set实现并集、交集、差集

```javascript
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}
// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}
// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```

#### WeakSet()

```javascript
const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}

```
属性：没有size属性

遍历：不能遍历，因为成员是弱引用，随时可能会消失

方法

```javascript
add(values)
delete(value)
has(value)
```

#### Map()

Object 结构提供了“字符串—值”的对应

Map 结构提供了“值—值”的对应

```javascript
const o = {p: 'Hello World'};
const m = new Map(o);
m.set(o, 'content')
```

属性

```javascript
size
constructor
```

方法

```javascript
set(key, value)
get(key)
has(key)
delete(key)
clear()
```

遍历（Map 的遍历顺序是插入顺序）

```javascript
keys()
values()
entries()
forEach()
...（转化成数组结构）
map()（先把map使用...转化成Array）
filter()（先把map使用...转化成Array）
```
map数据转换

```javascript
// map转数组
[...map]

// 数组转Map
new Map(array)

// map转对象
let obj = Object.create(null);
for (let [k,v] of strMap) {
    obj[k] = v;
}

// 对象转map
let strMap = new Map();
for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
}

// map转json
JSON.stringify(map)
JSON.stringify([...map])

// json转map
JSON.parse(jsonStr)
```

#### WeakMap()

WeakMap只接受对象作为键名（null除外），WeakMap的键名所指向的对象，不计入垃圾回收机制。

```javascript
const wm1 = new WeakMap();
```

属性：没有size属性

遍历：不能遍历，因为成员是弱引用，随时可能会消失

方法：

```javascript
set(key, value)
get(key)
```
