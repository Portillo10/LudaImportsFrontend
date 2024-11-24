import { useState } from "react";
import mercadoLibreService from "../services/mercadoLibreService";

// type Store = {
//   alias: string;
//   user: string;
//   lastUpdate: Date;
//   updating: boolean;
// };

export const usePriceUpdating = () => {
  const [usdRate, setUsdRate] = useState<number | null>(null);
  const getUsdRate = async () => {
    try {
      const response = await mercadoLibreService.getUsdRate();
      setUsdRate(response.usdRate);
    } catch (error) {
      throw error;
    }
  };

  return { getUsdRate, usdRate };
};
