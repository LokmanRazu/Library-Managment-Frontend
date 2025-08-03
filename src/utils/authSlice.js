import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'

// LOGIN
export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    const res = await api.post('auth/signin', data);
    console.log('loging data',res.data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

export const signup = createAsyncThunk('auth/signup', async (data, thunkAPI) => {
  try {
    const res = await api.post('auth/signup', data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Signup failed');
  }
});

export const signout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await api.post('auth/logout'); // make sure your backend has this endpoint
    return true;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue('Logout failed');
  }
});

export const fetchCurrentUser = createAsyncThunk('auth/me', async (_, thunkAPI) => {
  try {
    const res = await api.get('auth/me');
    return res.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue('Not authenticated');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {

        state.status = 'succeeded';
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(signup.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signout.fulfilled, (state) => {
        state.user = null; // <-- ✅ Clear the user
        state.status = 'idle';
      })
      .addCase(signout.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;