import { create } from "zustand";
import { IStore } from "../types/store";

interface ShopState {
  stores: IStore[];
  setStores: (stores: IStore[]) => void;
  toggleAllowUpdate: (storeId: string, allowUpdate: boolean) => void;
}

export const useShopStore = create<ShopState>((set) => ({
  stores: [],
  setStores: (stores) => {
    set({ stores });
  },

  toggleAllowUpdate: (storeId, allowUpdate) =>
    set((state) => ({
      stores: state.stores.map((store) =>
        store._id === storeId ? { ...store, allowUpdate } : store
      ),
    })),
}));
