import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './Features/adminSlice';  // Reducer'ı doğru import ediyoruz

const adminStore = configureStore({
  reducer: {
    global: adminReducer,  // adminSlice.reducer'ı 'admin' key'iyle ekliyoruz
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof adminStore.getState>;
export type AppDispatch = typeof adminStore.dispatch;

export default adminStore;
