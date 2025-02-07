不是所有的 thunk 都是异步的。thunk 本质上就是一个返回函数的函数，这个返回的函数可以包含同步或异步逻辑。让我通过代码示例来说明：

```typescript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './store';

// 1. 基础的 Slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    lastUpdated: null as string | null
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    setValue: (state, action) => {
      state.value = action.payload;
    },
    setLastUpdated: (state, action) => {
      state.lastUpdated = action.payload;
    }
  }
});

// 2. 同步 Thunk 示例

// 2.1 基础同步 thunk
const simpleThunk = () => (dispatch: AppDispatch) => {
  // 同步执行多个 actions
  dispatch(counterSlice.actions.increment());
  dispatch(counterSlice.actions.setLastUpdated(new Date().toISOString()));
};

// 2.2 带参数的同步 thunk
const incrementByAmountThunk = (amount: number) => (
  dispatch: AppDispatch,
  getState: () => RootState
) => {
  const currentValue = getState().counter.value;
  
  // 可以进行同步的条件判断
  if (currentValue + amount <= 100) {
    dispatch(counterSlice.actions.setValue(currentValue + amount));
    dispatch(counterSlice.actions.setLastUpdated(new Date().toISOString()));
  }
};

// 2.3 复杂业务逻辑的同步 thunk
const complexSyncThunk = (data: any) => (
  dispatch: AppDispatch,
  getState: () => RootState
) => {
  // 1. 获取当前状态
  const state = getState();
  
  // 2. 进行复杂的同步计算或转换
  const processedData = processData(data); // 假设这是一个同步的数据处理函数
  
  // 3. 根据条件执行不同的 actions
  if (processedData.shouldIncrement) {
    dispatch(counterSlice.actions.increment());
  }
  
  if (processedData.newValue) {
    dispatch(counterSlice.actions.setValue(processedData.newValue));
  }
  
  // 4. 记录更新时间
  dispatch(counterSlice.actions.setLastUpdated(new Date().toISOString()));
  
  // 5. 返回处理结果
  return processedData;
};

// 2.4 使用 createAction 创建同步 thunk
import { createAction } from '@reduxjs/toolkit';

const incrementIfOdd = createAction('counter/incrementIfOdd', () => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const currentValue = getState().counter.value;
    
    if (currentValue % 2 !== 0) {
      dispatch(counterSlice.actions.increment());
    }
  };
});

// 3. 异步 Thunk 示例（对比用）
// 3.1 使用 createAsyncThunk
const fetchUserThunk = createAsyncThunk(
  'users/fetchById',
  async (userId: string) => {
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
  }
);

// 3.2 手动创建异步 thunk
const fetchDataThunk = (userId: string) => async (
  dispatch: AppDispatch
) => {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    dispatch(counterSlice.actions.setValue(data.count));
  } catch (error) {
    console.error(error);
  }
};

// 4. 在组件中使用
function CounterComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const value = useSelector((state: RootState) => state.counter.value);

  // 4.1 使用同步 thunk
  const handleSimpleIncrement = () => {
    dispatch(simpleThunk());
  };

  // 4.2 使用带参数的同步 thunk
  const handleIncrementByAmount = (amount: number) => {
    dispatch(incrementByAmountThunk(amount));
  };

  // 4.3 使用复杂同步 thunk
  const handleComplexOperation = (data: any) => {
    const result = dispatch(complexSyncThunk(data));
    console.log('Operation result:', result);
  };

  // 4.4 使用 createAction 创建的同步 thunk
  const handleIncrementIfOdd = () => {
    dispatch(incrementIfOdd());
  };

  return (
    <div>
      <p>Count: {value}</p>
      <button onClick={handleSimpleIncrement}>Simple Increment</button>
      <button onClick={() => handleIncrementByAmount(5)}>Add 5</button>
      <button onClick={handleIncrementIfOdd}>Increment If Odd</button>
    </div>
  );
}

// 5. 高级用法：组合多个同步 thunk
const composedThunk = (data: any) => (
  dispatch: AppDispatch,
  getState: () => RootState
) => {
  // 先执行第一个同步操作
  const result1 = dispatch(simpleThunk());
  
  // 根据状态执行第二个操作
  if (getState().counter.value > 10) {
    const result2 = dispatch(complexSyncThunk(data));
    return { result1, result2 };
  }
  
  return { result1 };
};
```

同步 Thunk 的主要特点：
1. **无需 await**
   - 所有操作都是同步执行的
   - 不涉及 Promise 或异步操作

2. **即时执行**
   - dispatch 后立即完成
   - 可以直接获取返回值

3. **适用场景**
   - 需要执行多个同步 action
   - 需要根据当前状态进行条件判断
   - 复杂的同步数据处理
   - 需要组合多个操作

4. **优势**
   - 执行速度快
   - 代码逻辑清晰
   - 便于测试
   - 可以立即获取返回值

使用建议：
1. 当需要组合多个同步操作时，使用同步 thunk
2. 当需要在 dispatch 前进行条件判断时，使用同步 thunk
3. 当需要处理复杂的同步业务逻辑时，使用同步 thunk
4. 简单的单个 action dispatch，直接使用 slice action
5. 涉及到 API 调用或其他异步操作时，使用异步 thunk

总的来说，thunk 是一种模式，它允许你延迟一个操作的执行，这个操作可以是同步的，也可以是异步的。选择使用同步还是异步 thunk 主要取决于你的具体需求。