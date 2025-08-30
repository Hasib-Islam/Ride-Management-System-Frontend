import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  email: string;
  role: 'rider' | 'driver' | 'admin';
  name: string;
  isActive: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

const cookieUtils = {
  get: (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const value = parts.pop()?.split(';').shift();
      return value || null;
    }
    return null;
  },
  set: (name: string, value: string, days = 7) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;SameSite=Lax`;
  },
  remove: (name: string) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  },
};

const tokenFromCookie = cookieUtils.get('token');

const isValidToken = tokenFromCookie && tokenFromCookie !== 'undefined';

const initialState: AuthState = {
  user: null,
  token: isValidToken ? tokenFromCookie : null,
  isAuthenticated: !!isValidToken,
  isInitialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isInitialized = true;
      cookieUtils.set('token', action.payload.token);
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isInitialized = true;
    },
    initializeAuth: (state) => {
      state.isInitialized = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isInitialized = true;
      cookieUtils.remove('token');
    },
  },
});

export const { setCredentials, setUser, initializeAuth, logout } =
  authSlice.actions;
export default authSlice.reducer;
