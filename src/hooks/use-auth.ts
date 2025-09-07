'use client';

import { create } from 'zustand';
import { account } from '@/lib/appwrite';
import { Models } from 'appwrite';

interface AuthState {
  user: Models.User<Models.Preferences> | null;
  isLoading: boolean;
  checkUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  checkUser: async () => {
    try {
      const user = await account.get();
      set({ user });
    } catch (error) {
      set({ user: null });
    } finally {
      set({ isLoading: false });
    }
  },
  logout: async () => {
    await account.deleteSession('current');
    set({ user: null });
  },
}));
