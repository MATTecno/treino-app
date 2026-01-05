import 'dotenv/config';
import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'treino-app',
  slug: 'treino-app',
  scheme: 'treinoapp',
  extra: {
    API_URL: process.env.API_URL ?? 'http://10.0.2.2:8000',
    AUTH_MODE: (process.env.AUTH_MODE as 'token' | 'cookie') ?? 'token',
    DEVICE_NAME: process.env.DEVICE_NAME ?? 'treino-app',
  },
};

export default config;
