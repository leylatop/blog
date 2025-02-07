
```typescript

function exampleFunction() {
  return { x: 10, y: 20 };
}

type ReturnTypeOfExampleFunction = ReturnType<typeof exampleFunction>;
```

在这个示例中，`ReturnTypeOfExampleFunction` 类型等价于 `{ x: number; y: number; }`，这是 `exampleFunction` 函数的返回值类型。