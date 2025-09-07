'use client';

import { create } from 'zustand';
import { account } from '@/lib/appwrite-client';
import { Models } from 'appwrite';
import { logout as serverLogout } from '@/app/auth/actions';
import { useRouter } from 'next/navigation';

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
    await serverLogout();
    set({ user: null });
  },
}));
