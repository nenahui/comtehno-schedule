import { axiosApi } from '@/axiosApi';
import { unsetUser } from '@/features/users/usersSlice';
import type { GlobalError, LoginMutation, RegisterMutation, User, ValidationError } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

export const register = createAsyncThunk<User, RegisterMutation, { rejectValue: ValidationError }>(
  'users/register',
  async (registerMutation, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.entries(registerMutation).forEach(([key, value]) => {
        if (value !== null) {
          formData.append(key, value as string | Blob);
        }
      });
      const { data: user } = await axiosApi.post<User>('/auth/register', formData);

      return user;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  }
);

export const login = createAsyncThunk<User, LoginMutation, { rejectValue: GlobalError }>(
  'users/login',
  async (loginMutation, { rejectWithValue }) => {
    try {
      const { data: user } = await axiosApi.post<User>('/auth/login', loginMutation);

      return user;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  }
);

export const logout = createAsyncThunk('users/logout', async (_arg, { dispatch }) => {
  await axiosApi.post('/auth/logout');
  dispatch(unsetUser());
});
