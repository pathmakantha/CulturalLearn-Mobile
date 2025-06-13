import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';

interface AuthState {
  token: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'teacher'; // Add role field
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
  async ({
    email,
    password,
    role = 'student', // Add role parameter with default value
  }: {
    email: string;
    password: string;
    role?: 'student' | 'teacher';
  }) => {
    try {
      // For demo purposes, we'll determine the role based on email
      // In a real app, this would come from your backend
      const userRole = email.includes('teacher') ? 'teacher' : 'student';

      const response = {
        token: 'mock_token',
        user: {
          id: '1',
          name: 'Sewwandi Alles',
          email: email,
          role: role || userRole, // Use provided role or determine from email
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

// Register function to allow role selection
export const register = createAsyncThunk(
  'auth/register',
  async ({
    name,
    email,
    password,
    role,
  }: {
    name: string;
    email: string;
    password: string;
    role: 'student' | 'teacher';
  }) => {
    try {
      const response = {
        token: 'mock_token',
        user: {
          id: Math.random().toString(36).substring(2, 9), // Generate random ID
          name,
          email,
          role,
        },
      };

      await SecureStore.setItemAsync('token', response.token);
      await SecureStore.setItemAsync('user', JSON.stringify(response.user));

      return response;
    } catch (error) {
      throw new Error('Registration failed');
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

// Add a function to switch roles (for demo purposes)
export const switchRole = createAsyncThunk(
  'auth/switchRole',
  async (_, { getState }) => {
    const { auth } = getState() as { auth: AuthState };
    if (!auth.user) throw new Error('No user logged in');

    const newRole = auth.user.role === 'student' ? 'teacher' : 'student';
    const updatedUser = {
      ...auth.user,
      role: newRole as 'student' | 'teacher',
    };

    await SecureStore.setItemAsync('user', JSON.stringify(updatedUser));

    return {
      token: auth.token,
      user: updatedUser,
    };
  }
);

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

    // Register
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Registration failed';
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

    // Switch Role
    builder.addCase(switchRole.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
  },
});

export default authSlice.reducer;
