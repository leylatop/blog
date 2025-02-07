旧的reducer怎么处理？
对于历史遗留的 Redux 代码迁移到 Redux Toolkit，我建议采用渐进式的迁移策略。让我为你展示几种处理方案：

```typescript
// 1. 原有的 Redux 代码
// oldActions.js
const OLD_ACTION_TYPE = 'SET_USER_INFO';
dispatch({ type: OLD_ACTION_TYPE, payload: userInfo });

// oldReducer.js
const oldReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {
        ...state,
        userInfo: action.payload
      };
    // ... 其他 case
    default:
      return state;
  }
};

// 2. 迁移策略一：创建兼容的 Slice，保持原有 action type
// 适合需要保持向后兼容的场景
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null
  },
  reducers: {
    // 空的 reducer，仅用于生成 action type
  },
  // 使用 extraReducers 处理原有的 action types
  extraReducers: (builder) => {
    builder.addCase('SET_USER_INFO', (state, action) => {
      state.userInfo = action.payload;
    });
  }
});

// 3. 迁移策略二：创建新 Slice，使用 extraReducers 处理旧 action
const newUserSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    // 新增的状态
    loading: false
  },
  reducers: {
    // 新的 action creators
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
  extraReducers: (builder) => {
    // 处理旧的 action types
    builder
      .addCase('SET_USER_INFO', (state, action) => {
        state.userInfo = action.payload;
        // 可以在这里添加新的逻辑
        state.loading = false;
      })
      // 处理其他旧的 action types
      .addCase('OLD_ACTION_TYPE', (state, action) => {
        // 处理逻辑
      });
  }
});

// 4. 迁移策略三：创建 action type 映射
// 适合需要集中管理旧 action types 的场景
const OLD_ACTION_TYPES = {
  SET_USER_INFO: 'SET_USER_INFO',
  UPDATE_PROFILE: 'UPDATE_PROFILE',
  // ... 其他旧的 action types
} as const;

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null
  },
  reducers: {
    // 新的 reducers
  },
  extraReducers: (builder) => {
    Object.entries(OLD_ACTION_TYPES).forEach(([key, type]) => {
      builder.addCase(type, (state, action) => {
        switch (type) {
          case OLD_ACTION_TYPES.SET_USER_INFO:
            state.userInfo = action.payload;
            break;
          case OLD_ACTION_TYPES.UPDATE_PROFILE:
            // 处理逻辑
            break;
        }
      });
    });
  }
});

// 5. 迁移策略四：使用中间件来转换旧的 actions
// 适合需要在迁移期间保持两种方式并存的场景
const actionMigrationMiddleware = (store) => (next) => (action) => {
  // 处理旧的 action types
  if (action.type === 'SET_USER_INFO') {
    // 可以转换成新的 action
    return next(userSlice.actions.setUserInfo(action.payload));
  }
  return next(action);
};

// 6. 完整的迁移示例
import { createSlice, configureStore } from '@reduxjs/toolkit';

// 6.1 定义旧的 action types
const OLD_TYPES = {
  SET_USER_INFO: 'SET_USER_INFO',
  UPDATE_PROFILE: 'UPDATE_PROFILE',
  SET_PREFERENCES: 'SET_PREFERENCES'
} as const;

// 6.2 创建新的 slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    preferences: {},
    loading: false,
    error: null
  },
  reducers: {
    // 新的 action creators
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
    },
    setPreferences: (state, action) => {
      state.preferences = action.payload;
    }
  },
  extraReducers: (builder) => {
    // 处理旧的 actions
    Object.values(OLD_TYPES).forEach(type => {
      builder.addCase(type, (state, action) => {
        switch (type) {
          case OLD_TYPES.SET_USER_INFO:
            state.userInfo = action.payload;
            break;
          case OLD_TYPES.SET_PREFERENCES:
            state.preferences = action.payload;
            break;
          // ... 处理其他旧的 action types
        }
      });
    });
  }
});

// 6.3 创建 store
const store = configureStore({
  reducer: {
    user: userSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(actionMigrationMiddleware)
});

// 6.4 在组件中使用
function UserComponent() {
  const dispatch = useDispatch();

  // 旧的方式 - 仍然有效
  const handleOldWay = () => {
    dispatch({ 
      type: 'SET_USER_INFO', 
      payload: { id: 1, name: 'John' } 
    });
  };

  // 新的方式
  const handleNewWay = () => {
    dispatch(userSlice.actions.setUserInfo({ id: 1, name: 'John' }));
  };

  return (
    <div>
      <button onClick={handleOldWay}>Update (Old)</button>
      <button onClick={handleNewWay}>Update (New)</button>
    </div>
  );
}
```

迁移建议：

1. **渐进式迁移**
   - 不需要一次性迁移所有代码
   - 可以新旧代码并存
   - 逐步替换旧的实现

2. **迁移优先级**
   - 先迁移最常用的功能
   - 先迁移最容易迁移的部分
   - 复杂的逻辑可以最后迁移

3. **测试策略**
   - 保持现有测试用例
   - 为新的实现添加测试
   - 确保新旧实现的行为一致

4. **文档和注释**
   - 标记需要迁移的代码
   - 记录迁移计划和进度
   - 更新相关文档

5. **代码审查**
   - 仔细审查迁移的代码
   - 确保没有破坏现有功能
   - 验证性能影响

6. **迁移后的清理**
   - 移除不再需要的代码
   - 整理和优化新代码
   - 更新相关文档和注释

这种渐进式的迁移策略可以让你：
1. 降低迁移风险
2. 保持系统稳定性
3. 方便回滚和调试
4. 更容易管理迁移进度