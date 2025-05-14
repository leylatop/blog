---
slug: /note/typescript
title: typescript
---
ts 会解析项目中所有的 *.ts 文件，当然也包含以 .d.ts 结尾的文件；若ts文件有export 则会当做普通ts文件

在namespace内部可以直接用const 定义，而非 declare

 namespace 可以嵌套


声明合并，此时 MB既可以是函数，也可以是对象

declare 可以重载


联合类型： type 类型3 = 类型1 | 类型2
字符串字面量类型: type EventNames = 'click' | 'scroll' | 'mousemove'
枚举：enum Days \{Sun, Mon, Tue, Wed, Thu, Fri, Sat\} 枚举会员会被赋值从0开始递增的数字， 也可以手动赋值

- interface
```markdown
- interface 是对象的模板
- intercace 继承
	- interface 使用 extends 关键字进行继承
	- interface 可以继承 interface 类型
	- interface 可以继承 type 类型
	- interface 可以继承 class 类型
```

- interface 与 type 的区别 [参考资料](https://wangdoc.com/typescript/interface#interface-%E4%B8%8E-type-%E7%9A%84%E5%BC%82%E5%90%8C)

```markdown
1. type 能够表示非对象类型 & 对象类型，而 interface 只能表示对象类型（数组、对象、函数）
2. interface 能够使用 extends 关键字继承，type 不支持关键字继承（type 定义的对象如果想要添加属性，只能使用 `&` 运算符重新定义一个类型）；interface 和 type 是可以互换的，interface 也可以继承 type， type 也可以继承 interface；
3. 同名 interface 会被合并；同名 type 会报错；
4. interface 不能包含 **映射属性** ，type 可以包含 **映射属性**
5. this 关键字只能应用于 interface；
6. type 可以扩展（or 继承）原始类型，interface 不可以继承原始类型（string、 number）
7. interface 无法表达复杂类型（比如联合类型/联合类型）；
8. 总结：若要写一些复杂类型，推荐使用type，若是普通的对象，推荐使用interface
```
