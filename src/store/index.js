import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import scrollSlice from './features/scrollSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    scroll: scrollSlice,
  },
})

export default store;