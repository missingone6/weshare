import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import localStorage from '../../storage/localStorage'
import { TOKEN, USERINF } from '../../storage/config'
import { loginAction } from '../../api/login'

const initialState = {
  token: localStorage.getItem(TOKEN) ? localStorage.getItem(TOKEN) : "",
  userInf: localStorage.getItem(USERINF) ? JSON.parse(localStorage.getItem(USERINF)) : {},
  msg: "",
  code: 0,
  isLogin: false,
}


// thunk函数允许执行异步逻辑, 通常用于发出异步请求。
// createAsyncThunk 创建一个异步action，方法触发的时候会有三种状态：
// pending（进行中）、fulfilled（成功）、rejected（失败）
export const userLogin = createAsyncThunk('user/userLogin',
  async (params) => {
    const res = await loginAction(params);
    return res;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, { payload }) => {
      state.token = payload.token;
      state.userInf = payload.userInf;
      state.isLogin = true;
    },
    // 用户点击退出
    clearAuth: (state) => {
      state.token = ''
      state.userInf = {};
      state.isLogin = false;
      // 将state值同步更新到localStorage中
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(USERINF);
    },
    setUserInf: (state, { payload }) => {
      state.userInf = payload;
      localStorage.setItem(USERINF, JSON.stringify(payload))
    },
  },
  // extraReducers 字段让 slice 处理在别处定义的 actions， 
  // 包括由 createAsyncThunk 或其他slice生成的actions。
  extraReducers(builder) {
    builder
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        if (payload.code === 200) {
          console.log(payload);
          state.token = payload.token;
          state.userInf = payload.data;
          state.isLogin = true;
          // 将state值同步更新到localStorage中
          localStorage.setItem(TOKEN, payload.token)
          localStorage.setItem(USERINF, JSON.stringify(payload.data))
        }
        state.msg = payload.msg;
        state.code = payload.code;
      })
  },
})

export const { setAuth, clearAuth, setUserInf } = userSlice.actions

export default userSlice.reducer


