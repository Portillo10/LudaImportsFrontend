import { create } from "zustand";
import { IUser } from "../types/user";
import { IStore } from "../types/store";

interface UserState {
  user: IUser | null;
  setUser: (user: IUser) => void;
  pushStore: (store: IStore) => void;
  removeUser: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  setUser: (user) => {
    set({ user });
  },
  pushStore: (store) => {
    const { user } = get();
    if (!user) return;

    const updatedStores = [...(user.stores || []), store];
    const updatedUser = { ...user, stores: updatedStores };

    set({ user: updatedUser });
  },
  removeUser: () => {
    set({ user: null });
  },
}));
