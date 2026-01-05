import * as SecureStore from 'expo-secure-store';
import { api } from '../../services/api';
import { ENV } from '../../services/env';

export type LoginPayload = { email: string; password: string };
export type RegisterPayload = { name: string; email: string; password: string; password_confirmation: string };

export async function csrfCookie() {
  // só no modo cookie
  await api.get('/sanctum/csrf-cookie');
}

export async function login(payload: LoginPayload): Promise<void> {
  // nosso backend expõe /api/auth/login e retorna { ok, data: { user, token } }
  const { data } = await api.post('/api/auth/login', payload);
  const token = data?.data?.token;
  if (!token) throw new Error('Token não retornado pelo servidor.');

  await SecureStore.setItemAsync('auth_token', token);
}

export async function logout(): Promise<void> {
  if (ENV.AUTH_MODE === 'token') {
    try { await api.post('/logout'); } catch {}
    await SecureStore.deleteItemAsync('auth_token');
  } else {
    try { await api.post('/logout'); } catch {}
  }
}

export async function registerUser(payload: RegisterPayload): Promise<void> {
  // Ajuste a rota conforme seu backend (muito comum: /api/register)
  const endpoint = '/api/auth/register'; // ou '/register' se você expôs assim
  const { data } = await api.post<{ token?: string }>(endpoint, payload);

  // Se o backend já retornar token no registro, salve (modo token)
  if (ENV.AUTH_MODE === 'token' && data?.token) {
    await SecureStore.setItemAsync('auth_token', data.token);
  }
}
