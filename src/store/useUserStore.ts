import { TUser } from '@/types/user';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type UserStore = {
  user: TUser | null;
  setUser: (user: TUser | null) => void;
  isLoading: boolean;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: TUser | null) => set({ user }),

      isLoading: false,

      //logout
      //   //localStorage.removeItem("token")
    }),
    {
      name: 'user-auth', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useUserStore;
