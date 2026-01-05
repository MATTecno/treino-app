import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { ENV } from './env';
import { mapAxiosErrorToAppError } from '../errors/errorMapper';

export const api = axios.create({
  baseURL: ENV.API_URL,
  timeout: 15000,
  withCredentials: ENV.AUTH_MODE === 'cookie',
});

api.interceptors.request.use(async (config) => {
  if (ENV.AUTH_MODE === 'token') {
    const token = await SecureStore.getItemAsync('auth_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(mapAxiosErrorToAppError(err))
);
