import { createSlice } from '@reduxjs/toolkit';

/* const initialState: IUser = {
  id:"",
  name: "",
  surname: "",
  email: "",
  emailVerified: "",
  image: "",
  hashedPassword: "",
  createdAt: undefined,
  updateAt: undefined, 
  role: "",
  updatedAt: undefined
}; */
interface IUser{
  id: String,
  name:String,
  surname: String,
  email:String,
  emailVerified: String,
  image: String,
  hashedPassword: String,
  createdAt: any,
  updateAt: any,
  role: String,
  updatedAt: any
}
interface UserState{
  currentUser: IUser|null;
}
const initialState:UserState = {
  currentUser:null
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
