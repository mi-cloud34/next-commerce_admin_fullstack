
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Redux state arayüzü
interface UserState {
  currentUser: UserType | null; // initialState'ın null olmasına izin veriyoruz
}

// userSlice.ts veya ilgili Redux slice dosyanızda
const getInitialUserState = (): UserState => {
  if (typeof window !== 'undefined') {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      return JSON.parse(savedUser);
    }
  }
  return {
   currentUser:null,
  };
};
const initialState: UserState =getInitialUserState();
 /* {
  currentUser: localStorage.getItem('currentUser') 
    ? JSON.parse(localStorage.getItem('currentUser') || 'null') 
    : null, // Eğer localStorage'da kullanıcı varsa JSON.parse ile al, yoksa null döndür
}; */
const saveUserToLocalStorage = (state: UserState) => {
  localStorage.setItem('currentUser', JSON.stringify(state));
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.currentUser = action.payload;
      // Kullanıcıyı localStorage'a kaydet
      saveUserToLocalStorage(state);
    /*   if (action.payload) {
        localStorage.setItem('currentUser', JSON.stringify(action.payload));
      } else {
        localStorage.removeItem('currentUser');
      } */
    },
    clearUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem('currentUser'); // localStorage'dan çıkar
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
