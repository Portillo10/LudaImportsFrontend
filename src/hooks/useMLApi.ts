import { useState } from "react";
import mercadoLibreService from "../services/mercadoLibreService";
import { useAuth } from "./useAuth";
import { isAxiosError } from "axios";

export const useMLApi = () => {
  const { user } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingTransfer, setLoadingTransfer] = useState<boolean>(false);
  const [progress, setProgress] = useState<Record<string, any | null>>({
    posting: null,
    sincronize: null,
  });

  const setErrorMsg = (error: unknown) => {
    if (isAxiosError(error) && error.response?.data.error) {
      const {
        response: { data },
      } = error;
      setError(data.error);
    } else if (error instanceof Error) {
      setError(error.message);
    }
  };

  const calculateSummary = async (params: {
    store_id: string;
    to: Date;
    from: Date;
  }) => {
    try {
      const { from, store_id, to } = params;
      const response = await mercadoLibreService.calculateSummary(
        store_id,
        to.toISOString(),
        from.toISOString()
      );

      return response;
    } catch (error) {
      setErrorMsg(error);
    }
  };

  const predictCategory = async (sku?: string, q?: string, limit?: number) => {
    setLoading(true);
    try {
      if (user) {
        const response = await mercadoLibreService.predictCategory(
          user.stores[0]._id,
          q,
          sku,
          limit
        );
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

  const postProducts = async (store_id: string, status?: string) => {
    try {
      await mercadoLibreService.postProducts(store_id, status);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      return false;
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

  const deleteForbbidenProducts = async (store_id: string) => {
    try {
      await mercadoLibreService.deleteForbbidenProducts(store_id);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const postBySKU = async (
    sku: string,
    store_id: string,
    ignoreFilters: boolean
  ) => {
    try {
      await mercadoLibreService.postBySku(sku, store_id, ignoreFilters);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return {
    loadingTransfer,
    progress,
    loading,
    error,
    postBySKU,
    postProducts,
    sincronizeStore,
    predictCategory,
    transferProducts,
    calculateSummary,
    getSyncStoreProgress,
    deleteForbbidenProducts,
    getPostingProgressByStore,
  };
};
