import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../features/home/homeSlice';

const store = configureStore({
  reducer: {
    home: homeReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
