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

  },
  // extraReducers 字段让 slice 处理在别处定义的 actions， 
  // 包括由 createAsyncThunk 或其他slice生成的actions。
  extraReducers(builder) {
    builder
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        console.log("🚀 ~ fulfilled", payload);
        if (payload.code === 200) {
          console.log(payload);
          state.token = payload.token;
          state.userInf = payload.data;
          state.isLogin = true;
          // 将state值同步更新到localStorage中
          localStorage.setItem(TOKEN, payload.data.token)
          localStorage.setItem(USERINF, JSON.stringify(payload.data))
        }
        state.msg = payload.msg;
        state.code = payload.code;
      })
  },
})

// Action creators are generated for each case reducer function
// export const {  } = userSlice.actions

export default userSlice.reducer


