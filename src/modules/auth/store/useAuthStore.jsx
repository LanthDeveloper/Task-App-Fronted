import { create } from "zustand";
import { persist } from "zustand/middleware";
import { encryptedStorage } from "../../shared/utils/CryptLS";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      session: false,
      userData: false,

      setSession: (session) => set({ session }),
      setUserData: (userData) => set({ userData }),
    }),
    {
      name: "stxf-269",
      //storage: encryptedStorage,
    }
  )
);
