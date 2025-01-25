import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}
const state: AuthState = {
  isAuthenticated: false,
  token: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState: state,
  reducers: {
    setAuthenticated(
      state,
      {payload: {isAuthenticated, token}}: PayloadAction<AuthState>,
    ) {
      state.isAuthenticated = isAuthenticated;
      state.token = token;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const authAction = authSlice.actions;
export const authReducer = authSlice.reducer;
