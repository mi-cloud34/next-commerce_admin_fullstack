import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Global State türü
export interface GlobalState {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
}

// initialState
const initialState: GlobalState = {
  isSidebarCollapsed: false,
  isDarkMode: false,
};

// Redux slice
export const adminSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

// Export actionlar ve reducer
export const { setIsSidebarCollapsed, setIsDarkMode } = adminSlice.actions;
export default adminSlice.reducer;
