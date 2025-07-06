import { create } from "zustand";

interface SideBarState {
  currentIndexPage: number;
  setCurrentIndexPage: (index: number) => void;
}

export const useSideBarStore = create<SideBarState>((set) => ({
  currentIndexPage: 0,
  setCurrentIndexPage(index: number) {
    set({ currentIndexPage: index });
  },
}));
