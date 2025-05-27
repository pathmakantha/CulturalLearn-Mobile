import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';

interface AuthState {
  token: string | null;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    try {
      // In a real app, make an API call here
      // This is a mock response
      const response = {
        token: 'mock_token',
        user: {
          id: '1',
          name: 'Sewwandi',
          email: email,
        },
      };

      await SecureStore.setItemAsync('token', response.token);
      await SecureStore.setItemAsync('user', JSON.stringify(response.user));

      return response;
    } catch (error) {
      throw new Error('Login failed');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await SecureStore.deleteItemAsync('token');
  await SecureStore.deleteItemAsync('user');
});

export const checkAuth = createAsyncThunk('auth/check', async () => {
  const token = await SecureStore.getItemAsync('token');
  const userStr = await SecureStore.getItemAsync('user');
  
  if (token && userStr) {
    return {
      token,
      user: JSON.parse(userStr),
    };
  }
  throw new Error('No auth token');
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Login failed';
    });

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
    });

    // Check Auth
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
    builder.addCase(checkAuth.rejected, (state) => {
      state.token = null;
      state.user = null;
    });
  },
});

export default authSlice.reducer;