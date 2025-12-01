import { create } from "zustand";

type ListStore = {
  list: any;
  fetchItemsToList: any;
  deleteItems: any;
};

export const useListStore = create<ListStore>((set) => ({
  list: [],
  fetchItemsToList: async () => {
    const breweries = await fetch(
      "https://api.openbrewerydb.org/v1/breweries?per_page=15&page=1"
    );
    const data = await breweries.json();
    set({ list: data });
  },
  deleteItems: (ids: string[]) => {
    set((state) => ({
      list: state.list.filter((item: { id: string }) => !ids.includes(item.id)),
    }));
  },
}));
