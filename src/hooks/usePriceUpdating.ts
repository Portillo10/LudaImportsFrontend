import { useState } from "react";
import priceService from "../services/priceService";
import { UpdatingProgressResponse } from "../types/apiResponses";

export const usePriceUpdating = () => {
  const [usdRate, setUsdRate] = useState<number | null>(null);
  const [loadingProgress, setLoadingProgress] = useState<boolean>(false);
  const [priceUpdatingInfo, setPriceUpdatingInfo] =
    useState<UpdatingProgressResponse | null>(null);
  const [error, setError] = useState<string>("");
  const getUsdRate = async () => {
    try {
      const response = await priceService.getUsdRate();
      setUsdRate(response.usdRate);
    } catch (error) {
      throw error;
    }
  };

  const updatePrices = async (store_ids: string[], data: any) => {
    setLoadingProgress(true);
    try {
      const response = await priceService.updatePrices(store_ids, data);
      console.log(response);

      setPriceUpdatingInfo(response);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoadingProgress(false);
    }
  };

  const getUpdateProgress = async () => {
    setLoadingProgress(true);
    try {
      const response = await priceService.getUpdateProgress();
      setPriceUpdatingInfo(response);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoadingProgress(false);
    }
  };

  return {
    getUsdRate,
    updatePrices,
    getUpdateProgress,
    error,
    usdRate,
    loadingProgress,
    priceUpdatingInfo,
  };
};
