---
slug: /note/lhs-and-rhs
title: LHS 和 RHS
---
**LHS 和 RHS 简单来说是一个赋值操作的左侧和右侧**，L 就代表 Left 左侧，R 就是代表 Right 右侧。当变量出现在赋值操作的左侧时进行 LHS 查询，出现在右侧时进行 RHS 查询。

LHS 查询通常就是赋值操作，找到要被赋值的变量（`a = 2`）

RHS 查询通常是寻找某个变量的源值（`console.log(a)`）


不成功的 RHS 引用会导致抛出 ReferenceError 异常。
不成功的 LHS 引用会导致自动隐式 地创建一个全局变量（非严格模式下），该变量使用 LHS 引用的目标作为标识符，或者抛 出 ReferenceError 异常（严格模式下）。
