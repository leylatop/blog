```jsx
import React from 'react';

function MyComponent({ children }) {
  const childrenArray = React.Children.toArray(children);

// 核心：判断children的type是否为string类型，否则就是自定义组件
  const domElements = childrenArray.filter(child => typeof child.type === 'string');
  const customComponents = childrenArray.filter(child => typeof child.type !== 'string');

  console.log('DOM Elements:', domElements);
  console.log('Custom Components:', customComponents);

  return <div>{children}</div>;
}

export default MyComponent;

```