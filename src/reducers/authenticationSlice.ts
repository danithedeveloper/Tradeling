// authenticationSlice.ts

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../data';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    loginRequest: state => {
      console.log('action - loginRequest - called');
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{user: User; token: string}>,
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
      console.log('action - loginSuccess - called');
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = action.payload;
      console.log('action - loginFailure - called');
    },
    logout: state => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      console.log('action - logout - called');
    },
  },
});

export const {loginRequest, loginSuccess, loginFailure, logout} =
  authenticationSlice.actions;
export default authenticationSlice.reducer;
