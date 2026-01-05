import Constants from 'expo-constants';

const extra = (Constants.expoConfig?.extra ?? {}) as any;

export const ENV = {
  API_URL: extra.API_URL as string,
  AUTH_MODE: (extra.AUTH_MODE as 'token' | 'cookie') ?? 'token',
  DEVICE_NAME: (extra.DEVICE_NAME as string) ?? 'treino-app',
};
