import { create } from "zustand";

type ListStore = {
  list: any;
  deleteItems: any;
  addItemsToList: any;
};

export const useListStore = create<ListStore>((set) => ({
  list: [],

  deleteItems: (ids: string[]) => {
    set((state) => ({
      list: state.list.filter((item: { id: string }) => !ids.includes(item.id)),
    }));
  },
  addItemsToList: async (page: number) => {
    const res = await fetch(
      `https://api.openbrewerydb.org/v1/breweries?per_page=15&page=${page}`
    );

    if (!res.ok) throw new Error("Failed to fetch breweries");

    const data = await res.json();

    set((state) => ({
      list: [...state.list, ...data],
    }));
  },
}));
