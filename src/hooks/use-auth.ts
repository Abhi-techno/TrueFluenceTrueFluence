'use client';

import { create } from 'zustand';
import { getAppwriteClient } from '@/lib/appwrite';
import { Models } from 'appwrite';
import { logout as serverLogout } from '@/app/auth/actions';

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
      const account = getAppwriteClient();
      if (!account) {
          set({ user: null, isLoading: false });
          return;
      }
      const user = await account.get();
      set({ user });
    } catch (error) {
      set({ user: null });
    } finally {
      set({ isLoading: false });
    }
  },
  logout: async () => {
    await serverLogout();
    set({ user: null });
  },
}));
