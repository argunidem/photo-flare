import { create } from "zustand";

interface SearchStore {
   searchTab: boolean;
   toggleSearchTab: () => void;
   openSearchTab: () => void;
   searchResults: any[];
   setSearchResults: (results: any[]) => void;
}

export const useSearch = create<SearchStore>((set) => ({
   searchTab: false,
   toggleSearchTab: () => set((state) => ({ searchTab: !state.searchTab })),
   openSearchTab: () => set(() => ({ searchTab: true })),
   searchResults: [],
   setSearchResults: (results) => set(() => ({ searchResults: results })),
}));
