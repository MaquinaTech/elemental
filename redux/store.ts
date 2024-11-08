import { configureStore } from '@reduxjs/toolkit';
import scoreReducer from './slices/scoreSlice';
import authSlice from './slices/authSlice';

const store = configureStore({
  reducer: {
    score: scoreReducer,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;