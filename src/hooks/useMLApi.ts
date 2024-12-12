import { useState } from "react";
import mercadoLibreService from "../services/mercadoLibreService";
import { useAuth } from "./useAuth";

export const useMLApi = () => {
  const { user } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingTransfer, setLoadingTransfer] = useState<boolean>(false);

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

  return {
    predictCategory,
    transferProducts,
    postPendingProducts,
    getPostingProgress,
    error,
    loading,
    loadingTransfer,
  };
};
