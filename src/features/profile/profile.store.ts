import { create } from 'zustand';
import type { User } from './profile.types';

type ProfileState = {
  user: User | null;
  setUser: (user: User | null) => void;
  clear: () => void;
};

export const useProfileStore = create<ProfileState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clear: () => set({ user: null }),
}));
