---
slug: /note/use-typescript-to-represent-the-return-value-of-a-function
title: 将xx函数的返回值作为一种类型，用typescript表示
---

```typescript

function exampleFunction() {
  return { x: 10, y: 20 };
}

type ReturnTypeOfExampleFunction = ReturnType<typeof exampleFunction>;
```

在这个示例中，`ReturnTypeOfExampleFunction` 类型等价于 `{ x: number; y: number; }`，这是 `exampleFunction` 函数的返回值类型。
