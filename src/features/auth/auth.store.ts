import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

type AuthState = {
  isAuthenticated: boolean;
  setToken: (t: string | null) => Promise<void>;
  loadToken: () => Promise<void>;
};

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  setToken: async (t) => {
    if (t) await SecureStore.setItemAsync('auth_token', t);
    else await SecureStore.deleteItemAsync('auth_token');
    set({ isAuthenticated: !!t });
  },
  loadToken: async () => {
    const token = await SecureStore.getItemAsync('auth_token');
    set({ isAuthenticated: !!token });
  },
}));
