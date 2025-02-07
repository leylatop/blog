好的，我来详细展示一下 Feature-First + 核心层的完整架构方案：

```js
src/
├── features/                 # 业务功能模块
│   ├── auth/                # 认证模块
│   │   ├── api.ts          # API 接口定义
│   │   ├── types.ts        # 类型定义
│   │   ├── constants.ts    # 常量定义
│   │   ├── slice.ts        # Redux 状态管理
│   │   ├── thunks.ts       # 异步业务逻辑
│   │   ├── selectors.ts    # 状态选择器
│   │   └── components/     # 模块相关组件
│   │       ├── LoginForm.tsx
│   │       └── SignupForm.tsx
│   │
│   ├── user/               # 用户模块
│   │   ├── api.ts
│   │   ├── types.ts
│   │   ├── slice.ts
│   │   ├── thunks.ts
│   │   ├── selectors.ts
│   │   └── components/
│   │
│   └── products/           # 产品模块
│       ├── api.ts
│       ├── types.ts
│       ├── slice.ts
│       ├── thunks.ts
│       ├── selectors.ts
│       └── components/
│
├── core/                    # 核心层，处理公共功能
│   ├── config/             # 全局配置
│   │   ├── constants.ts    # 全局常量
│   │   ├── endpoints.ts    # API 端点配置
│   │   └── settings.ts     # 应用设置
│   │
│   ├── services/           # 核心服务
│   │   ├── api.ts         # API 请求基础服务
│   │   ├── storage.ts     # 存储服务
│   │   └── analytics.ts   # 统计分析服务
│   │
│   ├── store/             # Redux 全局配置
│   │   ├── store.ts       # Store 配置
│   │   ├── rootReducer.ts # 根 reducer
│   │   └── middleware.ts  # 中间件配置
│   │
│   ├── hooks/             # 通用 hooks
│   │   ├── useAuth.ts     # 认证相关 hook
│   │   └── useApi.ts      # API 请求 hook
│   │
│   ├── components/        # 通用组件
│   │   ├── Button/
│   │   ├── Modal/
│   │   └── Form/
│   │
│   ├── utils/             # 工具函数
│   │   ├── format.ts
│   │   └── validation.ts
│   │
│   └── types/             # 全局类型定义
│       ├── api.ts
│       └── store.ts
│
├── pages/                  # 页面组件
│   ├── Home/
│   ├── Profile/
│   └── Settings/
│
└── App.tsx                 # 应用入口

// 示例代码实现：

// 1. core/services/api.ts - API 基础服务
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // 处理未授权
    }
    return Promise.reject(error);
  }
);

// 2. core/hooks/useApi.ts - API 请求 Hook
import { useState, useCallback } from 'react';
import { apiClient } from '../services/api';

export function useApi<T = any, E = any>() {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(async (
    config: Parameters<typeof apiClient>[0]
  ) => {
    try {
      setLoading(true);
      const response = await apiClient(config);
      setData(response);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, request };
}

// 3. features/auth/slice.ts - 认证状态管理
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    }
  }
});

// 4. features/auth/thunks.ts - 认证业务逻辑
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from './api';
import { LoginCredentials } from './types';
import { setUser } from './slice';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { dispatch }) => {
    const user = await authApi.login(credentials);
    dispatch(setUser(user));
    return user;
  }
);

// 5. core/store/store.ts - Store 配置
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { middleware } from './middleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 6. App.tsx - 应用入口
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeApp } from './core/store/initialization';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}
```

让我详细解释一下这个架构的各个部分：

1. **核心层 (core)**
   - **配置(config)**: 集中管理全局配置
     - 环境变量
     - API 端点
     - 全局常量
   
   - **服务(services)**: 提供基础功能服务
     - API 请求封装
     - 本地存储
     - 数据分析
   
   - **Store**: Redux 相关配置
     - Store 配置
     - 中间件
     - 根 reducer
   
   - **Hooks**: 通用 hooks
     - API 请求 hooks
     - 认证 hooks
     - 其他业务 hooks
   
   - **组件(components)**: 通用UI组件
     - 基础组件
     - 布局组件
     - 表单组件
   
   - **工具(utils)**: 工具函数
     - 格式化
     - 验证
     - 其他通用函数

2. **特性层 (features)**
   每个功能模块包含：
   - **API**: 接口定义
   - **类型**: TypeScript 类型
   - **状态**: Redux slice
   - **业务逻辑**: Thunks
   - **选择器**: Selectors
   - **组件**: 模块专用组件

3. **页面层 (pages)**
   - 组合各个功能模块的组件
   - 处理路由逻辑
   - 管理页面状态

主要优势：

1. **代码组织清晰**
   - 功能模块独立
   - 核心功能集中
   - 关注点分离

2. **可维护性高**
   - 模块化程度高
   - 依赖关系清晰
   - 容易定位问题

3. **可重用性好**
   - 通用功能集中
   - 模块间依赖简单
   - 容易迁移和复用

4. **开发效率高**
   - 开发职责明确
   - 避免代码重复
   - 便于团队协作

使用建议：

1. **核心层开发规范**
   - 只放置真正通用的功能
   - 保持稳定性
   - 谨慎添加新功能

2. **特性模块开发规范**
   - 保持功能独立
   - 避免模块间直接依赖
   - 通过核心层通信

3. **状态管理规范**
   - 合理划分状态范围
   - 避免状态重复
   - 正确使用选择器

4. **代码质量管理**
   - 统一代码风格
   - 完善的测试覆盖
   - 定期代码审查

实践要点：

1. **模块划分**
   - 按业务功能划分
   - 保持适当粒度
   - 便于团队分工

2. **依赖管理**
   - 遵循依赖注入原则
   - 避免循环依赖
   - 清晰的依赖关系

3. **状态设计**
   - 合理的状态结构
   - 明确的更新流程
   - 优化性能考虑

4. **测试策略**
   - 单元测试
   - 集成测试
   - E2E测试

迁移建议：

1. **循序渐进**
   - 先搭建核心层
   - 逐步迁移功能模块
   - 持续优化重构

2. **保持兼容**
   - 支持旧的代码结构
   - 渐进式替换
   - 避免大规模重写

3. **持续集成**
   - 自动化测试
   - 代码质量检查
   - 持续部署流程

这个架构方案适合大多数中小型React项目，可以根据具体需求进行调整和扩展。