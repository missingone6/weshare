import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  scrollKey: "",
  scrollData: "",
}

export const userSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setScroll: (state, { payload }) => {
      state.scrollKey = payload.scrollKey;
      state.scrollData = payload.scrollData;
    },
  },
})

export const { setScroll } = userSlice.actions

export default userSlice.reducer


