import type { RootState } from '@/app/store';
import type { Store } from '@reduxjs/toolkit';
import axios from 'axios';

export const axiosApi = axios.create({
  baseURL: 'http://api.timetable.makalabox.com:9999/api',
});

export const addTokenInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config) => {
    const token = store.getState().users.user?.token;
    config.headers.set('Authorization', `Bearer ${token ? token : ''}`);
    return config;
  });
};
