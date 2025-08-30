import { useState } from "react";

export const useSearchBarFilter = () => {
  const [filters, setFilters] = useState<any>({
    productStore: {
      state: { $in: ["active", "paused"] },
      subStatus: "",
    },
    projection: {
      error: 0,
      weight: 0,
      profit: 0,
      store_id: 0,
      dimensions: 0,
      postedDate: 0,
      priceInUSD: 0,
      attributes: 0,
      description: 0,
      profitPercent: 0,
      shipmentPrice: 0,
      amazonCategory: 0,
      lastUpdatePrice: 0,
    },
  });
  const handleStateChange = (state: string) => {
    setFilters((prev: any) => {
      const newState = prev.productStore.state.$in.includes(state)
        ? prev.productStore.state.$in.filter((s: any) => s !== state)
        : [...prev.productStore.state.$in, state];
      return {
        ...prev,
        productStore: {
          ...prev.productStore,
          state: { $in: newState },
        },
      };
    });
  };
  return { filters, handleStateChange };
};
