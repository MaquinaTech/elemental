import { User } from '@/types/user';
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  user: User;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: true,
  user: {
    name: '',
    username: '',
    email: '',
    isAdult: false,
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: AuthState, action: { payload: User }) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    logout: (state: AuthState) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = {
        name: '',
        username: '',
        email: '',
        isAdult: false,
      }
    },
    setAdult: (state: AuthState) => {
      state.user.isAdult = true;
    },
    finishLoading: (state: AuthState) => {
      state.loading = false;
    },
  },
});

export const { login, logout, setAdult, finishLoading } = authSlice.actions;
export default authSlice.reducer;
