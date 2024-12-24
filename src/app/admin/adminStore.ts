import { configureStore } from '@reduxjs/toolkit';
import adminReducer from "./state/adminSlice"
const adminStore = configureStore({
  reducer: {
    admin: adminReducer,
  },
  devTools:process.env.NODE_ENV!=="production",
});
export type RootState = ReturnType<typeof adminStore.getState>;
export type AppDispatch = typeof adminStore.dispatch;
export default adminStore;