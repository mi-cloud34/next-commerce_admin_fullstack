import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Global State türü
interface GlobalState {
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
  name: 'admin',
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

// Export reducer ve action
export const { setIsSidebarCollapsed, setIsDarkMode } = adminSlice.actions;
export default adminSlice.reducer;
