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
    try {
      if (typeof document === 'undefined') return null;
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        const value = parts.pop()?.split(';').shift();
        return value || null;
      }
      return null;
    } catch (error) {
      console.error('Error reading cookie:', error);
      return null;
    }
  },

  set: (name: string, value: string, days = 7) => {
    try {
      if (typeof document === 'undefined') return;
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      const expires = `expires=${date.toUTCString()}`;
      document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
    } catch (error) {
      console.error('Error setting cookie:', error);
    }
  },

  remove: (name: string) => {
    try {
      if (typeof document === 'undefined') return;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    } catch (error) {
      console.error('Error removing cookie:', error);
    }
  },
};

const tokenFromCookie = cookieUtils.get('token');
const hasTokenFromCookie = !!(
  tokenFromCookie && tokenFromCookie !== 'undefined'
);

const initialState: AuthState = {
  user: null,
  token: hasTokenFromCookie ? 'cookie-based' : null,
  isAuthenticated: hasTokenFromCookie,
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

      if (action.payload.token !== 'cookie-based') {
        cookieUtils.set('token', action.payload.token);
      }
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
