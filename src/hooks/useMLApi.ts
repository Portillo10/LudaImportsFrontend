import { useState } from "react";
import mercadoLibreService from "../services/mercadoLibreService";
import { useAuth } from "./useAuth";

export const useMLApi = () => {
  const { user } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingTransfer, setLoadingTransfer] = useState<boolean>(false);
  const [progress, setProgress] = useState<Record<string, any | null>>({
    posting: null,
    sincronize: null,
  });

  const predictCategory = async (sku: string) => {
    setLoading(true);
    try {
      if (user) {
        const response = await mercadoLibreService.predictCategory(
          sku,
          user.stores[0]._id
        );
        console.log(response);
        return response;
      }
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const transferProducts = async () => {
    setLoadingTransfer(true);
    try {
      await mercadoLibreService.transferProducts({
        origin_store_id: "66cbe53b5411118da45df1a4",
        target_store_id: "672bf6cd82f5d8168b6e2210",
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoadingTransfer(false);
    }
  };

  const postPendingProducts = async (store_id: string) => {
    try {
      await mercadoLibreService.postPending(store_id);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const getPostingProgress = async () => {
    try {
      const response = await mercadoLibreService.getPostingProgress();
      console.log(response);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const getPostingProgressByStore = async (store_id: string) => {
    try {
      const response =
        await mercadoLibreService.getPostingProgressByStore(store_id);
      const currentProgress = progress;
      currentProgress["posting"] = response;
      setProgress(currentProgress);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const sincronizeStore = async (store_id: string) => {
    try {
      const response = await mercadoLibreService.syncStore(store_id);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const getSyncStoreProgress = async (store_id: string) => {
    try {
      const response = await mercadoLibreService.getSyncStoreProgress(store_id);
      const currentProgress = progress;
      currentProgress["sync"] = response;
      setProgress(currentProgress);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return {
    error,
    loading,
    progress,
    loadingTransfer,
    sincronizeStore,
    predictCategory,
    transferProducts,
    getPostingProgress,
    postPendingProducts,
    getSyncStoreProgress,
    getPostingProgressByStore,
  };
};
