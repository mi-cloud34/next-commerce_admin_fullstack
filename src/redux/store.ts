
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import globalSlice from "../app/admin/state/adminSlice";
import productSlice from "./Features/productSlice";
import loadingSlice from "./Features/loadingSlice";
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Features/cartSlice";
import languageSlice from "./Features/languageSlice";
import userSlice from "./Features/userSlice";

// Redux store'unuzu yapılandırın
export const store = configureStore({
  reducer: {
    cart:cartSlice,
    productSlice,
    loadingSlice,
    language: languageSlice,
    user:userSlice
  },
  devTools:process.env.NODE_ENV!=="production",
});

// RootState ve AppDispatch türlerini çıkarın
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

