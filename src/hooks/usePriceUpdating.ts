import { useState } from "react";
import priceService from "../services/priceService";
import { Progress } from "../types/apiResponses";
// import { useShopStore } from "../store/ShopStore";
import processesService from "../services/processesService";

export const usePriceUpdating = () => {
  const [error, setError] = useState<string>("");
  const [usdRate, setUsdRate] = useState<number | null>(null);
  const [loadingProgress, setLoadingProgress] = useState<boolean>(false);
  const [taskSyncProgress, setTaskSyncProgress] = useState<Progress>();
  const [productSyncProgress, setProductSyncProgress] = useState<Progress>();

  // const { toggleUpdateInProgress } = useShopStore();

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
      await priceService.updatePrices(store_ids, data);
      await getUpdateProgress();
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
      const { data: taskSyncProcess } =
        await processesService.getProgress("task-sync");
      const { data: productSyncProcess } =
        await processesService.getProgress("product-sync");

      setTaskSyncProgress(taskSyncProcess);
      setProductSyncProgress(productSyncProcess);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoadingProgress(false);
    }
  };

  const patchUpdatingProcess = async (status: string) => {
    try {
      const response = priceService.patchUpdatingProgress(status);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getUsdRate,
    updatePrices,
    getUpdateProgress,
    patchUpdatingProcess,
    error,
    usdRate,
    loadingProgress,
    taskSyncProgress,
    productSyncProgress,
  };
};
