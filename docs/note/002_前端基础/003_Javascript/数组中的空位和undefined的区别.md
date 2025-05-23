---
slug: /note/the-difference-between-holes-and-undefined-in-arrays
title: 数组中的空位和undefined的区别
---
- **空位（holes）**：这是数组中的一个位置，该位置没有被赋值，甚至没有被初始化为`undefined`。空位是数组中的缺失元素。当你创建一个数组，比如使用`new Array(100)`或者稀疏数组（例如，`[,,2,,]`）时，数组的某些位置就是空位。在遍历数组或调用大多数数组方法时，空位通常会被忽略。
    
- **`undefined`**：这是JavaScript的一个原始值，用来表示变量已被声明但未被赋值。如果你显式地将数组的某个位置设置为`undefined`，那么这个位置不是空位，而是确实有一个值，即`undefined`。例如，`const arr = [undefined, undefined];`创建了一个长度为2的数组，每个位置都被显式地赋值为`undefined`。

- ### 主要区别
	- **初始化**：空位是没有被初始化的，而`undefined`是一个明确的值。
	- **数组方法的行为**：许多数组方法在处理空位和`undefined`时的行为不同。例如，`map`方法会跳过空位但会执行`undefined`值的位置。
	- **遍历**：在使用`for...of`循环或`Array.prototype.forEach()`等方法遍历数组时，空位通常会被忽略，而`undefined`值会被处理。
