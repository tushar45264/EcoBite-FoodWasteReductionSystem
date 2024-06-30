// src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const admin=JSON.parse(localStorage.getItem('user'))


const initialState = {
  user:  admin || null,
  isLoggedIn: admin?true:false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signup:(state, action) =>{
        state.user = action.payload;
        state.isLoggedIn =true;
    }, login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    }, logout: (state) => {
      state.user = localStorage.removeItem('User');
      state.isLoggedIn = false;
    },
  },
});

export const { login, signup, logout } = userSlice.actions;

export default userSlice.reducer;
